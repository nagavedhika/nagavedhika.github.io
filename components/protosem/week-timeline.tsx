"use client"

import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, Clock, Layers, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import content from '@/content/protosem.json'
import { WeekReader } from './week-reader'

type StatusFilter = 'all' | 'completed' | 'upcoming'

export function WeekTimeline() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const allWeeks = content.weeks
  const completedCount = useMemo(() => allWeeks.filter((w) => w.completed).length, [allWeeks])
  const upcomingCount = allWeeks.length - completedCount
  const progressPercent = Math.round((completedCount / allWeeks.length) * 100)

  const filteredWeeks = useMemo(() => {
    return allWeeks.filter((week) => {
      // Status filter
      if (statusFilter === 'completed' && !week.completed) return false
      if (statusFilter === 'upcoming' && week.completed) return false

      // Search query
      if (!query.trim()) return true
      const searchText = `${week.number} week ${week.number} ${week.title} ${week.phase} ${week.summary} ${week.focus.join(' ')} ${week.completed ? 'completed done finished' : 'upcoming planned in-progress'}`.toLowerCase()
      return searchText.includes(query.toLowerCase().trim())
    })
  }, [allWeeks, statusFilter, query])

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Search */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-medium tracking-tight">One week at a time.</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {completedCount} / {allWeeks.length} Completed ({progressPercent}%)
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Documented engineering logs, reflections, and prototype progress through the 20-week journey.
          </p>
        </div>

        <Field className="relative max-w-sm w-full md:w-80">
          <FieldLabel htmlFor="week-search" className="sr-only">Search weeks</FieldLabel>
          <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
          <Input
            id="week-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search weeks, topics, or status..."
            className="h-11 pl-10 pr-9"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear week search"
              className="absolute right-2 top-2 flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </Field>
      </div>

      {/* Progression Bar & Filter Tabs */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/40 p-4 sm:p-5 backdrop-blur-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Journey Progression</span>
              <span className="font-mono text-xs font-medium text-foreground">{completedCount} of {allWeeks.length} Chapters Logged</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Weeks 00–06 with detailed lab notes, hardware photos, CAD models &amp; reflections
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-muted/40 p-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-card text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers className="size-3.5" />
              <span>All ({allWeeks.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                statusFilter === 'completed'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Check className="size-3.5 stroke-[2.5] text-emerald-500" />
              <span>Completed ({completedCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('upcoming')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                statusFilter === 'upcoming'
                  ? 'bg-card text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Clock className="size-3.5 text-muted-foreground" />
              <span>Upcoming ({upcomingCount})</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-primary to-primary shadow-xs transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Phase 1 &amp; 2 Completed (Discover &amp; Define)
            </span>
            <span>Week 06 Active · Next: Week 07</span>
          </div>
        </div>
      </div>

      {/* Week Grid Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredWeeks.map((week) => {
          const isCompleted = !!week.completed
          return (
            <button
              key={week.number}
              onClick={() => setSelectedWeek(week.number)}
              aria-label={`Open Week ${week.number}: ${week.title} (${isCompleted ? 'Completed' : 'Upcoming'})`}
              className={`group relative flex min-h-60 flex-col justify-between gap-6 rounded-2xl p-6 text-left transition-all duration-300 ${
                isCompleted
                  ? 'border border-primary/25 bg-card/85 text-foreground shadow-xs hover:-translate-y-1 hover:border-primary hover:bg-card hover:shadow-xl hover:shadow-primary/10'
                  : 'border border-dashed border-border/80 bg-card/25 text-muted-foreground hover:-translate-y-0.5 hover:border-border hover:bg-card/45'
              }`}
            >
              {/* Highlight top bar for completed weeks */}
              {isCompleted && (
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-emerald-500 via-primary to-primary/80" />
              )}

              {/* Card Top Row: Week Number + Status Badge */}
              <div className="flex w-full items-center justify-between pt-1">
                <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                  isCompleted ? 'text-primary' : 'text-muted-foreground/60'
                }`}>
                  Week {String(week.number).padStart(2, '0')}
                </span>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shadow-2xs">
                    <Check className="size-3 stroke-[2.5]" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-normal text-muted-foreground/75">
                    <Clock className="size-3" />
                    Upcoming
                  </span>
                )}
              </div>

              {/* Card Middle: Title + Summary */}
              <div className="flex flex-col gap-2.5">
                <h3 className={`text-base font-semibold tracking-tight transition-colors ${
                  isCompleted
                    ? 'text-foreground group-hover:text-primary'
                    : 'text-muted-foreground/90 group-hover:text-foreground'
                }`}>
                  {week.title}
                </h3>
                <p className={`line-clamp-2 text-xs leading-relaxed ${
                  isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {week.summary}
                </p>
              </div>

              {/* Card Bottom: Phase + Action Link */}
              <div className="flex w-full items-center justify-between border-t border-border/40 pt-3 text-xs">
                <span className={`flex items-center gap-1.5 font-medium ${
                  isCompleted ? 'text-foreground/80' : 'text-muted-foreground/60'
                }`}>
                  <span className={`size-1.5 rounded-full ${
                    isCompleted ? 'bg-emerald-500' : 'bg-muted-foreground/40'
                  }`} />
                  {week.phase}
                </span>

                <span className={`inline-flex items-center gap-1 font-medium transition-transform group-hover:translate-x-0.5 ${
                  isCompleted
                    ? 'text-primary group-hover:underline'
                    : 'text-muted-foreground/60 group-hover:text-foreground'
                }`}>
                  {isCompleted ? 'Read log' : 'Preview'}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredWeeks.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-16 text-center">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-base font-medium">No matching chapters found.</p>
          <div className="flex items-center gap-3">
            {query && (
              <button onClick={() => setQuery('')} className="text-link text-sm">
                Clear query
              </button>
            )}
            {statusFilter !== 'all' && (
              <button onClick={() => setStatusFilter('all')} className="text-link text-sm">
                Show all chapters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground font-mono">
        <span>SHOWING {filteredWeeks.length} OF {allWeeks.length} CHAPTERS {statusFilter !== 'all' && `· FILTER: ${statusFilter.toUpperCase()}`} {query && `· SEARCH: “${query}”`}</span>
        <span>{completedCount} COMPLETED · {upcomingCount} UPCOMING</span>
      </div>

      {/* Week Reader Modal */}
      <WeekReader weekNumber={selectedWeek} onChange={setSelectedWeek} />
    </div>
  )
}
