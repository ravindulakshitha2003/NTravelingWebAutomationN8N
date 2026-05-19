import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, MapPinned, Plane, Sparkles, Waves } from 'lucide-react'

const featureItems = [
  { icon: Bot, label: 'AI itinerary intelligence' },
  { icon: Waves, label: 'Tropical experience matching' },
  { icon: MapPinned, label: 'Sri Lanka first planning' },
]

function LandingPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative isolate min-h-screen overflow-hidden px-4 pt-28"
    >
      <div className="aurora absolute inset-0 -z-30 opacity-80 dark:opacity-60" />
      <div className="seravo-grid absolute inset-0 -z-20 opacity-70 dark:opacity-35" />
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-6 top-32 -z-10 h-44 w-44 rounded-full bg-teal-400/25 blur-3xl dark:bg-cyan-400/20"
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 right-6 -z-10 h-56 w-56 rounded-full bg-amber-400/24 blur-3xl"
      />

      <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col items-center justify-center pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 shadow-xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-900/55 dark:text-slate-300"
        >
          <Sparkles size={16} className="text-amber-500" />
          AI travel concierge for Sri Lanka
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: [0, 4, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-7 -top-7 hidden h-16 w-16 place-items-center rounded-3xl border border-white/45 bg-white/70 text-teal-600 shadow-2xl shadow-teal-500/20 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:text-cyan-200 sm:grid"
          >
            <Plane size={25} />
          </motion.div>

          <h1 className="text-balance text-6xl font-semibold leading-none text-slate-950 dark:text-slate-100 sm:text-8xl lg:text-9xl">
            Seravo AI
          </h1>
          <p className="mt-5 text-2xl font-medium text-teal-600 dark:text-cyan-300 sm:text-4xl">
            Discover Beyond Routes
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            Smart AI travel planning crafted for unforgettable Sri Lankan journeys,
            from misty highlands to luminous southern coastlines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
          className="mt-10 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/planner"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-semibold text-white shadow-2xl shadow-teal-500/25 transition-all hover:bg-teal-500 hover:text-slate-950 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-cyan-300 sm:w-auto"
            >
              Start The Journey
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/65 px-7 py-4 font-semibold text-slate-900 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all hover:border-amber-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-amber-300 sm:w-auto"
          >
            Explore Features
          </motion.button>
        </motion.div>

        <motion.div
          id="features"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38, ease: 'easeOut' }}
          className="mt-12 grid w-full max-w-4xl gap-3 sm:grid-cols-3"
        >
          {featureItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/40 bg-white/55 p-4 text-left shadow-xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/55 dark:bg-slate-900/45"
            >
              <Icon className="mb-4 text-teal-600 dark:text-cyan-300" size={22} />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </motion.main>
  )
}

export default LandingPage
