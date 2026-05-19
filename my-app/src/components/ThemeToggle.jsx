import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/70 text-slate-900 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition-colors duration-300 hover:border-teal-300 dark:border-slate-700/70 dark:bg-slate-900/75 dark:text-slate-100 dark:shadow-black/30"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle
