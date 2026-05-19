import { useEffect, useMemo, useRef, useState } from 'react'
import { ImagePlus, Mic, Paperclip, Plus, Send, Square, Volume2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function ChatUploader({
  value,
  onChange,
  onSend,
  onVoiceClick,
  imageFile,
  setImageFile,
  voiceFile,
  setVoiceFile,
  disabled,
}) {
  const textareaRef = useRef(null)
  const imageInputRef = useRef(null)
  const voiceInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [recordingError, setRecordingError] = useState('')

  const imagePreview = useMemo(() => {
    if (!imageFile) return ''
    return URL.createObjectURL(imageFile)
  }, [imageFile])

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = '0px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 132)}px`
  }, [value])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  useEffect(() => {
    if (!isRecording) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setRecordingSeconds((seconds) => seconds + 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isRecording])

  const recordingTime = useMemo(() => {
    const minutes = Math.floor(recordingSeconds / 60)
    const seconds = String(recordingSeconds % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [recordingSeconds])
  const isSendDisabled = disabled || isRecording

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSendDisabled) return
    onSend()
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
  }

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordingError('Voice recording is not supported in this browser.')
      return
    }

    try {
      setRecordingError('')
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const extension = blob.type.includes('mp4') ? 'm4a' : 'webm'
        const recordedFile = new File(
          [blob],
          `seravo-voice-note-${Date.now()}.${extension}`,
          { type: blob.type || 'audio/webm' },
        )

        setVoiceFile(recordedFile)
        setIsRecording(false)
        setRecordingSeconds(0)
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        mediaRecorderRef.current = null
      }

      recorder.start()
      setRecordingSeconds(0)
      setIsRecording(true)
    } catch (error) {
      console.error('Microphone Error:', error)
      setRecordingError('Microphone permission was blocked or unavailable.')
      setIsRecording(false)
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording()
      return
    }

    startRecording()
    onVoiceClick?.()
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-4 sm:px-6 sm:pb-6">
      <div className="pointer-events-auto mx-auto max-w-3xl">
        <AnimatePresence>
          {(imagePreview || voiceFile || isRecording || recordingError) && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="mb-3 flex flex-wrap items-end gap-2 px-2"
            >
              {imagePreview && (
                <div className="group relative overflow-hidden rounded-3xl bg-white/55 p-1 shadow-lg shadow-slate-900/10 backdrop-blur-2xl dark:bg-slate-900/60">
                  <img
                    src={imagePreview}
                    alt="Uploaded Sri Lanka travel reference"
                    className="h-24 w-32 rounded-[1.25rem] object-cover sm:h-28 sm:w-40"
                  />
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-slate-950/75 text-white opacity-90 transition hover:bg-slate-950"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {voiceFile && (
                <div className="flex max-w-full items-center gap-2 rounded-full bg-white/65 px-3 py-2 text-sm text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur-2xl dark:bg-slate-900/65 dark:text-slate-200">
                  <Volume2 size={16} className="text-amber-500" />
                  <span className="max-w-44 truncate">{voiceFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setVoiceFile(null)}
                    className="grid h-6 w-6 place-items-center rounded-full hover:bg-slate-200/70 dark:hover:bg-slate-800"
                    aria-label="Remove voice file"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}

              {isRecording && (
                <div className="flex items-center gap-3 rounded-full bg-red-500/12 px-3 py-2 text-sm font-medium text-red-600 shadow-lg shadow-red-500/10 backdrop-blur-2xl dark:text-red-300">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                  </span>
                  <span>Recording {recordingTime}</span>
                  <span className="flex h-6 items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <motion.span
                        key={bar}
                        animate={{ height: ['35%', '100%', '45%', '75%', '35%'] }}
                        transition={{
                          duration: 0.85,
                          repeat: Infinity,
                          delay: bar * 0.1,
                          ease: 'easeInOut',
                        }}
                        className="w-1 rounded-full bg-red-500/80"
                      />
                    ))}
                  </span>
                </div>
              )}

              {recordingError && (
                <div className="rounded-full bg-white/65 px-3 py-2 text-sm text-red-600 shadow-lg shadow-slate-900/10 backdrop-blur-2xl dark:bg-slate-900/65 dark:text-red-300">
                  {recordingError}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 rounded-[2rem] bg-white/78 p-2 shadow-2xl shadow-teal-950/10 ring-1 ring-white/45 backdrop-blur-2xl transition-all duration-300 focus-within:shadow-cyan-500/20 dark:bg-slate-950/72 dark:shadow-black/40 dark:ring-slate-700/35 sm:rounded-full"
        >
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              setImageFile(event.target.files?.[0] || null)
              setIsUploadOpen(false)
            }}
          />
          <input
            ref={voiceInputRef}
            type="file"
            accept="audio/*"
            className="sr-only"
            onChange={(event) => {
              setVoiceFile(event.target.files?.[0] || null)
              setIsUploadOpen(false)
            }}
          />

          <div className="relative">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsUploadOpen((current) => !current)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Open upload options"
            >
              <Plus size={21} />
            </motion.button>

            <AnimatePresence>
              {isUploadOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute bottom-14 left-0 w-48 overflow-hidden rounded-3xl bg-white/82 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl dark:bg-slate-900/85 dark:shadow-black/35"
                >
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <ImagePlus size={17} className="text-teal-500" />
                    Upload image
                  </button>
                  <button
                    type="button"
                    onClick={() => voiceInputRef.current?.click()}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Paperclip size={17} className="text-amber-500" />
                    Upload voice
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                if (isSendDisabled) return
                onSend()
              }
            }}
            rows={1}
            placeholder="Ask anything about your Sri Lankan journey..."
            className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-1 py-3 text-[15px] leading-6 text-slate-950 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-base"
          />

          <motion.button
            type="button"
            animate={isRecording ? { boxShadow: '0 0 0 8px rgba(239, 68, 68, 0.12)' } : { boxShadow: 'none' }}
            transition={{ duration: 0.8, repeat: isRecording ? Infinity : 0, repeatType: 'reverse' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMicClick}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${
              isRecording
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
            }`}
            aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
          >
            {isRecording ? <Square size={17} /> : <Mic size={20} />}
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: isSendDisabled ? 1 : 1.05 }}
            whileTap={{ scale: isSendDisabled ? 1 : 0.95 }}
            disabled={isSendDisabled}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-950 text-white shadow-lg shadow-teal-500/20 transition disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-100 dark:text-slate-950"
            aria-label={isRecording ? 'Stop recording before sending' : 'Send message'}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default ChatUploader
