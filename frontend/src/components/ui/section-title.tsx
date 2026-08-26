import React from "react"

import { SvgIcon } from "./svg-icon"

export function SectionTitle({
  icon,

  children,

  iconBox = "bg-transparent text-[#006d42]",
}: {
  icon: React.ReactNode

  children: React.ReactNode

  iconBox?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`grid size-5 place-items-center ${iconBox}`}>
        {icon}
      </span>
      <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-xl font-semibold leading-7 text-[#191c1d]">
        {children}
      </h2>
    </div>
  )
}
