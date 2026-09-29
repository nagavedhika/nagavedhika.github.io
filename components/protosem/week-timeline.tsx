"use client"

import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import content from '@/content/protosem.json'
import { WeekReader } from './week-reader'

export function WeekTimeline() {
  const [query, setQuery] = useState('')
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const weeks = useMemo(() => content.weeks.filter((week) => `${week.number} ${week.title} ${week.phase} ${week.summary} ${week.focus.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim())), [query])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-3"><h2 className="text-3xl font-medium tracking-tight">One week at a time.</h2><p className="text-sm leading-relaxed text-muted-foreground">Sample journal entries with illustrative galleries. Ready for your real journey.</p></div>
        <Field className="relative max-w-sm"><FieldLabel htmlFor="week-search" className="sr-only">Search weeks</FieldLabel><Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" /><Input id="week-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search weeks or topics..." className="h-11 pl-10 pr-9" />{query && <button onClick={() => setQuery('')} aria-label="Clear week search" className="absolute right-2 top-2 flex size-7 items-center justify-center text-muted-foreground"><X className="size-4" /></button>}</Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {weeks.map((week) => <button key={week.number} onClick={() => setSelectedWeek(week.number)} aria-label={`Open Week ${week.number}: ${week.title}`} className="group flex min-h-52 flex-col justify-between gap-6 rounded-xl border border-border bg-card/30 p-6 text-left text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-background/30">
          <div className="flex w-full items-center justify-between"><span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">Week {String(week.number).padStart(2, '0')}</span><ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></div>
          <div className="flex flex-col gap-3"><h3 className="text-lg font-medium tracking-tight group-hover:text-primary">{week.title}</h3><p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{week.summary}</p></div>
          <span className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-1 rounded-full bg-primary" />{week.phase}</span>
        </button>)}
      </div>
      {weeks.length === 0 && <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-16 text-center"><Search className="size-6 text-muted-foreground" /><p className="text-base">No matching chapters.</p><button onClick={() => setQuery('')} className="text-link">Clear search and see all 20 weeks</button></div>}
      <p role="status" className="font-mono text-sm text-muted-foreground">{weeks.length} OF 20 CHAPTERS {query && `· MATCHING “${query}”`}</p>
      <WeekReader weekNumber={selectedWeek} onChange={setSelectedWeek} />
    </div>
  )
}
