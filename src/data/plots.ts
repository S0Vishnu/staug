export type PlotStatus = 'av' | 'bk' | 'sd' | 'bl'

export type Plot = {
  no: string
  block: string
  blockIndex: number
  status: PlotStatus
  size: number
  row: number
  col: number
}

export const statusLabel: Record<PlotStatus, string> = {
  av: 'Available',
  bk: 'Booked',
  sd: 'Sold',
  bl: 'Blocked',
}

export const statusOrder: PlotStatus[] = ['av', 'bk', 'sd', 'bl']

function statusOf(block: number, index: number): PlotStatus {
  const r = (index * 37 + block * 53 + 11) % 20
  if (r < 10) return 'av'
  if (r < 14) return 'bk'
  if (r < 18) return 'sd'
  return 'bl'
}

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

export const plots: Plot[] = [1, 2, 3, 4].flatMap((block) =>
  Array.from({ length: 20 }, (_, index) => {
    const size = 1140 + ((index * 7 + block * 13) % 10) * 15
    return {
      no: `${block}${pad(index + 1)}`,
      block: 'ABCD'[block - 1] ?? 'A',
      blockIndex: block,
      status: statusOf(block, index),
      size,
      row: Math.floor(index / 10),
      col: index % 10,
    }
  }),
)

export const plotsByBlock = [1, 2, 3, 4].map((block) =>
  plots.filter((plot) => plot.blockIndex === block),
)

export function describePlot(plot: Plot) {
  const isCorner = plot.col === 0 || plot.col === 9
  const front = plot.row === 0 ? 'North' : 'South'
  const side = plot.col === 0 ? 'West' : 'East'
  const lakh = ((plot.size * 2175) / 100000).toFixed(1)
  return {
    facing: isCorner ? `${front}-${side}` : front,
    corner: isCorner,
    road: isCorner ? '30 ft + 40 ft' : '30 ft wide',
    dims: `30 × ${Math.round(plot.size / 30)} ft`,
    sizeLabel: plot.size.toLocaleString('en-IN'),
    price: plot.status === 'av' ? `₹${lakh} L` : statusLabel[plot.status],
    rate: '₹2,175 / sq.ft · indicative',
    approval: 'DTCP · RERA',
  }
}
