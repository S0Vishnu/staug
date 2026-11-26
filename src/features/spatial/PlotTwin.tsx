import { useMemo, useState } from 'react'
import {
  describePlot,
  plots,
  plotsByBlock,
  statusLabel,
  statusOrder,
  type PlotStatus,
} from '../../data/plots'

export function PlotTwin() {
  const [selected, setSelected] = useState('207')
  const [filter, setFilter] = useState<PlotStatus | null>(null)

  const counts = useMemo(() => {
    const tally = { av: 0, bk: 0, sd: 0, bl: 0 }
    for (const plot of plots) tally[plot.status] += 1
    return tally
  }, [])

  const plot = plots.find((item) => item.no === selected) ?? plots[0]
  const detail = describePlot(plot)
  const ticks = [...plots].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  )

  return (
    <div className="plot-frame">
      <div className="site">
        <div className="scan" aria-hidden="true" />
        <div className="hud-chip" style={{ top: 18, left: 18 }}>
          <span className="live-dot" />
          PLOT TWIN · LIVE 3D
        </div>
        <div className="hud-chip" style={{ top: 18, right: 18 }}>N</div>
        <div className="hud-chip" style={{ bottom: 18, left: 18, letterSpacing: '0.08em', fontWeight: 600 }}>
          Hover a plot · tap for details
        </div>
        <div className="site-stage">
          <img
            className="site-photo"
            src="/illustrations/plot-site.jpg?v=2"
            alt=""
          />
          <div className="tilt" role="group" aria-label="Plotted layout, 80 plots in four blocks">
            {plotsByBlock.map((block) => (
              <div key={block[0]?.block} className="blk">
                {block.map((item) => {
                  const dim = filter && filter !== item.status
                  const on = item.no === plot.no
                  return (
                    <button
                      key={item.no}
                      type="button"
                      className={`pl s-${item.status}${dim ? ' p-dim' : ''}${on ? ' p-sel' : ''}`}
                      aria-label={`Plot ${item.no}, ${statusLabel[item.status]}`}
                      aria-pressed={on}
                      onClick={() => setSelected(item.no)}
                    >
                      {item.no}
                    </button>
                  )
                })}
              </div>
            ))}
            <div className="gate">▲ MAIN ENTRANCE</div>
          </div>
        </div>
      </div>
      <aside className="plot-aside">
        <div className="plot-intro">
          <p className="eyebrow">Development</p>
          <h3 className="serif-title">Sample Plotted Layout</h3>
          <p className="plot-loc">[Locality, City, State · PIN]</p>
          <span className="demo-tag">Demo data</span>
        </div>
        <div className="stat-pair">
          <div>
            <p><strong>{plots.length}</strong></p>
            <p className="quiet">total plots</p>
          </div>
          <div>
            <p><strong>4</strong></p>
            <p className="quiet">blocks</p>
          </div>
        </div>
        <div className="avail">
          <p className="avail-label">Plot availability</p>
          <div className="ticks" aria-hidden="true">
            {ticks.map((item) => (
              <span key={item.no} className={`tick s-${item.status}`} />
            ))}
          </div>
          <div className="legend">
            {statusOrder.map((key) => (
              <button
                key={key}
                type="button"
                className={filter === key ? 'lg lg-on' : 'lg'}
                aria-pressed={filter === key}
                onClick={() => setFilter((current) => (current === key ? null : key))}
              >
                <span className={`dot s-${key}`} />
                <strong>{counts[key]}</strong>
                <span>{statusLabel[key]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="selected">
          <div className="sel-top">
            <div>
              <p className="fine">Selected plot</p>
              <p className="sel-name">Plot {plot.no}</p>
            </div>
            <p className="sel-meta">
              <span className={`dot s-${plot.status}`} />
              <span>{statusLabel[plot.status]}</span>
              <span className="sel-block">{plot.block}</span>
            </p>
          </div>
          <dl className="facts">
            <div><dt>Facing</dt><dd>{detail.facing}</dd></div>
            <div><dt>Area</dt><dd>{detail.sizeLabel} sq.ft</dd></div>
            <div><dt>Size</dt><dd>{detail.dims}</dd></div>
            <div>
              <dt>Corner</dt>
              <dd className={detail.corner ? 'c-yes' : 'c-no'}>{detail.corner ? 'Yes' : 'No'}</dd>
            </div>
            <div><dt>Frontage</dt><dd>{detail.road}</dd></div>
            <div><dt>Approval</dt><dd>{detail.approval}</dd></div>
          </dl>
          <div className="price-row">
            <span className="quiet">{detail.rate}</span>
            <span className="sel-price">{detail.price}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
