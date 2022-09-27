const data: Array<{ name: string; count: number; fill: string }> = [
  {
    name: 'Mexican',
    count: 22,
    fill: 'green',
  },
  {
    name: 'Guatemalan',
    count: 7,
    fill: 'pink',
  },
  {
    name: 'Honduran',
    count: 2,
    fill: 'purple',
  },
]

export default function Ethnicities() {
  const total = data.map((item) => item.count).reduce((a, b) => a + b, 0)

  return (
    <div
      className="grid justify-center"
      style={{
        gridTemplateColumns: 'repeat(2, 72px)',
        gridTemplateRows: 'repeat(2, 72px)',
        rowGap: 48,
        columnGap: 48,
      }}
    >
      <div className="bg-green-500 bg-pink-500 bg-purple-500 mt-5 -mt-2 sr-only" />
      {data.map((group, i) => (
        <div
          className={`flex flex-col align-center text-center`}
          style={{
            gridRow: i == 0 ? 1 : 2,
            gridColumn: i == 1 ? 2 : 1,
            transform: i == 1 ? 'translateY(-50%)' : undefined,
          }}
          key={group.name}
        >
          <div
            className={`bg-${group.fill}-500 rounded-full flex items-center justify-center text-white font-bold text-4xl`}
            style={{
              width: 72,
              height: 72,
              transformOrigin: 'center',
              flexShrink: 0,
              transform: `scale(${(group.count * 2) / total})`,
            }}
          >
            {group.count}
          </div>
          <span
            className={`text-sm text-zinc-500 dark:text-zinc-300 ${
              group.count > 10 ? 'mt-5' : '-mt-2'
            }`}
          >
            {group.name}
          </span>
        </div>
      ))}
    </div>
  )
}
