import { useRef } from 'react'
import { useInView } from 'framer-motion'

import Ethnicities from './ethnicities'
import Donut from './donut'
import { ThermometerHigh } from 'react-bootstrap-icons'

function Travelers() {
  const ref = useRef(null)
  const isSectionInView = useInView(ref, { once: false })

  const donutRef = useRef(null)
  const isDonutInView = useInView(donutRef)

  return (
    <section
      className="snap-start flex w-full flex-1 flex-col items-center justify-center overflow-y-hidden py-24 px-8 text-center bg-zinc-100 dark:bg-zinc-900"
      ref={ref}
    >
      <h2
        className="text-5xl font-bold max-w-3xl"
        style={{
          transform: isSectionInView ? 'none' : 'translateY(-100px)',
          opacity: isSectionInView ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}
      >
        There were 64 travelers.
      </h2>

      <div className="grid md:grid-cols-2 mx-auto gap-12 mt-10 mb-20">
        <div className="p-12 bg-white dark:bg-zinc-800 shadow-xl rounded-xl w-80 h-80 text-center flex flex-col items-center justify-between">
          <h3 className="text-2xl text-zinc-600 dark:text-zinc-300">
            Heat was the primary cause of death.
          </h3>
          <p className="flex items-center gap-2 text-red-500 text-6xl mb-4">
            <ThermometerHigh size={64} />
            99º F
          </p>
          <a
            className="text-zinc-600 dark:text-zinc-300 text-sm"
            href="https://darksky.net/details/29.4246,-98.4946/2022-6-27/us12/en"
          >
            High temperature on June 27. Source: Dark Sky
          </a>
        </div>

        <div className="px-14 py-12 bg-white dark:bg-zinc-800 shadow-xl rounded-xl w-80 h-80 text-center flex flex-col items-center justify-between">
          <h3
            className="text-2xl text-zinc-600 dark:text-zinc-300"
            ref={donutRef}
          >
            At least <strong className="text-red-500">51 of 64</strong>{' '}
            travelers died.
          </h3>
          <Donut
            size={128}
            className="text-red-500"
            value={isDonutInView ? 51 / 64 : 0}
            strokeWidth={3}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold max-w-xl">
        Each person who died that day planned to be at only the{' '}
        <span className="text-green-600">start of a new life</span> here.
      </h2>

      <div className="grid md:grid-cols-2 mx-auto gap-12 mt-12">
        <div className="px-14 py-12 bg-white dark:bg-zinc-800 shadow-xl rounded-xl w-80 h-80 text-center flex flex-col items-center justify-between">
          <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4">
            <strong className="text-cyan-600">39 men</strong>
            {' + '}
            <strong className="text-rose-600">12 women</strong>
          </p>
          <div className="grid grid-cols-8 gap-3">
            {new Array(39).fill(null as never).map((i) => (
              <span
                key={`m${i}`}
                className="bg-cyan-600 rounded-full w-4 h-4 dib"
              />
            ))}
            {new Array(12).fill(null as never).map((i) => (
              <span
                key={`f${i}`}
                className="bg-rose-600 rounded-full w-4 h-4 dib"
              />
            ))}
          </div>
        </div>

        <div className="p-14 bg-white dark:bg-zinc-800 shadow-xl rounded-xl w-80 h-80 text-center flex flex-col items-center justify-between">
          <Ethnicities />
        </div>
      </div>
    </section>
  )
}

export default Travelers
