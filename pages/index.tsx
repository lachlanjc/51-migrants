import type { NextPage } from 'next'
import Head from 'next/head'

import Progress from '../components/progress'
import Travelers from '../components/travelers'
import Map from '../components/map'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center snap-y snap-mandatory dark:bg-black dark:text-white">
      <Head>
        <title>51 Migrants</title>
      </Head>
      <Progress />

      <section className="snap-start flex w-full flex-1 flex-col items-center justify-center px-20 py-24 text-center">
        <h1 className="text-6xl font-bold max-w-3xl">
          Last June, 51 migrants were found dead in a truck in{' '}
          <span className="text-red-500">San&nbsp;Antonio, Texas</span>.
        </h1>
      </section>

      <Map />

      <Travelers />

      <footer className="p-8 w-full items-center justify-center border-t dark:border-zinc-900">
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto text-sm">
          <p className="text-zinc-600 dark:text-zinc-400 mr-auto">
            {'Source: '}
            <a
              href="https://www.nytimes.com/live/2022/06/28/us/texas-migrants-dead"
              className="hover:underline text-blue-500"
            >
              The New York Times
            </a>
            {'. Site by '}
            <a
              href="https://lachlanjc.com"
              className="hover:underline text-blue-500"
            >
              @lachlanjc
            </a>
            {', September 2022.'}
          </p>
          <a
            className="hover:underline text-blue-500"
            href="https://github.com/lachlanjc/migrant-deaths-story"
          >
            Open source on GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
