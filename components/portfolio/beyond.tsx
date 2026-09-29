import Image from 'next/image'
import { Camera, Mountain, Music2 } from 'lucide-react'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

export function Beyond() {
  const icons = [Camera, Mountain, Music2]
  return (
    <section id="beyond" data-story-section className="page-shell section-space">
      <Reveal className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="flex flex-col gap-6"><p className="eyebrow">Away from the keyboard</p><h2 className="section-heading">There&apos;s a human<br /><span className="text-muted-foreground">behind the code.</span></h2><p className="text-base leading-relaxed text-muted-foreground">Sometimes the best way to find a new perspective is to close the laptop. I collect little moments, take the longer trail, and believe a good playlist makes everything better.</p><div className="flex flex-col gap-4 pt-2">{portfolio.hobbies.map((hobby, index) => { const Icon = icons[index]; return <span key={hobby} className="flex items-center gap-3 text-sm text-muted-foreground"><Icon className="size-4 text-primary" />{hobby}</span> })}</div></div>
        <div className="relative aspect-[1.15] overflow-hidden rounded-xl"><Image src="/images/beyond-tech.png" alt="A lone hiker looking across layers of misty blue mountains" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-6"><p className="font-mono text-sm uppercase tracking-wider text-foreground">Offline is a pretty good place to be.</p></div></div>
      </Reveal>
    </section>
  )
}
