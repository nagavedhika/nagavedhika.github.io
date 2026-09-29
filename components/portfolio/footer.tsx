import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="page-shell flex flex-col gap-6 pb-28 pt-8 md:flex-row md:items-center md:justify-between md:pb-10">
      <div className="flex flex-col gap-2"><Link href="/" className="w-fit text-2xl font-semibold tracking-[-0.08em]">vedhika<span className="text-primary">.</span></Link><p className="text-sm text-muted-foreground">Built with intent. Always evolving.</p></div>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground"><span>© 2026 · Naga Vedhika B.</span><span>AI / ML / Data Science.</span></div>
      <a href="#main" className="text-link self-start md:mr-80 md:self-auto">Back to the top <ArrowUp className="size-4" /></a>
    </footer>
  )
}
