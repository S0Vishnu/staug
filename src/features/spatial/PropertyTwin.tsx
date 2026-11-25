import { useState } from 'react'
import { Button } from '../../components/Button'
import {
  floors,
  padFloor,
  rooms,
  twinSteps,
  unitIds,
  unitTypes,
  type RoomId,
  type TwinStep,
  type UnitId,
} from '../../data/property'

export function PropertyTwin() {
  const [step, setStep] = useState<TwinStep>('plot')
  const [floor, setFloor] = useState(7)
  const [unit, setUnit] = useState<UnitId>('12')
  const [room, setRoom] = useState<RoomId>('living')
  const [pan, setPan] = useState(1)

  const info = unitTypes[unit]
  const code = `${padFloor(floor)}-${unit}`
  const roomLabel = rooms.find((item) => item.id === room)?.label ?? 'Living & Dining'

  function enterRoom(next: RoomId) {
    setRoom(next)
    setPan(1)
    setStep('tour')
  }

  return (
    <div className="stack stack-lg">
      <div className="steps-nav" role="tablist" aria-label="Twin journey">
        {twinSteps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={step === item.id ? 'step step-on' : 'step'}
            aria-selected={step === item.id}
            onClick={() => setStep(item.id)}
          >
            <span style={{ opacity: 0.7 }}>{padFloor(index + 1)}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="twin-stage">
        {step === 'plot' && (
          <div className="twin-grid">
            <Masterplan />
            <div className="twin-copy">
              <p className="fine">STEP 1 · PLOT TWIN</p>
              <h3 className="serif-title" style={{ fontSize: 38 }}>The community at a glance</h3>
              <p className="body">
                Five towers around a landscaped courtyard and pool. In a full Plot Twin, buyers orbit the 3D site, tap amenities and see what is nearby.
              </p>
              <div><Button onClick={() => setStep('tower')}>Enter Tower B →</Button></div>
            </div>
          </div>
        )}

        {step === 'tower' && (
          <div className="twin-grid">
            <div className="plan-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="tower">
                <div className="tower-cap" />
                {floors.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={level === floor ? 'fl fl-on' : 'fl'}
                    aria-label={`Floor ${padFloor(level)}`}
                    onClick={() => setFloor(level)}
                  >
                    <span>F{padFloor(level)}</span>
                    <span>{level === floor ? '12 units' : ''}</span>
                  </button>
                ))}
                <div className="lobby">LOBBY</div>
              </div>
            </div>
            <div className="twin-copy">
              <p className="fine">STEP 2 · TOWER B</p>
              <h3 className="serif-title" style={{ fontSize: 48, color: 'var(--gold-2)' }}>Floor {padFloor(floor)}</h3>
              <p style={{ margin: 0, fontSize: 20 }}>12 units | 1–3 bedrooms</p>
              <p className="body">Select any floor on the tower to highlight it, then open its floor plate.</p>
              <div><Button onClick={() => setStep('floor')}>View floor plate →</Button></div>
            </div>
          </div>
        )}

        {step === 'floor' && (
          <div className="twin-grid">
            <div className="plate-wrap">
              <div className="plate">
                <div className="corH">CORRIDOR</div>
                <div className="corV" />
                <div className="core-lifts">LIFTS</div>
                {unitIds.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`u g${id}${id === unit ? ' u-on' : ''}`}
                    onClick={() => setUnit(id)}
                  >
                    {padFloor(floor)}-{id}
                  </button>
                ))}
              </div>
            </div>
            <div className="twin-copy">
              <p className="fine">STEP 3 · FLOOR {padFloor(floor)}</p>
              <h3 className="serif-title" style={{ fontSize: 48, color: 'var(--gold-2)' }}>Unit {code}</h3>
              <p style={{ margin: 0, fontSize: 20 }}>{info.type}</p>
              <p className="body">{info.view}</p>
              <div><Button onClick={() => setStep('unit')}>Open unit plan →</Button></div>
            </div>
          </div>
        )}

        {step === 'unit' && (
          <div style={{ padding: 36 }} className="stack stack-md">
            <div className="split">
              <div>
                <p className="fine" style={{ marginBottom: 6 }}>STEP 4 · UNIT {code}</p>
                <h3 className="serif-title" style={{ fontSize: 38 }}>Typical 1-bedroom plan</h3>
              </div>
              <p className="quiet">Tap a room to step inside in 360°</p>
            </div>
            <div className="plan-scroll">
              <UnitPlan onEnter={enterRoom} />
            </div>
            <div className="cluster">
              {rooms.map((item) => (
                <button key={item.id} type="button" className="pill" onClick={() => enterRoom(item.id)}>
                  360° {item.label} →
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'tour' && (
          <div className="tour">
            <div className="tour-view">
              <div className={`pano pan${pan}`}>
                <RoomScene room={room} />
              </div>
            </div>
            <div style={{ position: 'absolute', top: 20, left: 20 }} className="stack" >
              <div className="cluster">
                <button type="button" className="round" aria-label="Back to unit plan" onClick={() => setStep('unit')}>←</button>
                <div style={{ background: '#1B1A18', padding: '8px 16px', borderRadius: 4 }}>
                  <p className="quiet" style={{ margin: 0 }}>Floor {padFloor(floor)}</p>
                  <p style={{ margin: 0, fontWeight: 700 }}>Unit {code}</p>
                </div>
              </div>
              <div style={{ background: 'rgba(27,26,24,0.92)', padding: '10px 16px', borderRadius: 4 }}>
                {info.type} · <span className="mark">{roomLabel}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 78, right: 20 }} className="cluster">
              <button type="button" className="round" aria-label="Look left" onClick={() => setPan((value) => Math.max(0, value - 1))}>‹</button>
              <button type="button" className="round" aria-label="Look right" onClick={() => setPan((value) => Math.min(4, value + 1))}>›</button>
            </div>
            <div className="tour-bar">
              {rooms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={room === item.id ? 'pill pill-on' : 'pill'}
                  onClick={() => enterRoom(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Masterplan() {
  return (
    <svg viewBox="0 0 640 520" role="img" aria-label="Top-down site plan with five towers around a central pool; Tower B highlighted" style={{ background: '#1C1D17', width: '100%', height: 'auto' }}>
      <rect x="40" y="40" width="560" height="440" rx="8" fill="#262A1F" />
      <rect x="250" y="220" width="140" height="80" rx="6" fill="#9FB8B4" />
      <rect x="258" y="228" width="124" height="64" rx="4" fill="#B9CDC9" />
      <g fill="#3E4A33">
        <circle cx="200" cy="260" r="16" />
        <circle cx="440" cy="250" r="14" />
        <circle cx="320" cy="350" r="15" />
        <circle cx="230" cy="380" r="12" />
        <circle cx="420" cy="370" r="13" />
        <circle cx="320" cy="180" r="12" />
      </g>
      <g fill="#E9E2D4" stroke="#8E8576">
        <path d="M70 70h170v60h-110v80H70z" />
        <path d="M400 70h170v140h-60v-80H400z" />
        <path d="M70 300h60v110h110v50H70z" />
        <path d="M420 420h150v40H420z" />
      </g>
      <path d="M270 70h100v90h-100z" fill="#C9A54C" stroke="#F1DFA6" strokeWidth="2" />
      <g fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="700" fill="#2A2720" textAnchor="middle">
        <text x="140" y="104">A</text>
        <text x="320" y="120" fill="#0B0B0C">B</text>
        <text x="530" y="104">C</text>
        <text x="100" y="440">D</text>
        <text x="495" y="445">E</text>
      </g>
      <text x="320" y="265" fontFamily="Manrope, sans-serif" fontSize="11" fill="#2A2720" textAnchor="middle" letterSpacing="2">POOL</text>
    </svg>
  )
}

function UnitPlan({ onEnter }: { onEnter: (room: RoomId) => void }) {
  return (
    <svg viewBox="0 0 900 640" style={{ width: '100%', minWidth: 620, height: 'auto' }} role="img" aria-label="Furnished one-bedroom unit plan">
      <rect x="90" y="56" width="710" height="530" fill="#F4EFE4" />
      <g stroke="#FFFFFF" strokeWidth="8">
        <rect x="100" y="66" width="180" height="200" fill="#CFC8BD" />
        <rect x="292" y="90" width="138" height="140" fill="#CFC8BD" />
        <rect x="288" y="238" width="112" height="66" fill="#8E8576" />
        <rect x="100" y="272" width="180" height="120" fill="#ECE6D9" />
        <rect x="288" y="312" width="140" height="80" fill="#D9D1C0" />
        <rect x="100" y="400" width="330" height="170" fill="#8A6A4A" />
        <rect x="436" y="66" width="356" height="510" fill="#D6D6D2" />
      </g>
      <rect x="120" y="430" width="200" height="120" fill="#E6DECD" />
      <rect x="160" y="450" width="140" height="80" fill="#FFFDF8" />
      <rect x="580" y="120" width="150" height="40" fill="#6B5236" />
      <ellipse cx="636" cy="360" rx="74" ry="32" fill="#FFFDF8" stroke="#CBBFA6" />
      <rect x="560" y="450" width="180" height="90" fill="#A8A398" />
      <path d="M260 586h560c0 40-40 46-60 46H300c-20 0-40-6-40-46z" fill="#E9E2D4" stroke="#FFFFFF" strokeWidth="4" />
      <RoomTag x={140} y={150} label="Bathroom" />
      <RoomTag x={300} y={140} label="Powder" width={110} />
      <RoomTag x={300} y={256} label="Laundry" width={90} />
      <RoomTag x={118} y={318} label="Closet" width={110} />
      <RoomTag x={300} y={336} label="Corridor" width={110} />
      <RoomTag x={190} y={470} label="Bedroom" gold onClick={() => onEnter('bedroom')} />
      <RoomTag x={470} y={100} label="Entrance" width={100} />
      <RoomTag x={560} y={180} label="Kitchen" gold onClick={() => onEnter('kitchen')} />
      <RoomTag x={560} y={340} label="Dining" width={90} />
      <RoomTag x={560} y={470} label="Living" gold onClick={() => onEnter('living')} />
      <RoomTag x={470} y={600} label="Balcony" width={90} />
    </svg>
  )
}

function RoomTag({
  x,
  y,
  label,
  width = 100,
  gold = false,
  onClick,
}: {
  x: number
  y: number
  label: string
  width?: number
  gold?: boolean
  onClick?: () => void
}) {
  const tag = (
    <g>
      <rect x={x} y={y} width={width} height={26} rx="4" fill={gold ? '#C9A54C' : '#26231C'} />
      <text x={x + width / 2} y={y + 18} fill={gold ? '#0B0B0C' : '#F4EFE4'} fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="600" textAnchor="middle">
        {label}
      </text>
    </g>
  )
  if (!onClick) return tag
  return (
    <g role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={onClick} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') onClick()
    }}>
      {tag}
    </g>
  )
}

function RoomScene({ room }: { room: RoomId }) {
  return (
    <svg className="layer" viewBox="0 0 2400 600" preserveAspectRatio="none" role="img" aria-label={`360 degree view of the ${room}`}>
      <rect width="2400" height="600" fill="#E9E2D4" />
      <polygon points="0,0 2400,0 1800,90 600,90" fill="#F7F3EA" />
      <polygon points="0,0 600,90 600,460 0,600" fill="#DCD4C3" />
      <polygon points="2400,0 1800,90 1800,460 2400,600" fill="#DCD4C3" />
      <polygon points="0,600 600,460 1800,460 2400,600" fill="#BDB29C" />
      {room === 'living' && <Living />}
      {room === 'bedroom' && <Bedroom />}
      {room === 'kitchen' && <Kitchen />}
    </svg>
  )
}

function Living() {
  return (
    <g>
      <rect x="980" y="140" width="440" height="300" fill="#FBF8F1" stroke="#8E8576" strokeWidth="6" />
      <line x1="1200" y1="140" x2="1200" y2="440" stroke="#8E8576" strokeWidth="6" />
      <rect x="790" y="430" width="450" height="56" rx="12" fill="#E7E2D8" />
      <ellipse cx="1010" cy="530" rx="100" ry="24" fill="#4B3B2A" />
      <ellipse cx="1625" cy="470" rx="150" ry="36" fill="#F3EEE4" stroke="#CBBFA6" />
      <rect x="1490" y="490" width="90" height="90" rx="20" fill="#6B6A4F" />
      <rect x="1680" y="490" width="90" height="90" rx="20" fill="#6B6A4F" />
      <rect x="220" y="360" width="340" height="80" fill="#6B5236" />
      <rect x="1940" y="200" width="220" height="100" fill="#1B1A18" />
    </g>
  )
}

function Bedroom() {
  return (
    <g>
      <rect x="900" y="80" width="600" height="360" fill="#D9CDB4" />
      <rect x="960" y="250" width="480" height="140" rx="10" fill="#9AA58A" />
      <polygon points="940,390 1460,390 1540,540 860,540" fill="#F7F4EE" />
      <rect x="820" y="350" width="100" height="90" fill="#6B5236" />
      <rect x="1480" y="350" width="100" height="90" fill="#6B5236" />
      <rect x="140" y="80" width="360" height="380" fill="#6B5236" />
      <rect x="1960" y="150" width="280" height="230" fill="#FBF8F1" stroke="#8E8576" strokeWidth="6" />
    </g>
  )
}

function Kitchen() {
  return (
    <g>
      <rect x="640" y="100" width="720" height="130" fill="#6B5236" />
      <rect x="640" y="230" width="720" height="100" fill="#EEE7DA" />
      <rect x="640" y="346" width="720" height="90" fill="#6B5236" />
      <polygon points="760,450 1340,450 1400,540 700,540" fill="#F7F3EA" />
      <rect x="1380" y="96" width="150" height="340" fill="#CFC8BB" stroke="#B4AC9C" />
      <rect x="1960" y="150" width="280" height="230" fill="#FBF8F1" stroke="#8E8576" strokeWidth="6" />
      <circle cx="290" cy="220" r="40" fill="#5E6B48" />
    </g>
  )
}
