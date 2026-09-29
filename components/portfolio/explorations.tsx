"use client"

import { useState } from 'react'
import { ArrowRight, Compass, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

const positions = [{ left: '50%', top: '9%' }, { left: '81%', top: '33%' }, { left: '72%', top: '78%' }, { left: '25%', top: '77%' }, { left: '19%', top: '32%' }]

export function Explorations() {
  const [active, setActive] = useState(1)
  const topic = portfolio.explorations[active]
  return (
    <section id="exploring" data-story-section className="border-y border-border bg-card/25 text-foreground">
      <div className="page-shell section-space grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col items-start gap-6">
          <p className="eyebrow">Familiar ground. New frontiers.</p>
          <h2 className="section-heading">Curiosity doesn&apos;t<br /><span className="text-muted-foreground">have a finish line.</span></h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">A living constellation of things I know, things I&apos;m learning, and questions I can&apos;t leave alone.</p>
          <div className="min-h-44 w-full max-w-md border-t border-border pt-6">
            <AnimatePresence mode="wait"><motion.div key={topic.title} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.2 }} className="flex flex-col items-start gap-3" aria-live="polite"><Badge variant={topic.status === 'Exploring' ? 'default' : 'outline'}>{topic.status}</Badge><h3 className="text-xl font-medium">{topic.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{topic.description}</p></motion.div></AnimatePresence>
          </div>
          <button onClick={() => setActive((active + 1) % portfolio.explorations.length)} className="text-link">Follow another thread <ArrowRight className="size-4" /></button>
        </Reveal>
        <Reveal className="relative mx-auto aspect-square w-full max-w-lg" >
          <div className="orbit-track absolute inset-[9%]" /><div className="orbit-track absolute inset-[23%]" /><div className="orbit-track absolute inset-[36%] border-dashed" />
          <div className="absolute inset-0 flex items-center justify-center"><div className="flex flex-col items-center gap-3"><Compass className="size-8 text-primary" /><span className="font-mono text-sm tracking-widest text-muted-foreground">STAY CURIOUS</span></div></div>
          {portfolio.explorations.map((item, index) => <button key={item.title} style={positions[index]} aria-pressed={active === index} onClick={() => setActive(index)} className={cn('absolute flex max-w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg bg-background/95 px-3 py-3 text-center text-sm transition-all hover:text-primary', active === index ? 'text-primary' : 'text-muted-foreground')}><span className={cn('flex size-8 items-center justify-center rounded-full border transition-all', active === index ? 'border-primary bg-primary/15 shadow-lg shadow-primary/10' : 'border-border bg-card')}><Plus className="size-4" /></span><span>{item.title}</span></button>)}
        </Reveal>
      </div>
    </section>
  )
}
