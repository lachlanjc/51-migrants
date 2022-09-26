import { motion, useScroll } from 'framer-motion'

function Progress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed bg-red-500 h-2 top-0 left-0 right-0 z-10"
      style={{ transformOrigin: '0%', scaleX: scrollYProgress }}
    />
  )
}

export default Progress
