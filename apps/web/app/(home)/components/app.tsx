import { Section } from '@/components/section'
import { cn } from '@repo/ui/lib/utils'
import { Laptop, Palette, ServerIcon } from 'lucide-react'
import Image from 'next/image'

const apps = [
  {
    icon: Laptop,
    root: '/apps/',
    name: 'web',
    title: 'Priceless app template',
    description:
      'Starting template with everything you need to build a modern web app.',
    image:
      'https://framerusercontent.com/images/yxMSn1krihZx3CRc18bbOl447WY.png'
  },
  {
    icon: ServerIcon,
    root: '/apps/',
    name: 'api',
    title: 'Cross-platform API',
    description:
      'Create an API microservice for many different apps, with a type-safe database ORM and webhook handlers.',
    image: 'https://framerusercontent.com/images/W12Iiq84nUEJ99ek5p4RDOSnaI.png'
  },
  {
    icon: Palette,
    root: '/packages/',
    name: 'ui',
    title: 'Design system',
    description:
      'A design system with reusable components, themes, and styles for consistent branding.',
    image: 'https://framerusercontent.com/images/8pJUu5rzYP4Ybb9kuEB1r3RT5U.png'
  }
]

interface AppProps {
  app: (typeof apps)[number]
}

const App = ({ app }: AppProps) => {
  return (
    <div className="relative flex flex-col gap-8 overflow-hidden p-8 pb-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-muted-foreground/75">
          <app.icon size={14} />
          <small>
            {app.root}
            {app.name}
          </small>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl tracking-tight sm:truncate">
            {app.title}
          </h2>
          <p className="text-muted-foreground sm:line-clamp-2">
            {app.description}
          </p>
        </div>
      </div>
      <div className="h-48 overflow-hidden md:h-80">
        <Image
          src={app.image}
          alt={app.title}
          width={500}
          height={500}
          className={cn(
            'h-[350px] w-full overflow-hidden rounded-md border object-cover object-left shadow-sm'
          )}
        />
      </div>
    </div>
  )
}

export const Apps = () => {
  return (
    <Section className="grid border-b sm:grid-cols-2">
      {apps.map((app, index) => (
        <div
          className={cn(
            index % 2 && 'sm:border-l',
            index > 0 && 'border-t sm:border-t-0',
            index > 1 && '!border-t'
          )}
          key={index}
        >
          <App app={app} />
        </div>
      ))}
      {apps.length % 2 === 1 && (
        <div className="h-full w-full border-t border-l bg-dashed" />
      )}
    </Section>
  )
}
