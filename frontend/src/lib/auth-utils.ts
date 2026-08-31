export function getRoleDashboardPath(role: string): string {
  switch (role) {
    case "tenaga_kesehatan":
      return "/nakes";
    case "kader":
      return "/kader";
    case "orang_tua":
      return "/orang-tua";
    default:
      return "/auth";
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
