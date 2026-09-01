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

export interface Child {
  id: string;
  user_id: string;
  nik: string;
  full_name: string;
  gender: string;
  home_address: string;
  birth_date: string;
  created_at?: string;
}

export interface CreateChildPayload {
  nik: string;
  full_name: string;
  gender: string;
  home_address: string;
  birth_date: string;
}


export type StuntingStatus = "severely_stunted" | "stunted" | "normal" | "tall";

export interface Measurement {
  id: string;
  measurer_id: string;
  measurer_role: string;
  children_id: string;
  age: number | string;
  measured_at: string;
  weight: number | string;
  height: number | string;
  stunting_status: StuntingStatus;
  z_score: number | string;
  head_circumference?: number | string;
  upper_arm_circumference?: number | string;
}

export interface CreateMeasurementPayload {
  children_id: string;
  weight: number;
  height: number;
  head_circumference?: number;
  upper_arm_circumference?: number;
}

export interface EducationMaterial {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  video_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEducationMaterialPayload {
  title: string;
  description?: string;
  video_url?: string;
}

export interface Quiz {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  options: string[] | string;
  correct_ans?: string;
}

export interface QuizSubmission {
  id: string;
  kader_id: string;
  quiz_id: string;
  score: number;
  answers: Array<{
    question_id: string;
    selected_option: string;
    is_correct?: boolean;
  }> | string;
  submitted_at?: string;
}

export interface CreateQuizPayload {
  title: string;
  description?: string;
}

export interface CreateQuizQuestionPayload {
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  options: string[];
  correct_ans?: string;
}

export interface CreateQuizSubmissionPayload {
  score: number;
  answers: Array<{
    question_id: string;
    selected_option: string;
    is_correct?: boolean;
  }>;
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

export async function createNakesChild(payload: CreateChildPayload): Promise<Child> {
  return apiClient<Child>("/nakes/children", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createParentChild(payload: CreateChildPayload): Promise<Child> {
  return apiClient<Child>("/ortu/child", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createChild(payload: CreateChildPayload): Promise<Child> {
  const userJson = localStorage.getItem("centing_user");
  let role = "orang_tua";
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      role = user.role || role;
    } catch {
      // fallback
    }
  }
  if (role === "tenaga_kesehatan") {
    return createNakesChild(payload);
  }
  return createParentChild(payload);
}

export async function getParentChildren(): Promise<Child[]> {
  return apiClient<Child[]>("/ortu/child", {
    method: "GET",
  });
}

export async function getNakesChildren(limit = 50, offset = 0): Promise<Child[]> {
  return apiClient<Child[]>(`/nakes/children?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });
}

export async function getChildById(id: string): Promise<Child> {
  return apiClient<Child>(`/nakes/children/${id}`, {
    method: "GET",
  });
}

function getRolePrefix(): string {
  const userJson = localStorage.getItem("centing_user");
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user.role === "tenaga_kesehatan") return "nakes";
      if (user.role === "kader") return "kader";
      if (user.role === "orang_tua") return "ortu";
    } catch {
      // fallback
    }
  }
  return "ortu";
}

export async function createMeasurement(payload: CreateMeasurementPayload): Promise<Measurement> {
  const prefix = getRolePrefix();
  return apiClient<Measurement>(`/${prefix}/measurements`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getChildMeasurements(childId: string): Promise<Measurement[]> {
  const prefix = getRolePrefix();
  return apiClient<Measurement[]>(`/${prefix}/children/${childId}/measurements`, {
    method: "GET",
  });
}

export async function getMeasurementById(id: string): Promise<Measurement> {
  return apiClient<Measurement>(`/nakes/measurements/${id}`, {
    method: "GET",
  });
}

export async function getEducationMaterials(limit = 20, offset = 0): Promise<EducationMaterial[]> {
  return apiClient<EducationMaterial[]>(`/education-materials?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });
}

export async function getEducationMaterialById(id: string): Promise<EducationMaterial> {
  return apiClient<EducationMaterial>(`/education-materials/${id}`, {
    method: "GET",
  });
}

export async function createEducationMaterial(payload: CreateEducationMaterialPayload): Promise<EducationMaterial> {
  return apiClient<EducationMaterial>("/nakes/education-materials", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateEducationMaterial(id: string, payload: CreateEducationMaterialPayload): Promise<EducationMaterial> {
  return apiClient<EducationMaterial>(`/nakes/education-materials/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteEducationMaterial(id: string): Promise<void> {
  return apiClient<void>(`/nakes/education-materials/${id}`, {
    method: "DELETE",
  });
}

export async function getQuizzes(limit = 20, offset = 0): Promise<Quiz[]> {
  return apiClient<Quiz[]>(`/quizzes?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });
}

export async function getQuizById(id: string): Promise<Quiz> {
  return apiClient<Quiz>(`/quizzes/${id}`, {
    method: "GET",
  });
}

export async function getQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
  return apiClient<QuizQuestion[]>(`/quizzes/${quizId}/questions`, {
    method: "GET",
  });
}

export async function submitQuiz(
  quizId: string,
  payload: CreateQuizSubmissionPayload
): Promise<QuizSubmission> {
  return apiClient<QuizSubmission>(`/quizzes/${quizId}/submissions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getKaderQuizSubmissions(): Promise<QuizSubmission[]> {
  return apiClient<QuizSubmission[]>("/kader/submissions", {
    method: "GET",
  });
}

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
  return apiClient<Quiz>("/nakes/quizzes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createQuizQuestion(
  quizId: string,
  payload: CreateQuizQuestionPayload
): Promise<QuizQuestion> {
  return apiClient<QuizQuestion>(`/nakes/quizzes/${quizId}/questions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAgeMonths(birthDateStr?: string): number {
  if (!birthDateStr) return 0;
  const birth = new Date(birthDateStr);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  return Math.max(0, months);
}

export function formatAge(birthDateStr?: string): string {
  const months = getAgeMonths(birthDateStr);
  if (months >= 24) {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} Tahun ${remMonths} Bulan` : `${years} Tahun`;
  }
  return `${months} Bulan`;
}

export function formatStuntingStatus(status?: StuntingStatus | string): {
  label: string;
  shortLabel: string;
  tone: "healthy" | "warning" | "danger" | "neutral";
  badgeBg: string;
  badgeText: string;
  description: string;
} {
  switch (status) {
    case "severely_stunted":
      return {
        label: "Sangat Pendek (Severely Stunted)",
        shortLabel: "Sangat Pendek",
        tone: "danger",
        badgeBg: "bg-red-100",
        badgeText: "text-red-700",
        description: "Tinggi badan anak berada di bawah -3 SD standar WHO. Perlu konsultasi dan rujukan segera ke fasilitas kesehatan.",
      };
    case "stunted":
      return {
        label: "Pendek (Stunted)",
        shortLabel: "Pendek",
        tone: "warning",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-800",
        description: "Tinggi badan anak berada di bawah -2 SD standar WHO. Disarankan perbaikan nutrisi gizi seimbang dan pemantauan berkala.",
      };
    case "tall":
      return {
        label: "Tinggi",
        shortLabel: "Tinggi",
        tone: "healthy",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-800",
        description: "Tinggi badan anak berada di atas +3 SD standar WHO. Tumbuh kembang di atas rata-rata populasi.",
      };
    case "normal":
    default:
      return {
        label: "Normal",
        shortLabel: "Normal",
        tone: "healthy",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-800",
        description: "Pertumbuhan tinggi badan anak sesuai dengan standar rata-rata WHO (PMK No. 2 Tahun 2020). Pertahankan pola asuh dan nutrisi bergizi seimbang.",
      };
  }
}
