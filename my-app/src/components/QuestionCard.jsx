import { AnimatePresence, motion } from 'framer-motion'
import { Bot } from 'lucide-react'

function QuestionCard({ question, value, onChange, onEnter, step, total }) {
  const isSelect = question.options?.length

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={question.id}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.98 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[2rem] bg-white/42 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur-3xl dark:bg-slate-900/34 dark:shadow-black/20 sm:p-8"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-2 text-xs font-medium text-teal-700 dark:bg-cyan-400/10 dark:text-cyan-200">
            <Bot size={14} />
            Step {step} of {total}
          </div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            AI intake
          </span>
        </div>

        <h1 className="text-balance text-3xl font-semibold leading-tight text-slate-950 dark:text-slate-100 sm:text-5xl">
          {question.label}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-400">
          {question.helper}
        </p>

        <div className="mt-8">
          {isSelect ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChange(option)}
                  className={`rounded-3xl px-5 py-4 text-left text-sm font-semibold shadow-lg backdrop-blur-xl transition-all ${
                    value === option
                      ? 'bg-teal-400/18 text-slate-950 shadow-teal-500/15 dark:bg-cyan-400/14 dark:text-slate-50'
                      : 'bg-white/45 text-slate-600 shadow-slate-900/5 hover:bg-white/72 dark:bg-slate-950/30 dark:text-slate-300 dark:shadow-black/10 dark:hover:bg-slate-900/55'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : (
            <input
              type={question.type || 'text'}
              value={value || ''}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onEnter?.()
              }}
              placeholder={question.placeholder}
              className="w-full rounded-full bg-white/62 px-5 py-4 text-base text-slate-950 shadow-inner shadow-slate-900/5 outline-none transition-all placeholder:text-slate-400 focus:bg-white/82 focus:ring-4 focus:ring-teal-400/10 dark:bg-slate-950/42 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-950/62 dark:focus:ring-cyan-300/10"
            />
          )}
        </div>
      </motion.article>
    </AnimatePresence>
  )
}

export default QuestionCard
