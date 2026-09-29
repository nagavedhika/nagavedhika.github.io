"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Clock3, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import content from '@/content/protosem.json'

type Blog = typeof content.blogs[number]

export function BlogJournal() {
  const [selected, setSelected] = useState<Blog | null>(null)
  const [query, setQuery] = useState('')
  const blogs = content.blogs.filter((blog) => `${blog.title} ${blog.category} ${blog.excerpt}`.toLowerCase().includes(query.toLowerCase().trim()))
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="flex flex-col gap-3"><h2 className="text-3xl font-medium tracking-tight">Notes from the messy middle.</h2><p className="text-sm leading-relaxed text-muted-foreground">Sample essays on making, questioning, and finding a better way forward.</p></div><Field className="relative max-w-sm"><FieldLabel htmlFor="blog-search" className="sr-only">Search articles</FieldLabel><Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" /><Input id="blog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles or tags..." className="h-11 pl-10" /></Field></div>
      <div className="grid gap-7 md:grid-cols-3">
        {blogs.map((blog) => <article key={blog.id} className="group flex flex-col gap-5"><button aria-label={`Read ${blog.title}`} onClick={() => setSelected(blog)} className="flex flex-col gap-5 text-left"><div className="relative aspect-[1.3] w-full overflow-hidden rounded-xl border border-border"><Image src={blog.image} alt={`Illustrative ${blog.category.toLowerCase()} photograph`} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full border border-foreground/20 bg-background/70 text-foreground backdrop-blur-md"><ArrowUpRight className="size-4" /></span></div><div className="flex flex-col gap-3"><span className="flex items-center justify-between gap-2"><Badge variant="outline">{blog.category}</Badge><span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock3 className="size-3.5" />{blog.readTime}</span></span><h3 className="text-balance text-2xl font-medium leading-snug tracking-tight transition-colors group-hover:text-primary">{blog.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{blog.excerpt}</p></div></button></article>)}
      </div>
      {blogs.length === 0 && <div className="flex flex-col items-center gap-4 py-16 text-center"><p className="text-base">No articles match that search.</p><button onClick={() => setQuery('')} className="text-link">Show all blogs</button></div>}
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-3xl md:p-10">
          {selected && <>
            <DialogHeader className="pr-5"><div className="flex flex-wrap items-center gap-3 pb-3"><Badge variant="outline">{selected.category}</Badge><span className="text-sm text-muted-foreground">{selected.readTime} · Sample blog</span></div><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.excerpt}</DialogDescription></DialogHeader>
            <div className="reading-copy">{selected.sections.map((section) => <section key={section.heading} className="flex flex-col gap-4"><h3>{section.heading}</h3><p>{section.body}</p></section>)}</div>
            <p className="border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">An illustrative essay for this portfolio template, not a record of an actual program participant&apos;s experience.</p>
          </>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
