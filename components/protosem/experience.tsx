"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, BookOpen, CalendarRange } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import content from '@/content/protosem.json'
import { WeekTimeline } from './week-timeline'
import { BlogJournal } from './blog-journal'

export function ProtoSemExperience({ initialView }: { initialView?: 'weeks' | 'blogs' }) {
  const searchParams = useSearchParams()
  const paramView = searchParams.get('view') === 'blogs' ? 'blogs' : 'weeks'
  const [view, setView] = useState<'weeks' | 'blogs'>(initialView ?? paramView)
  const router = useRouter()
  useEffect(() => {
    if (initialView) {
      setView(initialView)
    } else {
      setView(paramView)
    }
  }, [initialView, paramView])

  return (
    <main id="main">
      <div className="page-shell relative overflow-hidden pb-12 pt-8 md:pb-16 md:pt-12">
        <Link href="/#credentials" className="text-link"><ArrowLeft className="size-4" />Back to portfolio</Link>
        <div className="relative grid items-center gap-10 pt-12 md:grid-cols-[1.15fr_0.85fr] md:pt-16">
          <div className="relative z-10 flex flex-col items-start gap-7"><p className="eyebrow text-primary">ProtoSem / The making-of</p><h1 className="text-balance text-5xl font-medium leading-[1.08] tracking-[-0.055em] md:text-6xl lg:text-7xl">The art of<br /><span className="text-primary">figuring it out.</span></h1><p className="max-w-lg text-base leading-relaxed text-muted-foreground">{content.description}</p><span className="font-mono text-sm text-muted-foreground">DISCOVER → DEFINE → MAKE → REFINE → SHARE</span></div>
          <div className="relative aspect-[1.25] overflow-hidden rounded-xl border border-border"><Image src="/images/protosem-lab.png" alt="Inside a maker's lab: prototypes, sketches, and the tools of discovery" fill priority sizes="(max-width: 767px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" /><div className="absolute bottom-6 left-6 flex items-end gap-3"><span className="text-6xl font-medium tracking-[-0.07em] text-foreground">20</span><span className="pb-1 font-mono text-sm uppercase leading-relaxed tracking-wider text-foreground">Weeks of making.<br />A mindset for life.</span></div></div>
        </div>
      </div>
      <section id="protosem-content" className="page-shell pb-20 md:pb-28">
        <Tabs value={view} onValueChange={(value) => { const next = value === 'blogs' ? 'blogs' : 'weeks'; setView(next); router.replace(next === 'blogs' ? '/protosem?view=blogs' : '/protosem', { scroll: false }) }} className="gap-10">
          <TabsList className="grid h-auto! w-full grid-cols-2 rounded-xl border border-border p-1.5">
            <TabsTrigger value="weeks" className="h-auto flex-col items-start gap-4 rounded-lg px-4 py-5 sm:px-7 sm:py-6">
              <span className="flex w-full items-center justify-between">
                <CalendarRange className="size-5" />
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  7 / 20 Completed
                </span>
              </span>
              <span className="flex flex-col items-start gap-2">
                <span className="text-lg font-medium tracking-tight sm:text-2xl">Weekly progression</span>
                <span className="text-left text-sm font-normal leading-relaxed text-muted-foreground">20 chapters · Weeks 00–06 documented with logs &amp; media</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="h-auto flex-col items-start gap-4 rounded-lg px-4 py-5 sm:px-7 sm:py-6">
              <span className="flex w-full items-center justify-between"><BookOpen className="size-5" /><ArrowUpRight className="size-4" /></span><span className="flex flex-col items-start gap-2"><span className="text-lg font-medium tracking-tight sm:text-2xl">Blogs</span><span className="text-left text-sm font-normal leading-relaxed text-muted-foreground">Thoughts beyond the workbench.</span></span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="weeks"><WeekTimeline /></TabsContent>
          <TabsContent value="blogs"><BlogJournal /></TabsContent>
        </Tabs>
      </section>
      <div className="border-y border-border bg-card/30 text-foreground"><div className="page-shell flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between"><div className="flex flex-col gap-2"><h2 className="text-2xl font-medium tracking-tight">The best part? This is just the beginning.</h2><p className="text-sm text-muted-foreground">There&apos;s always another worthwhile question.</p></div><div className="flex flex-wrap items-center gap-4"><Link href="/#credentials" className="text-link"><ArrowLeft className="size-4" />Back to portfolio</Link><Link href="/#contact" className="pill-link self-start">Let&apos;s make something <ArrowUpRight className="size-4" /></Link></div></div></div>
    </main>
  )
}
