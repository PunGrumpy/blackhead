import { Section } from '@/components/section'
import { CodeBlock } from '@repo/ui/components/code-block'
import { Button } from '@repo/ui/components/ui/button'

export const Hero = () => {
  return (
    <Section showCross className="border-t bg-dashed p-10">
      <div className="flex flex-col gap-8 sm:items-center">
        <h1 className="text-center font-bold text-2xl sm:text-4xl lg:text-5xl">
          Blackhead
        </h1>
        <p className="max-w-prose text-center text-muted-foreground">
          A monorepo template designed to have everything you need to build your
          new SaaS app as thoroughly as possible. Free and open source, forever
        </p>
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row">
          <CodeBlock code="npx blackhead@latest init" language="bash" />
          <Button className="hidden sm:block">Get Started</Button>
        </div>
      </div>
    </Section>
  )
}
