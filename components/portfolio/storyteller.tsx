"use client"

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from 'motion/react'
import { useStory } from './story-provider'

const NovaScene = dynamic(() => import('./nova-scene'), { ssr: false, loading: () => <Image src="/images/nova-hero.png" alt="" fill sizes="96px" className="rounded-xl object-cover object-top" /> })

export function Storyteller() {
  const { active } = useStory()
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  return (
    <aside aria-label="Nova, your portfolio guide" className="pointer-events-none fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <div className="relative h-20 w-20 shrink-0">
        {reducedMotion ? <Image src="/images/nova-hero.png" alt="Nova" fill sizes="80px" className="rounded-xl object-cover" /> : <NovaScene greeting={active === 'about' && pathname === '/'} />}
      </div>
    </aside>
  )
}
