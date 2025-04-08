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

interface PasswordResetEmailProps {
  readonly email: string
  readonly url: string
}

export const PasswordResetEmail = ({ email, url }: PasswordResetEmailProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>Password Reset Request</Preview>
      <Tailwind>
        <Body className="bg-zinc-50 py-[40px] font-sans">
          <Container className="mx-auto max-w-[420px] rounded-[5px] p-[24px]">
            <Heading className="mx-0 my-[24px] font-bold text-[24px] text-zinc-900">
              Password Reset Request
            </Heading>
            <Text className="mx-0 my-[16px] text-[14px] text-zinc-700 leading-[24px]">
              We received a request to reset your password. Click the button
              below to set a new password:
            </Text>
            <Section className="my-[32px]">
              <Button
                className="box-border rounded-[5px] bg-zinc-900 px-[20px] py-[10px] text-center font-medium text-[12px] text-white no-underline"
                href={url}
              >
                Reset Password
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
            <Text className="mx-0 my-[16px] text-[12px] text-zinc-500 leading-[20px]">
              For security, please do not forward this email to anyone else.
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
                href="https://blackhead-web.vercel.app/unsubscribe"
                className="text-zinc-500 underline"
              >
                Unsubscribe
              </a>{' '}
              ·{' '}
              <a
                href="https://blackhead-web.vercel.app/terms"
                className="text-zinc-500 underline"
              >
                Terms
              </a>{' '}
              ·{' '}
              <a
                href="https://blackhead-web.vercel.app/privacy"
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

const ExamplePasswordResetEmail = () => (
  <PasswordResetEmail
    email="exmaple@blackhead.com"
    url="https://example.com/reset-password?token=example-token"
  />
)

export default ExamplePasswordResetEmail
