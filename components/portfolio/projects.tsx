"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight, MoveUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

type Project = typeof portfolio.projects[number]

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <section id="projects" data-story-section className="page-shell section-space">
      <Reveal className="flex flex-col gap-5">
        <div className="flex items-center justify-between"><p className="eyebrow">A few things I&apos;ve imagined & built</p><span className="hidden font-mono text-sm text-muted-foreground sm:block">SELECTED WORK · 2026</span></div>
        <div className="flex items-end justify-between gap-5"><h2 className="section-heading">From what if <span className="text-muted-foreground">to what&apos;s next.</span></h2><a href="#protosem" className="text-link hidden shrink-0 lg:inline-flex">More experiments <ArrowUpRight className="size-4" /></a></div>
      </Reveal>
      <div className="grid gap-8 pt-10 md:grid-cols-2">
        {portfolio.projects.map((project, index) => <Reveal key={project.id} delay={index * 0.1}>
          <button className="project-card group flex w-full flex-col gap-5 text-left" onClick={() => setSelected(project)} aria-label={`Read ${project.name} case study`}>
            <div className="project-visual relative aspect-[1.55] w-full overflow-hidden rounded-xl border border-border bg-card">
              <Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
              <div className="absolute left-4 top-4"><Badge variant="secondary">Project</Badge></div>
              <span className="project-arrow absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground backdrop-blur-md"><ArrowUpRight className="size-5" /></span>
            </div>
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex flex-col gap-2"><h3 className="text-2xl font-medium tracking-tight">{project.name} <span className="font-normal text-muted-foreground">/ {project.category}</span></h3><p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p></div>
              <span className="pt-1 font-mono text-sm text-muted-foreground">{project.year}</span>
            </div>
            <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
          </button>
        </Reveal>)}
      </div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-3xl md:p-8">
          {selected && <>
            <DialogHeader className="pr-6">
              <div className="flex items-center gap-3 text-sm text-primary"><MoveUpRight className="size-4" /> CASE STUDY</div>
              <DialogTitle>{selected.name} — {selected.category}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video overflow-hidden rounded-lg"><Image src={selected.image} alt={selected.alt} fill sizes="800px" className="object-cover" /></div>
            <div className="flex flex-wrap gap-2">{selected.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
            <div className="reading-copy py-4">
              <h3>The challenge</h3><p>{selected.challenge}</p>
              <h3>The approach</h3><p>{selected.approach}</p>
              <h3>Where it leads</h3><p>{selected.outcome}</p>
              <p><strong className="font-medium text-foreground">Role:</strong> {selected.role}</p>
            </div>
            <p className="border-t border-border pt-4 text-sm text-muted-foreground">Placeholder imagery — swap in real project screenshots when available.</p>
            <a href="#contact" onClick={() => setSelected(null)} className="text-link">Let&apos;s build something like this <ArrowRight className="size-4" /></a>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  )
}
