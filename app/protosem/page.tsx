import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProtoSemExperience } from '@/components/protosem/experience'

export const metadata: Metadata = {
  title: 'ProtoSem — The making-of',
  description: 'Twenty weeks of questions, experiments, and learning by making. Explore the ProtoSem progression and reflective blogs.',
}

export default function ProtoSemPage() {
  return (
    <Suspense fallback={<main id="main" className="page-shell py-12" />}>
      <ProtoSemExperience />
    </Suspense>
  )
}

