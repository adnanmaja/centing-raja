import type { EducationMaterial } from "../../lib/api"
import parentMaterialsPaths from "../../assets/icon-materials"
export const parentMaterialItems: ParentMaterialItem[] = []
export type ParentMaterial = ParentMaterialItem

export interface ParentMaterialItem {
  id: string
  category: string
  title: string
  description: string
  icon?: string
  iconBox?: string
  link?: string
  video_url?: string
}

export function normalizeEducationMaterial(item: EducationMaterial): ParentMaterialItem {
  const titleLower = item.title.toLowerCase()
  const category = titleLower.includes("gizi") || titleLower.includes("mpasi") || titleLower.includes("nutrisi") || titleLower.includes("makan")
    ? "Gizi & MPASI"
    : titleLower.includes("sanitasi") || titleLower.includes("cuci") || titleLower.includes("kebersihan") || titleLower.includes("air")
    ? "Sanitasi"
    : "Pola Asuh"

  const iconBox = category === "Gizi & MPASI"
    ? "bg-[#76d69f] text-[#005c38]"
    : category === "Sanitasi"
    ? "bg-[#e0edff] text-[#536478]"
    : "bg-[#ffd9d5] text-[#b5302c]"

  const icon = category === "Gizi & MPASI"
    ? parentMaterialsPaths.p304eaa0
    : category === "Sanitasi"
    ? parentMaterialsPaths.p23cfd7c0
    : parentMaterialsPaths.p31e6b500

  return {
    id: item.id,
    category,
    title: item.title,
    description: item.description || "Panduan edukasi pencegahan stunting dan stimulasi tumbuh kembang anak.",
    icon,
    iconBox,
    link: item.video_url || undefined,
    video_url: item.video_url || undefined,
  }
}
