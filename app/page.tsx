import { Hero } from '@/components/portfolio/hero'
import { ChapterNav } from '@/components/portfolio/chapter-nav'
import { Projects } from '@/components/portfolio/projects'
import { Journey } from '@/components/portfolio/journey'
import { ProtoSemFeature } from '@/components/portfolio/protosem-feature'
import { Credentials } from '@/components/portfolio/credentials'
import { Explorations } from '@/components/portfolio/explorations'
import { Beyond } from '@/components/portfolio/beyond'
import { Contact } from '@/components/portfolio/contact'

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <ChapterNav />
      <Journey />
      <Projects />
      <ProtoSemFeature />
      <Credentials />
      <Beyond />
      <Explorations />
      <Contact />
    </main>
  )
}
