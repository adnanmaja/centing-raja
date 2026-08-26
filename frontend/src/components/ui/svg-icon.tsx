export function SvgIcon({
  path,

  viewBox,

  className = "",
}: {
  path: string

  viewBox: string

  className?: string
}) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} fill="none" className={className}>
      <path d={path} fill="currentColor" />
    </svg>
  )
}
