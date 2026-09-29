import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

export function ProtoSemFeature() {
  return (
    <section id="protosem" data-story-section className="page-shell pb-16 md:pb-24">
      <Reveal className="relative isolate overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5"><Image src="/images/protosem-lab.png" alt="Electronics prototypes, tools, and engineering sketches on a maker's workbench" fill sizes="(max-width: 767px) 100vw, 60vw" className="object-cover opacity-35 md:opacity-70" /><div className="absolute inset-0 bg-gradient-to-r from-card via-card/30 to-transparent" /></div>
        <div className="flex max-w-2xl flex-col items-start gap-7 p-8 md:p-14 lg:p-16">
          <p className="eyebrow text-primary">Featured chapter / Learning in the making</p>
          <h2 className="text-6xl font-medium tracking-[-0.06em] md:text-7xl">ProtoSem<span className="text-primary">.</span></h2>
          <p className="max-w-sm text-xl leading-relaxed">20 weeks. Countless questions.<br /><span className="text-muted-foreground">One transformative journey.</span></p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">From the first sketch to a working prototype. Step inside the process, the experiments, and everything learned along the way.</p>
          <Link href="/protosem" className="primary-link">Enter the experience <ArrowUpRight className="size-4" /></Link>
          <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-muted-foreground"><Link href="/protosem" className="flex items-center gap-2 hover:text-foreground">Weekly progression <ArrowRight className="size-3.5" /></Link><Link href="/protosem?view=blogs" className="flex items-center gap-2 hover:text-foreground">Blogs <ArrowRight className="size-3.5" /></Link></div>
        </div>
      </Reveal>
    </section>
  )
}
