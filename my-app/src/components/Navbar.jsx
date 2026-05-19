import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

function Navbar({ theme, setTheme }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white/45 px-3 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-2xl dark:bg-slate-950/35 dark:shadow-black/15 sm:px-5">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-950 text-amber-400 shadow-lg shadow-teal-500/20 transition-colors group-hover:bg-teal-500 group-hover:text-slate-950 dark:bg-slate-100 dark:text-slate-950">
            <Compass size={19} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-950 dark:text-slate-100">
              Seravo AI
            </span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
              Discover Beyond Routes
            </span>
          </span>
        </Link>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>
    </motion.header>
  )
}

export default Navbar
