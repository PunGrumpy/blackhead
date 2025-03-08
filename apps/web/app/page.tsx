import { Button } from '@repo/ui/components/ui/button'
import { Card, CardContent } from '@repo/ui/components/ui/card'
import Image, { type ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string
  srcDark: string
}

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Image {...rest} src={srcLight} className="dark:hidden" />
      <Image {...rest} src={srcDark} className="hidden dark:block" />
    </>
  )
}

export default function Home() {
  const handleButtonClick = () => {
    alert('Button clicked!')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
        <ThemeImage
          className="mb-6"
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />

        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Get started by editing{' '}
                <code className="rounded bg-muted px-1 py-0.5">
                  apps/web/app/page.tsx
                </code>
              </li>
              <li>Save and see your changes instantly.</li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="default" asChild className="flex items-center gap-2">
            <a
              href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a
              href="https://turbo.build/repo/docs?utm_source"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </Button>

          <Button variant="secondary" onClick={handleButtonClick}>
            Open alert
          </Button>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <Button variant="link" asChild className="flex items-center gap-2">
            <a
              href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
          </Button>

          <Button variant="link" asChild className="flex items-center gap-2">
            <a
              href="https://turbo.build?utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to turbo.build →
            </a>
          </Button>
        </div>
      </footer>
    </div>
  )
}
