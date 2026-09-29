"use client"

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'motion/react'
import portfolio from '@/content/portfolio.json'

type StoryContextValue = {
  active: string
  audio: boolean
  expanded: boolean
  setExpanded: (open: boolean) => void
  toggleAudio: () => void
  nextChapter: () => void
  narration: string
}

const StoryContext = createContext<StoryContextValue | null>(null)

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [active, setActive] = useState('about')
  const [audio, setAudio] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const isProtoSem = pathname.startsWith('/protosem')
  const narration = isProtoSem
    ? "Welcome to the making-of. Choose the twenty-week progression or browse the blogs. These sample entries show how you can document the real ProtoSem journey, one discovery at a time."
    : portfolio.chapters.find((chapter) => chapter.id === active)?.narration ?? portfolio.chapters[0].narration

  useEffect(() => {
    if (isProtoSem) return

    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash) {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          setActive(id)
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    scrollToHash()
    const timer1 = setTimeout(scrollToHash, 100)
    const timer2 = setTimeout(scrollToHash, 300)

    window.addEventListener('hashchange', scrollToHash)

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 })
    document.querySelectorAll('[data-story-section]').forEach((section) => observer.observe(section))

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('hashchange', scrollToHash)
      observer.disconnect()
    }
  }, [pathname, isProtoSem])

  useEffect(() => {
    if (!audio || !('speechSynthesis' in window)) return

    const speak = () => {
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) => /female|woman|girl|zira|samantha|aria|susan|jenny|victoria/i.test(voice.name))
        ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('en'))
        ?? null

      const speech = new SpeechSynthesisUtterance(narration)
      speech.rate = 0.95
      speech.pitch = 1.05

      if (preferredVoice) speech.voice = preferredVoice

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(speech)
    }

    const speechSynthesis = window.speechSynthesis
    speechSynthesis.onvoiceschanged = speak
    speak()

    return () => {
      speechSynthesis.cancel()
      speechSynthesis.onvoiceschanged = null
    }
  }, [audio, narration])

  const toggleAudio = useCallback(() => {
    if (!('speechSynthesis' in window)) return
    setAudio((value) => !value)
  }, [])

  const nextChapter = useCallback(() => {
    const index = portfolio.chapters.findIndex((chapter) => chapter.id === active)
    const next = portfolio.chapters[(index + 1) % portfolio.chapters.length]
    document.getElementById(isProtoSem ? 'protosem-content' : next.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [active, isProtoSem])

  return (
    <MotionConfig reducedMotion="user">
      <StoryContext.Provider value={{ active, audio, expanded, setExpanded, toggleAudio, nextChapter, narration }}>
        {children}
      </StoryContext.Provider>
    </MotionConfig>
  )
}

export function useStory() {
  const context = useContext(StoryContext)
  if (!context) throw new Error('useStory must be used inside StoryProvider')
  return context
}
