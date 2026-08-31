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
