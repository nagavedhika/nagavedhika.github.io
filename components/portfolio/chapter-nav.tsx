"use client"

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import portfolio from '@/content/portfolio.json'
import { useStory } from './story-provider'

export function ChapterNav() {
  const { active } = useStory()
  return (
    <div className="border-y border-border">
      <nav aria-label="Portfolio chapters" className="page-shell flex overflow-x-auto [scrollbar-width:none]">
        <div className="flex min-w-full items-center justify-between gap-7">
          {portfolio.chapters.map((chapter, index) => (
            <Link key={chapter.id} href={chapter.id === 'protosem' ? '/protosem' : `#${chapter.id}`} data-active={active === chapter.id} className="chapter-link flex shrink-0 items-center gap-2 py-6 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground">
              <span className="font-mono text-sm text-muted-foreground/65">{String(index + 1).padStart(2, '0')}</span>
              {chapter.label}
              {chapter.id === 'protosem' && <ArrowUpRight className="size-3" />}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
