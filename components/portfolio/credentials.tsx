"use client"

import { useState } from 'react'
import { ArrowUpRight, Award, BriefcaseBusiness, FileBadge, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

export function Credentials() {
  const [selected, setSelected] = useState<typeof portfolio.credentials[number] | null>(null)
  const icons = [BriefcaseBusiness, Award, FileBadge]
  return (
    <section id="credentials" data-story-section className="page-shell section-space scroll-mt-24">
      <Reveal className="flex flex-col gap-5"><p className="eyebrow">Lessons beyond the syllabus</p><h2 className="section-heading">Learning with <span className="text-muted-foreground">intent.</span></h2></Reveal>
      <div className="grid gap-5 pt-10 md:grid-cols-3">
        {portfolio.credentials.map((credential, index) => {
          const Icon = icons[index]
          return <Reveal key={credential.title} delay={index * 0.08}>
            <button onClick={() => setSelected(credential)} className="group flex h-full w-full flex-col gap-7 rounded-xl border border-border p-7 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card">
              <div className="flex w-full items-center justify-between"><Icon className="size-7 text-primary" /><ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" /></div>
              <div className="flex flex-col gap-3"><span className="text-sm text-muted-foreground">{credential.type}</span><h3 className="text-xl font-medium tracking-tight">{credential.title}</h3><span className="font-mono text-sm text-muted-foreground">{credential.period}</span></div>
            </button>
          </Reveal>
        })}
      </div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto p-7 sm:max-w-lg">
          {selected && <>
            <DialogHeader><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.type} · {selected.period}</DialogDescription></DialogHeader>
            <Badge variant="outline">{selected.issuer}</Badge>
            <p className="text-base leading-relaxed text-muted-foreground">{selected.description}</p>
            {selected.certificates?.map((cert) => (
              <a key={cert.src} href={cert.src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-lg border border-border">
                <img src={cert.src} alt={cert.label} className="w-full transition-transform group-hover:scale-[1.02]" />
              </a>
            ))}
            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
              {selected.certificateId && <span className="font-mono">ID: {selected.certificateId}</span>}
              {selected.verifyUrl && <a href={selected.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-link">Verify <ExternalLink className="size-3.5" /></a>}
            </div>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  )
}
