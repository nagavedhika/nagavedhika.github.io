"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Lightbulb, Printer, Zap } from 'lucide-react'
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
      <ul key={key} className="my-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
        <figure key={key} className="my-6 overflow-hidden rounded-2xl border border-border bg-card/70 shadow-md">
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
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-muted/15 p-2 sm:p-5 md:p-6">
              <Image
                src={src}
                alt={caption || 'Lab photograph'}
                width={1600}
                height={1200}
                className="h-auto max-h-[680px] w-auto max-w-full rounded-xl object-contain shadow-sm"
                unoptimized
              />
            </div>
          )}
          {caption && (
            <figcaption className="flex items-center gap-2.5 border-t border-border/70 bg-muted/30 px-5 py-3 text-xs sm:text-sm text-muted-foreground">
              <span className="size-2 shrink-0 rounded-full bg-primary" />
              <span className="font-medium text-foreground/90">{caption}</span>
            </figcaption>
          )}
        </figure>
      )
    }
  }

  const dayMatch = content.match(/^(Day \d+\s*[—–-]\s*[^.]+?\.)\s*(.*)$/)
  if (dayMatch) {
    return (
      <div key={key} className="rounded-xl border border-border/50 bg-card/40 p-4 sm:p-5">
        <h5 className="mb-2 flex items-center gap-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          <span className="inline-block size-2 rounded-full bg-primary" />
          {dayMatch[1]}
        </h5>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {dayMatch[2]}
        </p>
      </div>
    )
  }

  if (content.startsWith('**') && content.includes('**')) {
    const parts = content.split('**')
    return (
      <p key={key} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        <strong className="font-semibold text-foreground">{parts[1]}</strong>
        {parts.slice(2).join('**')}
      </p>
    )
  }

  return <p key={key} className="text-sm leading-relaxed text-muted-foreground sm:text-base">{content}</p>
}

export function WeekReader({ weekNumber, onChange }: { weekNumber: number | null; onChange: (number: number | null) => void }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [fabricationTab, setFabricationTab] = useState<'laser' | '3d'>('laser')
  const scrollRef = useRef<HTMLDivElement>(null)
  const week = content.weeks.find((week) => week.number === weekNumber)
  const isWeek6 = week?.number === 6
  const hasInlineMedia = week?.story.some((s) => s.startsWith('![')) ?? false
  const gallery = (!isWeek6 && !hasInlineMedia && week) ? (week.gallery && week.gallery.length > 0 ? week.gallery : content.galleries[week.phase as Phase] ?? []) : []
  const image = gallery[imageIndex] ?? gallery[0]

  useEffect(() => {
    setImageIndex(0)
    setFabricationTab('laser')
    scrollRef.current?.scrollTo({ top: 0 })
  }, [weekNumber])

  const isVideo = image?.src?.endsWith('.mp4') || image?.src?.endsWith('.webm')
  const hasVideo = gallery.some((item) => item.src?.endsWith('.mp4') || item.src?.endsWith('.webm'))

  // Split Week 06 story between Laser Cutting and 3D Printing
  const printStartIndex = week?.story.findIndex((s) => s === '# 3D Printing') ?? -1
  const displayedStory = isWeek6 && printStartIndex !== -1
    ? (fabricationTab === 'laser' ? week.story.slice(0, printStartIndex) : week.story.slice(printStartIndex))
    : week?.story ?? []

  const displayedFocus = isWeek6
    ? (fabricationTab === 'laser'
        ? ["Laser cutting", "CAD parameter setup", "Digital fabrication", "Precision engraving", "Rapid prototyping"]
        : ["3D printing", "Slicer preparation", "Filament types", "FDM / SLA technologies", "H2S 3D printer"])
    : week?.focus ?? []

  const displayedLesson = isWeek6
    ? (fabricationTab === 'laser'
        ? "Precision laser cutting converts digital vector contours into physically exact parts — mastering focal distance, feed rate, and material ventilation ensures clean edges and sharp engraving without burn damage."
        : "Additive manufacturing turns geometry into physical form layer by layer — understanding slicer infill, filament thermal profiles, and print bed leveling determines dimensional accuracy and structural strength.")
    : week?.lesson

  return (
    <Dialog open={weekNumber !== null} onOpenChange={(open) => { if (!open) onChange(null) }}>
      <DialogContent ref={scrollRef} className="w-[96vw] max-w-[96vw] sm:max-w-[95vw] md:max-w-[94vw] lg:max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1536px] max-h-[94dvh] overflow-y-auto p-6 sm:p-10 md:p-12 lg:p-14">
        {week && <>
          <DialogHeader className="pr-6"><div className="flex flex-wrap items-center gap-3 pb-2"><span className="font-mono text-sm uppercase tracking-wider text-primary">Week {String(week.number).padStart(2, '0')} / 19</span><Badge variant="outline">{week.phase}</Badge></div><DialogTitle className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">{week.title}</DialogTitle><DialogDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">{week.summary}</DialogDescription></DialogHeader>
          {isWeek6 && (
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Select Fabrication Track</span>
                <span className="font-mono text-xs text-primary">{fabricationTab === 'laser' ? 'Subtractive Manufacturing' : 'Additive Manufacturing'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/40 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => { setFabricationTab('laser'); scrollRef.current?.scrollTo({ top: 0 }) }}
                  className={`flex items-center justify-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    fabricationTab === 'laser'
                      ? 'bg-card text-foreground shadow-sm border border-border/80 ring-1 ring-primary/40'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Zap className={`size-4 ${fabricationTab === 'laser' ? 'text-primary' : ''}`} />
                  <span className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-semibold">Laser Cutting</span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">4 Media</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => { setFabricationTab('3d'); scrollRef.current?.scrollTo({ top: 0 }) }}
                  className={`flex items-center justify-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    fabricationTab === '3d'
                      ? 'bg-card text-foreground shadow-sm border border-border/80 ring-1 ring-primary/40'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Printer className={`size-4 ${fabricationTab === '3d' ? 'text-primary' : ''}`} />
                  <span className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-semibold">3D Printing</span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">3 Media</span>
                  </span>
                </button>
              </div>
            </div>
          )}
          {!isWeek6 && !hasInlineMedia && gallery.length > 0 && (
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
        )}
          <div className="reading-copy py-5">
            <h3>{isWeek6 ? (fabricationTab === 'laser' ? 'Laser cutting focus' : '3D printing focus') : "This week's focus"}</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {displayedFocus.map((focus) => (
                <li key={focus} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary" />{focus}
                </li>
              ))}
            </ul>
            <h3>Inside the process</h3>
            {displayedStory.map((paragraph, index) => renderStoryParagraph(paragraph, index))}
            {isWeek6 && (
              <div className="my-6 flex flex-col gap-3 rounded-xl border border-border/80 bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground">Next fabrication track</span>
                  <span className="text-sm font-medium text-foreground">
                    {fabricationTab === 'laser' ? 'Ready to explore 3D printing & H2S specifications?' : 'Want to revisit laser cutting & vector engraving?'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFabricationTab(fabricationTab === 'laser' ? '3d' : 'laser')
                    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="gap-2 self-start sm:self-auto"
                >
                  {fabricationTab === 'laser' ? <Printer className="size-3.5 text-primary" /> : <Zap className="size-3.5 text-primary" />}
                  <span>{fabricationTab === 'laser' ? 'Switch to 3D Printing' : 'Switch to Laser Cutting'}</span>
                </Button>
              </div>
            )}
            <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 text-foreground">
              <Lightbulb className="mt-1 size-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-2">
                <span className="font-mono text-sm uppercase tracking-wider text-primary">The takeaway</span>
                <p>{displayedLesson}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4"><Button variant="outline" disabled={week.number === 0} onClick={() => onChange(week.number - 1)}><ArrowLeft data-icon="inline-start" />Previous week</Button><Button variant="outline" disabled={week.number === 19} onClick={() => onChange(week.number + 1)}>Next week<ArrowRight data-icon="inline-end" /></Button></div>
        </>}
      </DialogContent>
    </Dialog>
  )
}
