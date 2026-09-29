"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import content from '@/content/protosem.json'

type Phase = keyof typeof content.galleries

export function WeekReader({ weekNumber, onChange }: { weekNumber: number | null; onChange: (number: number | null) => void }) {
  const [imageIndex, setImageIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const week = content.weeks.find((week) => week.number === weekNumber)
  const gallery = week ? week.gallery ?? content.galleries[week.phase as Phase] : []
  const image = gallery[imageIndex] ?? gallery[0]
  useEffect(() => { setImageIndex(0); scrollRef.current?.scrollTo({ top: 0 }) }, [weekNumber])

  const isVideo = image?.src?.endsWith('.mp4') || image?.src?.endsWith('.webm')
  const hasVideo = gallery.some((item) => item.src?.endsWith('.mp4') || item.src?.endsWith('.webm'))

  return (
    <Dialog open={weekNumber !== null} onOpenChange={(open) => { if (!open) onChange(null) }}>
      <DialogContent ref={scrollRef} className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-3xl md:p-8">
        {week && <>
          <DialogHeader className="pr-6"><div className="flex flex-wrap items-center gap-3 pb-2"><span className="font-mono text-sm uppercase tracking-wider text-primary">Week {String(week.number).padStart(2, '0')} / 19</span><Badge variant="outline">{week.phase}</Badge></div><DialogTitle>{week.title}</DialogTitle><DialogDescription>{week.summary}</DialogDescription></DialogHeader>
          <div className="flex flex-col gap-3 pt-3">
            {isVideo ? (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                <video
                  key={image.src}
                  src={image.src}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent p-4 text-white">
                  <span className="flex items-center gap-2 text-sm font-medium drop-shadow">
                    <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Video</span>
                    {image.caption}
                  </span>
                  <div className="pointer-events-auto flex items-center gap-2">
                    <button
                      onClick={() => setImageIndex((imageIndex - 1 + gallery.length) % gallery.length)}
                      aria-label="Previous gallery item"
                      className="flex size-8 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="font-mono text-sm">{imageIndex + 1}/{gallery.length}</span>
                    <button
                      onClick={() => setImageIndex((imageIndex + 1) % gallery.length)}
                      aria-label="Next gallery item"
                      className="flex size-8 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-background">
                <Image key={image.src} src={image.src} alt={`${image.alt} — Week ${week.number} illustration`} fill sizes="800px" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent p-4 text-foreground">
                  <span className="text-sm">{image.caption}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setImageIndex((imageIndex - 1 + gallery.length) % gallery.length)}
                      aria-label="Previous gallery image"
                      className="flex size-8 items-center justify-center rounded-full border border-foreground/30 bg-background/60 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="font-mono text-sm">{imageIndex + 1}/{gallery.length}</span>
                    <button
                      onClick={() => setImageIndex((imageIndex + 1) % gallery.length)}
                      aria-label="Next gallery image"
                      className="flex size-8 items-center justify-center rounded-full border border-foreground/30 bg-background/60 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{week.gallery ? `Week ${week.number} documentation gallery (${gallery.length} ${hasVideo ? 'photos & videos' : 'photos'})` : `Illustrative concept gallery · Replace with your Week ${week.number} photographs.`}</p>
          </div>
          <div className="reading-copy py-5"><h3>This week&apos;s focus</h3><ul className="flex flex-wrap gap-x-5 gap-y-3">{week.focus.map((focus) => <li key={focus} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" />{focus}</li>)}</ul><h3>Inside the process</h3>{week.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 text-foreground"><Lightbulb className="mt-1 size-5 shrink-0 text-primary" /><div className="flex flex-col gap-2"><span className="font-mono text-sm uppercase tracking-wider text-primary">The takeaway</span><p>{week.lesson}</p></div></div></div>
          <div className="flex items-center justify-between border-t border-border pt-4"><Button variant="outline" disabled={week.number === 0} onClick={() => onChange(week.number - 1)}><ArrowLeft data-icon="inline-start" />Previous week</Button><Button variant="outline" disabled={week.number === 19} onClick={() => onChange(week.number + 1)}>Next week<ArrowRight data-icon="inline-end" /></Button></div>
        </>}
      </DialogContent>
    </Dialog>
  )
}
