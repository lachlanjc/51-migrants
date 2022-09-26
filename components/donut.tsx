export interface DonutProps
  extends
  Omit<
  React.ComponentPropsWithRef<'svg'>,
  'opacity' | 'color' | 'css' | 'sx' | 'max' | 'min'
  > {
  value: number
  min?: number
  max?: number
  title?: string
  size?: string | number
}

/**
* Single value SVG donut chart
* adapted from https://theme-ui.com/components/donut/
*/

function Donut(
  {
    size = 128,
    strokeWidth = 2,
    value = 0,
    min = 0,
    max = 1,
    title,
    ...props
  }: DonutProps
) {
  const r =
    16 -
    (typeof strokeWidth === 'number' ? strokeWidth : parseFloat(strokeWidth))
  const C = 2 * r * Math.PI
  const offset = C - ((value - min) / (max - min)) * C

  const svgProps = {
    strokeWidth,

    viewBox: '0 0 32 32',
    width: size,
    height: size,

    fill: 'none',
    stroke: 'currentcolor',
  }

  return (
    <svg
      role="img"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      {...(svgProps as {})}
      {...(props)}
    >
      {title && <title>{title}</title>}
      <circle cx={16} cy={16} r={r} opacity={1 / 8} />
      <circle
        cx={16}
        cy={16}
        r={r}
        strokeDasharray={C}
        strokeDashoffset={offset}
        transform="rotate(-90 16 16)"
        style={{ transition: '1s stroke-dashoffset ease 1s' }}
      />
    </svg>
  )
}

export default Donut
