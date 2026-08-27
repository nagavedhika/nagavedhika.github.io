"use client";

import { DecryptText } from "@/components/ui/decrypt-text";

export default function DecryptTextDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-12">
      <DecryptText
        as="h1"
        text="Naga Vedhika B. | AI & Full-Stack Engineer"
        variant="display"
        trigger="mount"
        stagger={38}
        retriggerOnHover
        className="max-w-2xl text-center text-4xl font-semibold tracking-tight text-[var(--motiq-fg)] sm:text-5xl"
      />

      <DecryptText
        text="Specializing in AI, Machine Learning, Data Science & Full-Stack"
        variant="terminal"
        trigger="mount"
        startDelay={600}
        loop={5200}
        className="w-full max-w-xl"
      />
    </div>
  );
}
