import { Section } from '@/components/section'
import { Button } from '@repo/ui/components/ui/button'

export const Hero = () => {
  return (
    <Section className="border-y p-10">
      <div className="flex flex-col gap-8 sm:items-center">
        <h1 className="text-center font-bold text-2xl sm:text-4xl lg:text-5xl">
          Blackhead
        </h1>
        <p className="max-w-prose text-center text-muted-foreground">
          Blackhead is a template for Turborepo monorepo projects. It includes a
          Next.js web app, shadcn/ui design system, and a TypeScript library
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Get a Demo
          </Button>
        </div>
      </div>
    </Section>
  )
}
