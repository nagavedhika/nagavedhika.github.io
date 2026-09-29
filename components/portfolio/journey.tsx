import { ArrowUpRight, Braces, Sparkles, GraduationCap, Globe, Database, Terminal, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

export function Journey() {
  const skillIcons = [Braces, Globe, Database, Terminal, Sparkles, Users]
  return (
    <>
      <section id="education" data-story-section className="border-y border-border bg-card/25 text-foreground">
        <div className="page-shell section-space grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col items-start gap-7">
            <p className="eyebrow">The story so far</p>
            <h2 className="section-heading">A work in progress.<br /><span className="text-muted-foreground">In the best way.</span></h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">{portfolio.about}</p>
            <a href="#skills" className="text-link">Meet my toolkit <ArrowUpRight className="size-4" /></a>
          </Reveal>
          <Reveal className="flex flex-col gap-0">
            {portfolio.education.map((item, index) => <div key={item.title} className="relative flex gap-5 pb-10 last:pb-0">
              <div className="flex w-9 shrink-0 flex-col items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-primary"><GraduationCap className="size-4" /></span>{index !== portfolio.education.length - 1 && <span className="w-px flex-1 bg-border" />}</div>
              <div className="flex flex-col items-start gap-3"><span className="font-mono text-sm text-muted-foreground">{item.period}</span><h3 className="text-xl font-medium tracking-tight">{item.title}</h3><p className="text-sm text-primary">{item.subtitle}</p><p className="max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p><Badge variant="outline">{item.label}</Badge></div>
            </div>)}
          </Reveal>
        </div>
      </section>
      <section id="skills" data-story-section className="page-shell section-space">
        <Reveal className="flex flex-col gap-5"><p className="eyebrow">The tools behind the thinking</p><h2 className="section-heading">Different disciplines.<br /><span className="text-muted-foreground">One creative mindset.</span></h2></Reveal>
        <div className="grid gap-6 pt-12 md:grid-cols-3">
          {portfolio.skills.map((category, index) => {
            const Icon = skillIcons[index]
            return <Reveal key={category.title} delay={index * 0.08} className="flex flex-col items-start gap-6 rounded-xl border border-border bg-card/35 p-7 text-foreground transition-colors hover:border-primary/40">
              <div className="flex w-full items-center justify-between"><Icon className="size-7 text-primary" /><span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, '0')}</span></div>
              <div className="flex flex-col gap-2"><h3 className="text-2xl font-medium tracking-tight">{category.title}<span className="text-primary">.</span></h3><p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p></div>
              <div className="flex flex-wrap gap-2">{category.items.map((skill) => <Badge variant="outline" key={skill}>{skill}</Badge>)}</div>
            </Reveal>
          })}
        </div>
      </section>
    </>
  )
}
