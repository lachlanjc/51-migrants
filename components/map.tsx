import { useScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Map, { MapRef, Marker, MarkerProps } from 'react-map-gl'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiaGFja2NsdWIiLCJhIjoiY2pscGI1eGdhMGRyNzN3bnZvbGY5NDBvZSJ9.Zm4Zduj94TrgU8h890M7gA'

const markers: Array<MarkerProps & { key: string }> = [
  {
    latitude: 27.501056407651614,
    longitude: -99.50266533594635,
    key: 'Entry',
  },
  {
    latitude: 28.005932544792948,
    longitude: -99.53438509742759,
    key: 'Checkpoint',
  },
  {
    latitude: 29.336231551988895,
    longitude: -98.59070246877118,
    key: 'San Antonio',
  },
]

const initialViewState = {
  latitude: 32,
  longitude: -100,
  zoom: 4,
  bearing: 0,
  pitch: 20,
}

export default function AnimatedMap() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef })

  const mapRef = useRef<MapRef | null>(null)

  const [headline, setHeadline] = useState(
    'We know the path of the truck, but not where the migrants got onboard.'
  )
  const [activeMarkers, setActiveMarkers] = useState<typeof markers>([])

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      console.log(progress)
      if (progress > 0 && progress < 0.2) {
        // Restore initial state on scroll up
        setActiveMarkers([])
        setHeadline(
          'We know the path of the truck, but not where the migrants got onboard.'
        )
        const { longitude, latitude, zoom } = initialViewState
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom,
          duration: 2000,
        })
      } else if (progress > 0.2 && progress < 0.4) {
        setActiveMarkers([markers[0]])
        setHeadline(
          'Here’s where the truck entered the US. 20K trucks pass through daily.'
        )
        const { longitude, latitude } = markers[0]
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 7,
          duration: 2000,
        })
      } else if (progress > 0.4 && progress < 0.6) {
        setActiveMarkers([markers[0], markers[1]])
        setHeadline(
          'Here’s where the truck smoothly passed a Border Patrol checkpoint.'
        )
        const { longitude, latitude } = markers[1]
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 8,
          duration: 2000,
        })
      } else if (progress > 0.6 && progress < 0.8) {
        setActiveMarkers(markers)
        setHeadline('The truck was found hours later in San Antonio.')
        const { longitude, latitude } = markers[2]
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 7,
          duration: 2000,
          pitch: 28,
        })
      } else if (progress > 0.8 && progress < 1) {
        setHeadline(
          'The location, off a highway outside the city, was known for migrant drop-offs.'
        )
        const { longitude, latitude } = markers[2]
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14.25,
          duration: 10000,
          pitch: 45,
        })
      }
    })
  }, [scrollYProgress])

  return (
    <section ref={scrollRef} style={{ width: '100%', height: '500vh' }}>
      <style>{`.mapboxgl-canvas, .mapboxgl-marker { position: absolute !important; }`}</style>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{
          width: '100%',
          height: '100vh',
          overflowY: 'hidden',
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
        }}
        scrollZoom={false}
      >
        {activeMarkers.map((marker, i) => (
          <Marker
            anchor="bottom"
            {...marker}
            key={marker.key}
            style={{ position: 'relative' }}
          >
            <svg
              className="fill-current text-red-500"
              width={32}
              height={32}
              viewBox="0 0 24 24"
            >
              <title>{marker.key}</title>
              <path
                d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
              />
            </svg>
            {i === activeMarkers.length - 1 && (
              <svg
                className="fill-current text-red-500 top-0 absolute animate-ping"
                width={32}
                height={32}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
                />
              </svg>
            )}
          </Marker>
        ))}
        <h2
          className="text-xl md:text-6xl font-bold md:max-w-4xl absolute left-2/4 -translate-x-1/2 top-12 text-center text-white"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.75)' }}
        >
          {headline}
        </h2>
      </Map>
    </section>
  )
}
