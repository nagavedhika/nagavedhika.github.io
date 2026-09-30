"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import content from '@/content/protosem.json'

type Phase = keyof typeof content.galleries

function renderStoryParagraph(content: string, key: number) {
  if (content.includes('|') && content.includes('\n|')) {
    const lines = content.trim().split('\n').filter((l) => l.trim().startsWith('|'))
    if (lines.length >= 2) {
      const headers = lines[0].split('|').map((s) => s.trim()).filter(Boolean)
      const dataRows = lines.slice(1).filter((l) => !l.includes('---')).map((l) => l.split('|').map((s) => s.trim()).filter(Boolean))
      return (
        <div key={key} className="my-3 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-medium text-foreground">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/20">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-4 py-2.5 ${cIdx === 0 ? 'font-medium text-foreground' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  if (content.includes('→') && !content.includes('\n')) {
    const steps = content.split('→').map((s) => s.trim())
    return (
      <div key={key} className="my-2 flex flex-wrap items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs sm:text-sm">
        {steps.map((step, idx) => (
          <span key={idx} className="flex items-center gap-1.5 font-medium text-foreground">
            <span className="rounded bg-primary/10 px-2 py-1 text-primary">{step}</span>
            {idx < steps.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </div>
    )
  }

  if (content.startsWith('* ') || content.includes('\n* ')) {
    const items = content.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('* ')).map((l) => l.slice(2))
    return (
      <ul key={key} className="my-2 grid gap-1.5 sm:grid-cols-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (content.startsWith('# ')) {
    return <h3 key={key} className="mt-6 border-b border-border pb-2 text-xl font-medium tracking-tight text-foreground">{content.replace(/^#\s+/, '')}</h3>
  }
  if (content.startsWith('## ')) {
    return <h4 key={key} className="mt-4 text-base font-medium tracking-tight text-primary">{content.replace(/^##\s+/, '')}</h4>
  }
  if (content.startsWith('### ')) {
    return <h5 key={key} className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground">{content.replace(/^###\s+/, '')}</h5>
  }

  if (content.startsWith('![') && content.includes('](')) {
    const match = content.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (match) {
      const [, caption, src] = match
      const isVideo = src.endsWith('.mp4') || src.endsWith('.webm')
      return (
        <figure key={key} className="my-5 overflow-hidden rounded-xl border border-border bg-card/60 shadow-sm">
          {isVideo ? (
            <div className="relative aspect-video w-full bg-black">
              <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
              <Image
                src={src}
                alt={caption || 'Lab photograph'}
                fill
                sizes="(max-width: 768px) 100vw, 750px"
                className="object-cover"
              />
            </div>
          )}
          {caption && (
            <figcaption className="flex items-center gap-2 border-t border-border/70 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="font-medium text-foreground/90">{caption}</span>
            </figcaption>
          )}
        </figure>
      )
    }
  }

  if (content.startsWith('**') && content.includes('**')) {
    const parts = content.split('**')
    return (
      <p key={key} className="text-sm leading-relaxed text-muted-foreground">
        <strong className="font-medium text-foreground">{parts[1]}</strong>
        {parts.slice(2).join('**')}
      </p>
    )
  }

  return <p key={key} className="text-sm leading-relaxed text-muted-foreground">{content}</p>
}

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
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
                {gallery.map((item, idx) => {
                  const isItemVideo = item.src?.endsWith('.mp4') || item.src?.endsWith('.webm')
                  const isSelected = idx === imageIndex
                  return (
                    <button
                      key={item.src + idx}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      aria-label={`View media ${idx + 1}: ${item.caption || item.alt}`}
                      className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background opacity-100'
                          : 'border-border/70 opacity-60 hover:opacity-100 hover:border-muted-foreground'
                      }`}
                    >
                      {isItemVideo ? (
                        <div className="flex h-full w-full items-center justify-center bg-black/80">
                          <span className="rounded bg-primary/80 px-1 py-0.5 text-[9px] font-mono font-semibold uppercase text-primary-foreground">
                            Video
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.caption || item.alt}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                      <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 font-mono text-[9px] font-medium text-white">
                        {idx + 1}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{week.gallery ? `Week ${week.number} documentation gallery (${gallery.length} ${hasVideo ? 'photos & videos' : 'photos'})` : `Illustrative concept gallery · Replace with your Week ${week.number} photographs.`}</p>
          </div>
          <div className="reading-copy py-5"><h3>This week&apos;s focus</h3><ul className="flex flex-wrap gap-x-5 gap-y-3">{week.focus.map((focus) => <li key={focus} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-primary" />{focus}</li>)}</ul><h3>Inside the process</h3>{week.story.map((paragraph, index) => renderStoryParagraph(paragraph, index))}<div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 text-foreground"><Lightbulb className="mt-1 size-5 shrink-0 text-primary" /><div className="flex flex-col gap-2"><span className="font-mono text-sm uppercase tracking-wider text-primary">The takeaway</span><p>{week.lesson}</p></div></div></div>
          <div className="flex items-center justify-between border-t border-border pt-4"><Button variant="outline" disabled={week.number === 0} onClick={() => onChange(week.number - 1)}><ArrowLeft data-icon="inline-start" />Previous week</Button><Button variant="outline" disabled={week.number === 19} onClick={() => onChange(week.number + 1)}>Next week<ArrowRight data-icon="inline-end" /></Button></div>
        </>}
      </DialogContent>
    </Dialog>
  )
}
