package service

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

type StorageService struct {
	client     *storage.Client
	bucketName string
	publicURL  string
}

func NewStorageService(ctx context.Context) *StorageService {
	bucketName := os.Getenv("GCS_BUCKET_NAME")
	if bucketName == "" {
		bucketName = "centing-avatars"
	}

	publicURL := os.Getenv("GCS_PUBLIC_URL_PREFIX")
	if publicURL == "" {
		publicURL = fmt.Sprintf("https://storage.googleapis.com/%s", bucketName)
	}
	publicURL = strings.TrimSuffix(publicURL, "/")

	var opts []option.ClientOption
	if credsJSON := os.Getenv("GCS_CREDENTIALS_JSON"); credsJSON != "" {
		opts = append(opts, option.WithCredentialsJSON([]byte(credsJSON)))
	} else if credsFile := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"); credsFile != "" {
		opts = append(opts, option.WithCredentialsFile(credsFile))
	}

	client, err := storage.NewClient(ctx, opts...)
	if err != nil {
		log.Printf("[GCS Storage] Warning: failed to initialize GCS client: %v", err)
		return &StorageService{
			bucketName: bucketName,
			publicURL:  publicURL,
		}
	}

	log.Printf("[GCS Storage] Successfully initialized client for bucket: %s", bucketName)
	return &StorageService{
		client:     client,
		bucketName: bucketName,
		publicURL:  publicURL,
	}
}

func (s *StorageService) UploadAvatar(ctx context.Context, userID string, fileHeader *multipart.FileHeader) (string, error) {
	if s.client == nil {
		return "", fmt.Errorf("GCS storage client is not configured")
	}

	file, err := fileHeader.Open()
	if err != nil {
		return "", fmt.Errorf("failed to open uploaded file: %w", err)
	}
	defer file.Close()

	buf := make([]byte, 512)
	n, err := file.Read(buf)
	if err != nil && err != io.EOF {
		return "", fmt.Errorf("failed to read file header: %w", err)
	}
	contentType := http.DetectContentType(buf[:n])
	if !strings.HasPrefix(contentType, "image/") {
		return "", fmt.Errorf("invalid file type '%s', expected an image", contentType)
	}

	if _, err := file.Seek(0, io.SeekStart); err != nil {
		return "", fmt.Errorf("failed to rewind file: %w", err)
	}

	ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
	if ext == "" || ext == "." {
		switch contentType {
		case "image/jpeg":
			ext = ".jpg"
		case "image/png":
			ext = ".png"
		case "image/webp":
			ext = ".webp"
		case "image/gif":
			ext = ".gif"
		default:
			ext = ".png"
		}
	}

	objectName := fmt.Sprintf("avatars/%s-%d%s", userID, time.Now().Unix(), ext)
	bucket := s.client.Bucket(s.bucketName)
	obj := bucket.Object(objectName)

	wc := obj.NewWriter(ctx)
	wc.ContentType = contentType
	wc.CacheControl = "public, max-age=86400"

	if _, err := io.Copy(wc, file); err != nil {
		_ = wc.Close()
		return "", fmt.Errorf("failed to upload avatar to GCS: %w", err)
	}

	if err := wc.Close(); err != nil {
		return "", fmt.Errorf("failed to finalize GCS upload: %w", err)
	}

	return fmt.Sprintf("%s/%s", s.publicURL, objectName), nil
}
