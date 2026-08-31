export interface UserProfile {
  id: string;
  name: string;
  phone_number: string;
  role: "tenaga_kesehatan" | "kader" | "orang_tua";
}

export interface RegisterPayload {
  name: string;
  phone_number: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface MessageResponse {
  message: string;
}

export interface ApiError {
  error?: string;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("centing_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg =
      (data as ApiError)?.error ||
      (data as ApiError)?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export async function registerUser(payload: RegisterPayload): Promise<UserProfile> {
  return apiClient<UserProfile>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function requestOTP(phone_number: string): Promise<MessageResponse> {
  return apiClient<MessageResponse>("/login/request-otp", {
    method: "POST",
    body: JSON.stringify({ phone_number }),
  });
}

export async function verifyOTP(
  phone_number: string,
  otp: string
): Promise<AuthResponse> {
  return apiClient<AuthResponse>("/login/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phone_number, otp }),
  });
}
