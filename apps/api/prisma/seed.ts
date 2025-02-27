import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create default user types
  const adminType = await prisma.userType.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN'
    }
  })

  const auditorType = await prisma.userType.upsert({
    where: { name: 'AUDITOR' },
    update: {},
    create: {
      name: 'AUDITOR'
    }
  })

  const userType = await prisma.userType.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER'
    }
  })

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log({ adminType, auditorType, userType })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      userTypeId: adminType.id
    }
  })

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log({ admin })

  // Create sample targets
  const webTarget = await prisma.target.create({
    data: {
      name: 'Example Web Application',
      url: 'https://example.com',
      type: 'WEB_APPLICATION',
      description: 'A sample web application target'
    }
  })

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log({ webTarget })

  // Create sample database target
  const dbTarget = await prisma.target.create({
    data: {
      name: 'Example Database Server',
      url: 'postgres://example.com:5432',
      type: 'DATABASE',
      description: 'A sample database server target'
    }
  })

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log({ dbTarget })
}

main()
  .catch(e => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
