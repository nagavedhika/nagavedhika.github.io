"use client"

import Image from 'next/image'
import { ArrowDown, ArrowDownRight, ArrowUpRight, AudioLines, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import portfolio from '@/content/portfolio.json'
import { useStory } from './story-provider'

export function Hero() {
  const { toggleAudio, audio } = useStory()
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 45, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 45, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])
  const x = useTransform(springX, [-0.5, 0.5], [-8, 8])

  return (
    <section id="about" data-story-section className="relative isolate overflow-hidden" onPointerMove={(event) => {
      if (reduceMotion || event.pointerType === 'touch') return
      const rect = event.currentTarget.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
    }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
      <div className="page-shell relative">
        <div className="relative min-h-[860px] pb-16 pt-14 md:min-h-[725px] md:pb-20 md:pt-20 lg:pt-24">
          <div className="relative z-10 w-full md:max-w-[58%]">
            <div className="entrance flex items-center gap-3">
              <span className="signal-dot size-1.5 shrink-0 rounded-full bg-primary" />
              <p className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground">A mind in motion. A maker at heart.</p>
            </div>
            <h1 className="hero-title entrance entrance-delay-1 pt-8 md:pt-9">
              <span className="hero-line">Curiosity.</span>
              <span className="hero-line">Code.</span>
              <span className="hero-line text-primary">A little magic.</span>
            </h1>
            <div className="entrance entrance-delay-2 flex max-w-[410px] flex-col gap-5 pt-7 md:pt-8">
              <p className="text-base text-foreground">Hey, I&apos;m {portfolio.firstName}. <span className="text-muted-foreground">A creative developer.</span></p>
              <p className="text-base leading-relaxed text-muted-foreground">{portfolio.intro}</p>
            </div>
            <div className="entrance entrance-delay-3 flex flex-wrap items-center gap-5 pt-8">
              <a href="#projects" className="primary-link">Explore my work <ArrowUpRight className="size-4" /></a>
              <a href="#education" className="text-link min-h-12">The story so far <ArrowDownRight className="size-4" /></a>
            </div>
          </div>

          <motion.div style={{ rotateX, rotateY, x, transformPerspective: 1200 }} className="pointer-events-none absolute -right-14 bottom-0 -z-0 h-[490px] w-[550px] max-w-[115vw] md:-right-24 md:bottom-0 md:h-[745px] md:w-[760px] lg:-right-20 lg:w-[790px]">
            <Image src="/images/nova-hero.png" alt="Nova, a friendly ivory-and-chrome robot with a luminous glass face" fill priority sizes="(max-width: 767px) 550px, 790px" className="hero-art object-cover object-top" />
          </motion.div>

          <div className="absolute bottom-32 right-2 z-10 flex flex-col items-end gap-3 md:bottom-32 md:right-5 lg:right-9">
            <div className="glass-panel nova-float flex max-w-64 items-center gap-3 rounded-2xl p-4 text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"><Sparkles className="size-4" /></span>
              <span className="flex flex-col gap-1"><span className="text-sm font-medium">A little human. A little future.</span><span className="text-sm text-muted-foreground">Let&apos;s make something matter.</span></span>
            </div>
            <span className="flex items-center gap-2 pr-2 font-mono text-sm text-muted-foreground"><span className="size-1 rounded-full bg-primary" /> NOVA · YOUR DIGITAL CO-PILOT</span>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-between md:bottom-8">
            <a href="#projects" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"><span className="flex size-8 items-center justify-center rounded-full border border-border"><ArrowDown className="size-3.5" /></span><span>Scroll to discover</span></a>
            <button onClick={toggleAudio} aria-pressed={audio} aria-label={audio ? 'Turn narration off' : 'Turn narration on'} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><AudioLines className="size-4" /><span className="hidden sm:inline">Sound {audio ? 'on' : 'off'}</span></button>
          </div>
        </div>
      </div>
    </section>
  )
}
