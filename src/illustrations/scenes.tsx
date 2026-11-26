export function HeroHome() {
  return (
    <svg width="560" height="520" viewBox="0 0 560 520" role="img" aria-label="A gold wireframe tower beside a network of connected professionals">
      <defs>
        <pattern id="home-winL" width="20" height="28" patternUnits="userSpaceOnUse">
          <rect width="20" height="28" fill="#17150F" />
          <rect x="4" y="6" width="12" height="15" fill="#C9A54C" opacity="0.28" />
        </pattern>
        <pattern id="home-winR" width="20" height="28" patternUnits="userSpaceOnUse">
          <rect width="20" height="28" fill="#211E16" />
          <rect x="4" y="6" width="12" height="15" fill="#E9D49A" opacity="0.42" />
        </pattern>
        <radialGradient id="home-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#C9A54C" stopOpacity="0.22" />
          <stop offset="1" stopColor="#C9A54C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="270" r="250" fill="url(#home-glow)" />
      <polygon points="300,468 470,383 300,298 130,383" fill="none" stroke="#3A352A" strokeDasharray="4 6" />
      <g transform="translate(240,80)">
        <rect x="-90" y="90" width="90" height="300" fill="url(#home-winL)" transform="skewY(26.565)" />
        <rect x="0" y="90" width="90" height="300" fill="url(#home-winR)" transform="skewY(-26.565)" />
        <polygon points="0,0 90,45 0,90 -90,45" fill="#2E2A20" stroke="#C9A54C" strokeWidth="1.5" />
        <polyline points="-90,45 -90,345 0,390 90,345 90,45" fill="none" stroke="#C9A54C" strokeWidth="1.5" />
        <line x1="0" y1="90" x2="0" y2="390" stroke="#C9A54C" strokeWidth="1.5" />
      </g>
      <g transform="translate(380,210)">
        <rect x="-60" y="60" width="60" height="170" fill="url(#home-winL)" transform="skewY(26.565)" />
        <rect x="0" y="60" width="60" height="170" fill="url(#home-winR)" transform="skewY(-26.565)" />
        <polygon points="0,0 60,30 0,60 -60,30" fill="#2E2A20" stroke="#F4EFE4" strokeWidth="1.2" />
        <polyline points="-60,30 -60,200 0,230 60,200 60,30" fill="none" stroke="#F4EFE4" strokeWidth="1.2" />
      </g>
      <g stroke="#C9A54C" strokeWidth="1" opacity="0.7">
        <line x1="470" y1="90" x2="520" y2="170" />
        <line x1="470" y1="90" x2="400" y2="60" />
        <line x1="520" y1="170" x2="470" y2="200" />
        <line x1="400" y1="60" x2="340" y2="40" />
        <line x1="70" y1="150" x2="40" y2="250" />
        <line x1="70" y1="150" x2="140" y2="110" />
      </g>
      <g fill="#0B0B0C" stroke="#F4EFE4" strokeWidth="1.4">
        <circle cx="470" cy="90" r="16" />
        <circle cx="520" cy="170" r="12" />
        <circle cx="400" cy="60" r="10" />
        <circle cx="340" cy="40" r="7" />
        <circle cx="70" cy="150" r="14" />
        <circle cx="40" cy="250" r="9" />
        <circle cx="140" cy="110" r="8" />
      </g>
      <g fill="#C9A54C">
        <circle cx="470" cy="86" r="4.5" />
        <path d="M462 99 q8 -9 16 0" />
        <circle cx="70" cy="146" r="4" />
        <path d="M63 158 q7 -8 14 0" />
        <circle cx="520" cy="167" r="3.4" />
      </g>
      <text x="28" y="500" fill="#8E8576" fontFamily="Manrope, sans-serif" fontSize="12" letterSpacing="3">
        PEOPLE · SPACES · AUGMENTED
      </text>
    </svg>
  )
}

export function HeroStaff() {
  return (
    <svg width="560" height="480" viewBox="0 0 560 480" role="img" aria-label="Your core team in ivory, with pre-vetted STAUG professionals in gold joining the network">
      <defs>
        <radialGradient id="staff-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#C9A54C" stopOpacity="0.18" />
          <stop offset="1" stopColor="#C9A54C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="280" cy="240" r="230" fill="url(#staff-glow)" />
      <circle cx="280" cy="240" r="120" fill="none" stroke="#3A352A" strokeDasharray="3 7" />
      <circle cx="280" cy="240" r="200" fill="none" stroke="#2A2720" />
      <g stroke="#5A5243" strokeWidth="1.2">
        <line x1="280" y1="240" x2="200" y2="170" />
        <line x1="280" y1="240" x2="370" y2="180" />
        <line x1="280" y1="240" x2="230" y2="330" />
        <line x1="280" y1="240" x2="350" y2="320" />
        <line x1="200" y1="170" x2="370" y2="180" />
      </g>
      <g stroke="#C9A54C" strokeWidth="1.4" strokeDasharray="5 5">
        <line x1="370" y1="180" x2="470" y2="110" />
        <line x1="350" y1="320" x2="460" y2="380" />
        <line x1="200" y1="170" x2="110" y2="90" />
        <line x1="230" y1="330" x2="100" y2="370" />
      </g>
      <g fill="#16151A" stroke="#F4EFE4" strokeWidth="1.6">
        <circle cx="280" cy="240" r="34" />
        <circle cx="200" cy="170" r="24" />
        <circle cx="370" cy="180" r="24" />
        <circle cx="230" cy="330" r="22" />
        <circle cx="350" cy="320" r="22" />
      </g>
      <g fill="#F4EFE4">
        <circle cx="280" cy="232" r="8" />
        <path d="M266 254c3-8 8-11 14-11s11 3 14 11z" />
        <circle cx="200" cy="165" r="5.5" />
        <path d="M190 181c2-6 6-8 10-8s8 2 10 8z" />
        <circle cx="370" cy="175" r="5.5" />
        <path d="M360 191c2-6 6-8 10-8s8 2 10 8z" />
        <circle cx="230" cy="325" r="5" />
        <path d="M221 340c2-5 5-7 9-7s7 2 9 7z" />
        <circle cx="350" cy="315" r="5" />
        <path d="M341 330c2-5 5-7 9-7s7 2 9 7z" />
      </g>
      <g fill="#C9A54C">
        <circle cx="470" cy="110" r="22" />
        <circle cx="460" cy="380" r="20" />
        <circle cx="110" cy="90" r="20" />
        <circle cx="100" cy="370" r="22" />
      </g>
      <g fill="#0B0B0C">
        <circle cx="470" cy="105" r="5.5" />
        <path d="M460 121c2-6 6-8 10-8s8 2 10 8z" />
        <circle cx="460" cy="375" r="5" />
        <path d="M451 390c2-5 5-7 9-7s7 2 9 7z" />
        <circle cx="110" cy="85" r="5" />
        <path d="M101 100c2-5 5-7 9-7s7 2 9 7z" />
        <circle cx="100" cy="365" r="5.5" />
        <path d="M90 381c2-6 6-8 10-8s8 2 10 8z" />
      </g>
      <g fontFamily="Manrope, sans-serif" fontSize="12" letterSpacing="2">
        <text x="236" y="300" fill="#A69D8B">YOUR TEAM</text>
        <text x="408" y="62" fill="#D8B865">+ STAUG TALENT</text>
      </g>
    </svg>
  )
}

export function CommunityAerial() {
  return (
    <svg width="1200" height="560" viewBox="0 0 1200 560" role="img" aria-label="Aerial digital-twin view of a residential community with ivory towers around a landscaped courtyard">
      <defs>
        <linearGradient id="aerial-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A1813" />
          <stop offset="1" stopColor="#0F0E10" />
        </linearGradient>
        <pattern id="aerial-wl" width="14" height="22" patternUnits="userSpaceOnUse">
          <rect width="14" height="22" fill="#D3CAB7" />
          <rect x="2" y="5" width="10" height="12" fill="#8E8576" />
          <rect y="18" width="14" height="4" fill="#ECE6D9" />
        </pattern>
        <pattern id="aerial-wr" width="14" height="22" patternUnits="userSpaceOnUse">
          <rect width="14" height="22" fill="#B7AD98" />
          <rect x="2" y="5" width="10" height="12" fill="#6E6656" />
          <rect x="2" y="7" width="4" height="8" fill="#E8C877" opacity="0.7" />
          <rect y="18" width="14" height="4" fill="#D9D1C0" />
        </pattern>
        <g id="aerial-tw">
          <rect x="-70" y="70" width="70" height="240" fill="url(#aerial-wl)" transform="skewY(26.565)" />
          <rect y="70" width="70" height="240" fill="url(#aerial-wr)" transform="skewY(-26.565)" />
          <polygon points="0,0 70,35 0,70 -70,35" fill="#F4EFE4" />
          <polygon points="0,8 56,36 0,62 -56,36" fill="none" stroke="#C9A54C" strokeWidth="1" />
        </g>
        <g id="aerial-ts">
          <rect x="-70" y="70" width="70" height="170" fill="url(#aerial-wl)" transform="skewY(26.565)" />
          <rect y="70" width="70" height="170" fill="url(#aerial-wr)" transform="skewY(-26.565)" />
          <polygon points="0,0 70,35 0,70 -70,35" fill="#F4EFE4" />
          <polygon points="0,8 56,36 0,62 -56,36" fill="none" stroke="#C9A54C" strokeWidth="1" />
        </g>
      </defs>
      <rect width="1200" height="560" fill="url(#aerial-sky)" />
      <polygon points="600,180 1180,470 600,760 20,470" fill="#1C1D17" />
      <polygon points="600,250 1040,470 600,690 160,470" fill="#262A1F" />
      <g stroke="#3A352A" strokeWidth="10" fill="none">
        <line x1="-40" y1="300" x2="560" y2="0" />
        <line x1="660" y1="0" x2="1240" y2="290" />
      </g>
      <polygon points="600,380 720,440 610,495 490,435" fill="#9FB8B4" />
      <polygon points="600,388 704,440 610,486 506,435" fill="#B9CDC9" />
      <polygon points="540,470 620,510 580,530 500,490" fill="#3D4632" />
      <g fill="#3E4A33">
        <circle cx="420" cy="470" r="14" />
        <circle cx="450" cy="500" r="11" />
        <circle cx="760" cy="470" r="13" />
        <circle cx="790" cy="440" r="10" />
        <circle cx="700" cy="520" r="12" />
        <circle cx="520" cy="540" r="10" />
      </g>
      <use href="#aerial-tw" x="430" y="60" />
      <use href="#aerial-tw" x="780" y="70" />
      <use href="#aerial-ts" x="270" y="190" />
      <use href="#aerial-ts" x="950" y="210" />
      <use href="#aerial-ts" x="840" y="300" />
      <g fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">
        <line x1="250" y1="76" x2="250" y2="120" stroke="#C9A54C" />
        <circle cx="250" cy="52" r="24" fill="#0B0B0C" stroke="#C9A54C" strokeWidth="1.5" />
        <text x="250" y="58" fill="#C9A54C" fontSize="11">AIR</text>
        <text x="288" y="96" fill="#E9E3D6">Airport</text>
        <line x1="610" y1="56" x2="610" y2="80" stroke="#C9A54C" />
        <circle cx="610" cy="32" r="24" fill="#0B0B0C" stroke="#C9A54C" strokeWidth="1.5" />
        <text x="610" y="36" fill="#C9A54C" fontSize="11">SEA</text>
        <text x="660" y="36" fill="#E9E3D6">Marina</text>
        <line x1="1010" y1="96" x2="1010" y2="190" stroke="#C9A54C" />
        <circle cx="1010" cy="72" r="24" fill="#0B0B0C" stroke="#C9A54C" strokeWidth="1.5" />
        <text x="1010" y="76" fill="#C9A54C" fontSize="11">BCH</text>
        <text x="1046" y="116" fill="#E9E3D6">Beach</text>
        <line x1="140" y1="236" x2="140" y2="300" stroke="#C9A54C" />
        <circle cx="140" cy="212" r="24" fill="#0B0B0C" stroke="#C9A54C" strokeWidth="1.5" />
        <text x="140" y="216" fill="#C9A54C" fontSize="11">GLF</text>
        <text x="172" y="256" fill="#E9E3D6">Golf</text>
        <line x1="1120" y1="236" x2="1120" y2="330" stroke="#C9A54C" />
        <circle cx="1120" cy="212" r="24" fill="#0B0B0C" stroke="#C9A54C" strokeWidth="1.5" />
        <text x="1120" y="216" fill="#C9A54C" fontSize="11">ML</text>
        <text x="1152" y="256" fill="#E9E3D6">Mall</text>
      </g>
      <g fontFamily="Manrope, sans-serif" fontSize="11" letterSpacing="2" fill="#A69D8B">
        <text x="24" y="540">PROPERTY TWIN · SAMPLE COMMUNITY</text>
        <text x="1176" y="540" textAnchor="end">DRAG · ZOOM · EXPLORE</text>
      </g>
    </svg>
  )
}

export function HeroMissing() {
  const plots: { c: number; r: number; label: string; vacant?: boolean }[] = [
    { c: 0, r: 0, label: 'A1' },
    { c: 1, r: 0, label: 'A2' },
    { c: 2, r: 0, label: 'A3' },
    { c: 0, r: 1, label: 'B1' },
    { c: 1, r: 1, label: '404', vacant: true },
    { c: 2, r: 1, label: 'B3' },
    { c: 0, r: 2, label: 'C1' },
    { c: 1, r: 2, label: 'C2' },
    { c: 2, r: 2, label: 'C3' },
  ]

  return (
    <svg width="560" height="480" viewBox="0 0 560 480" role="img" aria-label="A plotted layout with one address missing, marked 404">
      <defs>
        <radialGradient id="missing-glow" cx="50%" cy="46%" r="52%">
          <stop offset="0" stopColor="#C9A54C" stopOpacity="0.2" />
          <stop offset="1" stopColor="#C9A54C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="280" cy="220" r="210" fill="url(#missing-glow)" />
      <g fill="none" stroke="#8E8576" strokeWidth="1.2">
        <path d="M64 72 V40" />
        <path d="M64 40 l-5 9 h10 z" fill="#C9A54C" stroke="#C9A54C" />
      </g>
      <text x="80" y="46" fill="#8E8576" fontFamily="Manrope, sans-serif" fontSize="11" letterSpacing="2">N</text>
      <rect x="86" y="78" width="388" height="312" fill="none" stroke="#2A2720" strokeDasharray="4 6" />
      {plots.map((plot) => {
        const x = 104 + plot.c * 122
        const y = 96 + plot.r * 100
        return (
          <g key={`${plot.c}-${plot.r}`}>
            <rect
              x={x}
              y={y}
              width="104"
              height="82"
              fill={plot.vacant ? '#0B0B0C' : '#17150F'}
              stroke={plot.vacant ? '#C9A54C' : '#3A352A'}
              strokeWidth={plot.vacant ? 1.6 : 1.2}
              strokeDasharray={plot.vacant ? '5 5' : undefined}
            />
            {plot.vacant ? (
              <text
                x={x + 52}
                y={y + 48}
                fill="#C9A54C"
                fontFamily="Cormorant Garamond, Georgia, serif"
                fontSize="28"
                fontWeight="600"
                textAnchor="middle"
              >
                404
              </text>
            ) : (
              <>
                <rect x={x + 28} y={y + 22} width="48" height="34" fill="#211E16" stroke="#C9A54C" strokeWidth="1" opacity="0.9" />
                <text
                  x={x + 12}
                  y={y + 20}
                  fill="#A69D8B"
                  fontFamily="Manrope, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.6"
                >
                  {plot.label}
                </text>
              </>
            )}
          </g>
        )
      })}
      <text x="280" y="424" fill="#8E8576" fontFamily="Manrope, sans-serif" fontSize="12" letterSpacing="3" textAnchor="middle">
        UNMAPPED ADDRESS
      </text>
    </svg>
  )
}

export function IconPeople() {
  return (
    <svg className="icon icon-lg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="17" cy="16" r="6" />
      <path d="M6 38c1-7 6-11 11-11s10 4 11 11" />
      <circle cx="34" cy="19" r="5" />
      <path d="M29 30c2-2 3.5-3 5-3 4 0 8 3 9 9" />
    </svg>
  )
}

export function IconCube() {
  return (
    <svg className="icon icon-lg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M24 5 41 14v20L24 43 7 34V14z" />
      <path d="M7 14l17 9 17-9M24 23v20" />
    </svg>
  )
}

export function IconPlot() {
  return (
    <svg className="icon" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M28 10 52 22 28 34 4 22z" />
      <path d="M16 22v-8l6-3 6 3v14M34 25V12l6-3 6 3v13" />
      <circle cx="28" cy="22" r="3" />
      <path d="M4 22v10l24 12 24-12V22" />
    </svg>
  )
}

export function IconPlan() {
  return (
    <svg className="icon" width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="6" y="8" width="44" height="40" />
      <path d="M6 26h18V8M24 34v14M24 34h10M34 26h16M34 26v8" />
      <circle cx="42" cy="40" r="4" />
    </svg>
  )
}
