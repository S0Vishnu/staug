import { useState, type CSSProperties } from 'react'
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

const tourSrc: Record<RoomId, string> = {
  living: '/illustrations/property-tour-living.jpg?v=1',
  bedroom: '/illustrations/property-tour-bedroom.jpg?v=1',
  kitchen: '/illustrations/property-tour-kitchen.jpg?v=1',
}

/** Storey lines on the tower render, top of the highest floor through the base of F01. */
const towerSlabs = [19.1, 23.09, 27.08, 31.08, 34.98, 38.89, 42.8, 46.61, 50.52, 54.43, 58.42, 62.33, 66.23, 70.14, 74.05, 78.04, 82.03]

const plateSpots: Record<UnitId, CSSProperties> = {
  '08': { left: '15%', top: '16.5%', width: '14%', height: '18.5%' },
  '09': { left: '29%', top: '16.5%', width: '14%', height: '18.5%' },
  '10': { left: '43%', top: '16.5%', width: '14.5%', height: '18.5%' },
  '11': { left: '57.5%', top: '16.5%', width: '12.5%', height: '18.5%' },
  '12': { left: '70%', top: '16.5%', width: '14.5%', height: '18.5%' },
  '07': { left: '15.2%', top: '40.5%', width: '11%', height: '12%' },
  '06': { left: '26.2%', top: '40.5%', width: '9%', height: '12%' },
  '05': { left: '15.2%', top: '66%', width: '11%', height: '13%' },
  '04': { left: '26.2%', top: '66%', width: '9%', height: '13%' },
  '01': { left: '66.5%', top: '36%', width: '17.5%', height: '13%' },
  '02': { left: '66.5%', top: '49%', width: '17.5%', height: '13%' },
  '03': { left: '65.5%', top: '62%', width: '18.5%', height: '17.5%' },
}

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
            <div className="twin-visual">
              <Masterplan />
            </div>
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
            <div className="twin-visual" style={{ background: '#454c23' }}>
              <div className="tower-frame">
                <img src="/illustrations/property-tower.jpg?v=1" alt="Tower B, gold and limestone elevation" />
                {floors.map((level) => {
                  const index = floors.length - level
                  const top = towerSlabs[index]
                  const height = towerSlabs[index + 1] - top
                  return (
                    <button
                      key={level}
                      type="button"
                      className={level === floor ? 'tower-hit on' : 'tower-hit'}
                      style={{ top: `${top}%`, height: `${height}%` }}
                      aria-label={`Floor ${padFloor(level)}`}
                      aria-pressed={level === floor}
                      onClick={() => setFloor(level)}
                    >
                      <span>F{padFloor(level)}</span>
                    </button>
                  )
                })}
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
            <div className="twin-visual" style={{ background: '#3d4126' }}>
              <div className="media-frame">
                <img src="/illustrations/property-floor-plate.jpg?v=1" alt="" />
                <div role="group" aria-label={`Units on floor ${padFloor(floor)}`}>
                  {unitIds.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={id === unit ? 'plate-hit on' : 'plate-hit'}
                      style={plateSpots[id]}
                      aria-pressed={id === unit}
                      onClick={() => setUnit(id)}
                    >
                      <span>{padFloor(floor)}-{id}</span>
                    </button>
                  ))}
                </div>
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
          <div className="twin-grid">
            <div className="twin-visual" style={{ background: '#2c2a1d' }}>
              <div className="media-frame">
                <img src="/illustrations/property-unit-plan.jpg?v=1" alt="Furnished one-bedroom plan" />
                <button type="button" className="room-hit room-bed" onClick={() => enterRoom('bedroom')}>
                  <span>Bedroom</span>
                </button>
                <button type="button" className="room-hit room-kitchen" onClick={() => enterRoom('kitchen')}>
                  <span>Kitchen</span>
                </button>
                <button type="button" className="room-hit room-living" onClick={() => enterRoom('living')}>
                  <span>Living</span>
                </button>
              </div>
            </div>
            <div className="twin-copy">
              <p className="fine">STEP 4 · UNIT {code}</p>
              <h3 className="serif-title" style={{ fontSize: 40 }}>Typical 1-bedroom plan</h3>
              <p style={{ margin: 0, fontSize: 20 }}>{info.type}</p>
              <p className="body">{info.view}. Tap a room on the plan to step inside in 360°.</p>
              <div className="cluster">
                {rooms.map((item) => (
                  <button key={item.id} type="button" className="pill" onClick={() => enterRoom(item.id)}>
                    360° {item.label} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'tour' && (
          <div className="twin-grid">
            <div className="twin-visual" style={{ background: '#1b1a18' }}>
              <div className="tour">
                <div className="tour-view">
                  <div className={`pano pan${pan}`}>
                    <img className="tour-photo" src={tourSrc[room]} alt="" />
                  </div>
                </div>
                <div className="tour-tools">
                  <button type="button" className="round" aria-label="Back to unit plan" onClick={() => setStep('unit')}>←</button>
                  <div className="cluster" style={{ alignSelf: 'flex-end' }}>
                    <button type="button" className="round" aria-label="Look left" onClick={() => setPan((value) => Math.max(0, value - 1))}>‹</button>
                    <button type="button" className="round" aria-label="Look right" onClick={() => setPan((value) => Math.min(4, value + 1))}>›</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="twin-copy twin-book">
              <p className="fine">STEP 5 · 360° TOUR</p>
              <h3 className="serif-title" style={{ fontSize: 40, color: 'var(--gold-2)' }}>{roomLabel}</h3>
              <p style={{ margin: 0, fontSize: 20 }}>Unit {code}</p>
              <p className="body">{info.type}. {info.view}.</p>
              <div className="cluster">
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
              <div className="book-fill">
                <p className="fine">VISIT</p>
                <h3 className="serif-title" style={{ fontSize: 32 }}>Book now</h3>
                <p className="body">Reserve a walkthrough of unit {code} with the sales team.</p>
                <div><Button to="/spatial#contact">Book now →</Button></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Masterplan() {
  return (
    <img
      className="masterplan"
      src="/illustrations/property-community.jpg?v=1"
      alt="Five towers around a landscaped courtyard and pool, with Tower B in gold"
    />
  )
}
