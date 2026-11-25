type LogoProps = {
  height?: number
}

export function Logo({ height = 34 }: LogoProps) {
  const width = Math.round(height * 4.15)
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 148 36"
      role="img"
      aria-label="STAUG"
    >
      <polygon className="logo-diamond" points="8,3 16,18 8,33 0,18" fill="#C9A54C" />
      <text
        x="24"
        y="27"
        fill="currentColor"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="28"
        fontWeight="600"
        letterSpacing="1.5"
      >
        STAUG
      </text>
    </svg>
  )
}
