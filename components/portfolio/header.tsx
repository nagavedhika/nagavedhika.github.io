"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import portfolio from '@/content/portfolio.json'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const home = pathname === '/'
  const links = [
    { label: 'About', href: home ? '#about' : '/#about' },
    { label: 'Work', href: home ? '#projects' : '/#projects' },
    { label: 'Journey', href: home ? '#education' : '/#education' },
    { label: 'ProtoSem', href: '/protosem' },
    { label: 'Beyond tech', href: home ? '#beyond' : '/#beyond' },
  ]
  return (
    <>
      <a href="#main" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="page-shell flex h-20 items-center justify-between md:h-[88px]">
          <Link href="/" aria-label={`${portfolio.firstName} home`} className="flex items-center gap-3">
            <span className="text-[27px] font-semibold tracking-[-0.08em]">vedhika<span className="text-primary">.</span></span>
            <span className="hidden border-l border-border pl-3 font-mono text-sm uppercase leading-tight tracking-wider text-muted-foreground xl:block">An evolving<br />portfolio</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex lg:gap-9">
            {links.map((link) => <Link key={link.label} href={link.href} className={cn('flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground', link.href === pathname && 'text-primary')}>
              {link.label}{link.label === 'ProtoSem' && <ArrowUpRight className="size-3.5" />}
            </Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link href={home ? '#contact' : '/#contact'} className="pill-link min-h-10 px-4 md:px-5">Let&apos;s talk <ArrowUpRight className="size-4" /></Link>
            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" />}><Menu /></DialogTrigger>
              <DialogContent className="p-6">
                <DialogTitle>Find your next chapter.</DialogTitle>
                <DialogDescription>Explore the portfolio.</DialogDescription>
                <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                  {portfolio.chapters.map((chapter) => <Link key={chapter.id} onClick={() => setMenuOpen(false)} href={chapter.id === 'protosem' ? '/protosem' : `/#${chapter.id}`} className="flex items-center justify-between rounded-md px-3 py-3 text-base transition-colors hover:bg-primary/10 hover:text-primary">{chapter.label}<ArrowUpRight className="size-4" /></Link>)}
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
    </>
  )
}
