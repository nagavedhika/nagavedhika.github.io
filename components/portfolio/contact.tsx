"use client"

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import portfolio from '@/content/portfolio.json'
import { Reveal } from './reveal'

export function Contact() {
  const [notice, setNotice] = useState('')
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email)
      setCopied(true)
      setNotice('Email address copied.')
    } catch {
      setNotice(`You can reach out at ${portfolio.email}.`)
    }
  }

  function composeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !email || !message) { setNotice('Please complete all three fields.'); return }
    const subject = encodeURIComponent(`Let's make something — ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom ${name}\nReply to: ${email}`)
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`
    setNotice('Email draft requested. Review and send it in your email app; nothing has been sent by this website.')
  }

  return (
    <section id="contact" data-story-section className="border-t border-border bg-card/35 text-foreground">
      <div className="page-shell section-space grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <Reveal className="flex flex-col items-start gap-7"><p className="eyebrow">Your idea. Our next chapter.</p><h2 className="section-heading">Good things start<br />with <span className="text-primary">a conversation.</span></h2><p className="max-w-sm text-base leading-relaxed text-muted-foreground">A project, an opportunity, or a delightfully strange idea. I&apos;d love to hear what you&apos;re thinking.</p><div className="flex items-center gap-4"><a href={`mailto:${portfolio.email}`} className="text-link text-lg"><Mail className="size-5" />{portfolio.email}</a><button onClick={copyEmail} className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary" aria-label="Copy email address">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</button></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><span className="signal-dot size-1.5 rounded-full bg-primary" />Open to interesting conversations</span></Reveal>
        <Reveal>
          <form onSubmit={composeEmail} className="flex flex-col gap-6">
            <FieldGroup>
              <Field><FieldLabel htmlFor="contact-name">What should I call you?</FieldLabel><Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} className="h-12" /></Field>
              <Field><FieldLabel htmlFor="contact-email">Where can I reach you?</FieldLabel><Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" required maxLength={200} className="h-12" /></Field>
              <Field><FieldLabel htmlFor="contact-message">What&apos;s on your mind?</FieldLabel><Textarea id="contact-message" name="message" placeholder="Tell me a little about your idea..." required minLength={10} maxLength={3000} className="min-h-28" /><FieldDescription>Opens your email app. No message is stored on this site.</FieldDescription></Field>
            </FieldGroup>
            <button type="submit" className="primary-link self-start">Compose an email <ArrowUpRight className="size-4" /></button>
            <p role="status" className="min-h-5 text-sm leading-relaxed text-primary">{notice}</p>
            {portfolio.isSample && <p className="text-sm leading-relaxed text-muted-foreground">Demo contact address. Replace it with your own before sharing this portfolio.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
