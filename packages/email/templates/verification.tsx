import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

interface VerificationEmailProps {
  readonly email: string
  readonly url: string
}

export const VerificationEmail = ({ email, url }: VerificationEmailProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-zinc-50 py-[40px] font-sans">
          <Container className="mx-auto max-w-[420px] rounded-[5px] p-[24px]">
            <Heading className="mx-0 my-[24px] font-bold text-[24px] text-zinc-900">
              Verify your email
            </Heading>
            <Text className="mx-0 my-[16px] text-[14px] text-zinc-700 leading-[24px]">
              Please confirm your email address by clicking the button below:
            </Text>
            <Section className="my-[32px]">
              <Button
                className="box-border rounded-[5px] bg-zinc-900 px-[20px] py-[10px] text-center font-medium text-[12px] text-white no-underline"
                href={url}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="mx-0 my-[16px] text-[14px] text-zinc-700 leading-[24px]">
              Or copy and paste this URL into your browser:
            </Text>
            <Text className="mx-0 my-[16px] break-all text-[14px] text-blue-600 leading-[24px]">
              {url}
            </Text>
            <Hr className="my-[24px] border-zinc-200" />
            <Text className="mx-0 my-[16px] text-[12px] text-zinc-500 leading-[20px]">
              This link expires in 24 hours. If you didn't request this email,
              you can safely ignore it.
            </Text>
            <Hr className="my-[24px] border-zinc-200" />
            <Text className="m-0 text-[12px] text-zinc-500 leading-[20px]">
              © {currentYear} Blackhead
            </Text>
            <Text className="m-0 text-[12px] text-zinc-500 leading-[20px]">
              This email was sent to {email} by Blackhead.
            </Text>
            <Text className="m-0 text-[12px] text-zinc-500 leading-[20px]">
              <a
                href="https://yourapp.com/unsubscribe"
                className="text-zinc-500 underline"
              >
                Unsubscribe
              </a>{' '}
              ·{' '}
              <a
                href="https://yourapp.com/terms"
                className="text-zinc-500 underline"
              >
                Terms
              </a>{' '}
              ·{' '}
              <a
                href="https://yourapp.com/privacy"
                className="text-zinc-500 underline"
              >
                Privacy
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const ExampleVerificationEmail = () => (
  <VerificationEmail
    email="example@blackhead.com"
    url="https://example.com/verify?token=123456"
  />
)

export default ExampleVerificationEmail
