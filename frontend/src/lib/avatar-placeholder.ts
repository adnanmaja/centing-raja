const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612">
  <defs>
    <clipPath id="c"><circle cx="306" cy="306" r="256"/></clipPath>
  </defs>
  <circle cx="306" cy="306" r="256" fill="#cccccc"/>
  <circle cx="306" cy="273" r="96" fill="#999999"/>
  <ellipse cx="306" cy="560" rx="170" ry="175" fill="#999999" clip-path="url(#c)"/>
</svg>`

export const avatarPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`