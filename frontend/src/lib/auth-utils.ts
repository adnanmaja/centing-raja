export function getRoleDashboardPath(role: string): string {
  switch (role) {
    case "tenaga_kesehatan":
      return "/nakes";
    case "kader":
      return "/kader";
    case "orang_tua":
      return "/orang-tua";
    default:
      return "/welcome-pages";
  }
}

export function mapRoleToBackend(roleDisplay: string): "tenaga_kesehatan" | "kader" | "orang_tua" {
  const normalized = roleDisplay.trim().toLowerCase();
  if (normalized.includes("nakes") || normalized.includes("kesehatan")) {
    return "tenaga_kesehatan";
  }
  if (normalized.includes("kader")) {
    return "kader";
  }
  return "orang_tua";
}

export interface JwtClaims {
  user_id: string;
  phone_number: string;
  role: "tenaga_kesehatan" | "kader" | "orang_tua";
  exp: number;
  iat?: number;
  nbf?: number;
  iss?: string;
}

export function parseJwt(token: string): JwtClaims | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtClaims;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const claims = parseJwt(token);
  if (!claims || typeof claims.exp !== "number") return false;
  return claims.exp * 1000 > Date.now();
}

export function getRoleFromToken(token: string | null): "tenaga_kesehatan" | "kader" | "orang_tua" | null {
  if (!token) return null;
  const claims = parseJwt(token);
  return claims?.role ?? null;
}

export function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  const claims = parseJwt(token);
  return claims?.user_id ?? null;
}
