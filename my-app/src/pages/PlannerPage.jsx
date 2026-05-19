import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Compass, Sparkles } from 'lucide-react'
import ChatUploader from '../components/ChatUploader'
import QuestionCard from '../components/QuestionCard'

const questions = [
  {
    id: 'startingFrom',
    label: 'Where are you starting from?',
    helper: 'City, hotel, airport, or current location.',
    placeholder: 'Colombo, Bandaranaike Airport, Kandy hotel...',
  },
  {
    id: 'destination',
    label: 'Where do you want to go?',
    helper: 'One place, several places, or the feeling you want the route to follow.',
    placeholder: 'Ella, Mirissa, Sigiriya, hidden beaches...',
  },
  {
    id: 'travelDates',
    label: 'Travel dates?',
    helper: 'Exact dates, flexible dates, or the number of days you have.',
    placeholder: 'June 12-20, flexible in August, 7 days...',
  },
  {
    id: 'budget',
    label: 'What is your budget?',
    helper: 'A rough range helps tune hotels, transport, meals, and experiences.',
    placeholder: 'USD 900, LKR 300,000, luxury flexible...',
  },
  {
    id: 'travelers',
    label: 'How many travelers?',
    helper: 'Include everyone who needs seats, rooms, tickets, and pacing.',
    placeholder: '2 adults, 4 friends, solo trip...',
  },
  {
    id: 'children',
    label: 'Are children joining?',
    helper: 'This helps shape safer pacing, family-friendly stays, and softer transfer days.',
    options: ['No children', 'Yes, toddlers', 'Yes, children', 'Yes, teenagers'],
  },
  {
    id: 'travelStyle',
    label: 'What travel style do you prefer?',
    helper: 'Choose the mood that should shape the journey.',
    options: ['Luxury slow travel', 'Adventure packed', 'Culture and food', 'Wellness escape'],
  },
  {
    id: 'experiences',
    label: 'What experiences do you love?',
    helper: 'Pick a direction, then add more detail in the final AI brief.',
    options: ['Wildlife and nature', 'Beaches and surfing', 'Tea country and trains', 'Temples and heritage'],
  },
  {
    id: 'accessibility',
    label: 'Any health or accessibility concerns?',
    helper: 'Mention mobility, medical, dietary, sensory, or pace constraints.',
    placeholder: 'None, low walking, vegetarian meals, motion sickness...',
  },
  {
    id: 'transport',
    label: 'Preferred transport type?',
    helper: "Choose how you want to move between Sri Lanka's coast, highlands, and cities.",
    options: ['Private driver', 'Scenic train', 'Tuk-tuk moments', 'Mixed transport'],
  },
]

const initialFormAnswers = questions.reduce(
  (answers, question) => ({ ...answers, [question.id]: '' }),
  {},
)

function PlannerPage() {
  const [step, setStep] = useState(0)
  const [formAnswers, setFormAnswers] = useState(initialFormAnswers)
  const [extraMessage, setExtraMessage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [voiceFile, setVoiceFile] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isFinalStep = step >= questions.length
  const activeQuestion = questions[step]

  const stepLabel = useMemo(() => {
    if (isFinalStep) return 'Final AI brief'
    return `Step ${step + 1} of ${questions.length}`
  }, [isFinalStep, step])

  const activeAnswer = activeQuestion ? formAnswers[activeQuestion.id] : ''
  const canAdvance = Boolean(activeAnswer?.trim())
  const canSubmit = Boolean(extraMessage.trim() || imageFile || voiceFile)

  const updateField = (field, value) => {
    setFormAnswers((current) => ({ ...current, [field]: value }))
  }

  const handleNext = () => {
    if (!canAdvance) return
    setStep((current) => Math.min(current + 1, questions.length))
  }

  const handlePrevious = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  const handleSubmit = () => {
    if (!canSubmit) return

    const payload = {
      answers: formAnswers,
      extraMessage,
      uploadedImage: imageFile?.name || null,
      uploadedVoice: voiceFile?.name || null,
      timestamp: new Date().toISOString(),
    }

    const data = new FormData()

    data.append("sessionId", crypto.randomUUID())
    data.append('message', extraMessage)
    data.append('answers', JSON.stringify(formAnswers))
    data.append('payload', JSON.stringify(payload))

    if (imageFile) {
      data.append('image', imageFile)
    }

    if (voiceFile) {
      data.append('audio', voiceFile)
    }

    fetch("https://ravindulakshitha.app.n8n.cloud/webhook-test/aiBot", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Webhook Response:", data)
      })
      .catch((err) => {
        console.error("Error:", err)
      })

    console.log(payload)
    setIsSubmitted(true)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative isolate min-h-screen overflow-hidden bg-slate-50 px-4 pt-28 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="aurora absolute inset-0 -z-30 opacity-80 dark:opacity-55" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent,rgba(248,250,252,0.76)_68%)] dark:bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.8)_70%)]" />
      <motion.div
        animate={{ y: [0, -22, 0], x: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-5rem] top-32 -z-10 h-72 w-72 rounded-full bg-teal-400/18 blur-3xl dark:bg-cyan-400/14"
      />
      <motion.div
        animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-[-5rem] -z-10 h-80 w-80 rounded-full bg-amber-300/18 blur-3xl"
      />

      <section className={`mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col ${isFinalStep ? 'pb-44 sm:pb-48' : 'pb-10'}`}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft size={16} />
            Seravo
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-2 text-xs font-medium text-slate-500 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:bg-slate-900/35 dark:text-slate-400">
            <Sparkles size={13} className="text-amber-500" />
            {stepLabel}
          </div>
        </div>

        <div className="flex flex-1 items-center">
          {!isFinalStep ? (
            <div className="w-full">
              <QuestionCard
                question={activeQuestion}
                value={activeAnswer}
                onChange={(value) => updateField(activeQuestion.id, value)}
                onEnter={handleNext}
                step={step + 1}
                total={questions.length}
              />

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrevious}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/45 px-5 py-3 text-sm font-semibold text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-35 dark:bg-slate-900/35 dark:text-slate-300 dark:hover:bg-slate-900/55"
                >
                  <ArrowLeft size={17} />
                  Previous
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: canAdvance ? -2 : 0 }}
                  whileTap={{ scale: canAdvance ? 0.98 : 1 }}
                  onClick={handleNext}
                  disabled={!canAdvance}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-teal-500/15 transition hover:bg-teal-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-cyan-300"
                >
                  Next
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-2xl text-center"
            >
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-amber-400 shadow-xl shadow-teal-500/15 dark:bg-slate-100 dark:text-slate-950">
                {isSubmitted ? <Check size={24} /> : <Compass size={24} />}
              </div>
              <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-950 dark:text-slate-100 sm:text-6xl">
                {isSubmitted ? 'Journey brief sent' : 'Add your final brief'}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-400">
                {isSubmitted
                  ? 'Your Sri Lankan travel preferences were sent. You can update the brief and send it again.'
                  : 'Use the floating AI bar for extra requests, notes, images, or a voice memo.'}
              </p>

              <button
                type="button"
                onClick={handlePrevious}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/45 px-5 py-3 text-sm font-semibold text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition hover:bg-white/70 dark:bg-slate-900/35 dark:text-slate-300 dark:hover:bg-slate-900/55"
              >
                <ArrowLeft size={17} />
                Previous
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {isFinalStep && (
        <ChatUploader
          value={extraMessage}
          onChange={setExtraMessage}
          onSend={handleSubmit}
          imageFile={imageFile}
          setImageFile={setImageFile}
          voiceFile={voiceFile}
          setVoiceFile={setVoiceFile}
          disabled={!canSubmit}
        />
      )}
    </motion.main>
  )
}

export default PlannerPage
