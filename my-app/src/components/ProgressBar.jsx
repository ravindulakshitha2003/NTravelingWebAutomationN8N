import { motion } from 'framer-motion'

function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
        <span>Journey signal</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 p-1 dark:bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-amber-400 shadow-lg shadow-teal-500/30"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
