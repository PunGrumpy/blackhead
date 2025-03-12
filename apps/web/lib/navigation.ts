import type { ReactNode } from 'react'

export interface NavigationItemsProps {
  title: string
  href?: string
  description?: string
  categories?: {
    primary?: string
    secondary?: string
  }
  items?: NavigationItemChild[]
}

export interface NavigationItemChild {
  title: string
  href: string
  description?: string
  category?: string
  icon?: ReactNode
}

export const NavigationItems: NavigationItemsProps[] = [
  { title: 'Home', href: '/' },
  { title: 'Testimonials', href: '/testimonials' },
  {
    title: 'Product',
    description: 'Complete platform for the web',
    categories: {
      primary: 'Use Cases',
      secondary: 'Users'
    },
    items: [
      {
        title: 'AI Apps',
        href: '/ai-apps',
        description: 'Deploy at the speed of AI',
        category: 'use-cases'
      },
      {
        title: 'Composable Commerce',
        href: '/commerce',
        description: 'Power storefronts that convert',
        category: 'use-cases'
      },
      {
        title: 'Platform Engineers',
        href: '/platform-engineers',
        description: 'Automate away repetition',
        category: 'users'
      },
      {
        title: 'Design Engineers',
        href: '/design-engineers',
        description: 'Deploy for every idea',
        category: 'users'
      }
    ]
  }
]

export const FooterNavigationItems: NavigationItemsProps[] = [
  {
    title: 'Products',
    items: [
      { title: 'Enterprise', href: '/enterprise' },
      { title: 'Fluid Compute', href: '/fluid-compute' },
      { title: 'Next.js', href: '/nextjs' },
      { title: 'Observability', href: '/observability' },
      { title: 'Previews', href: '/previews' },
      { title: 'Rendering', href: '/rendering' },
      { title: 'Security', href: '/security' }
    ]
  },
  {
    title: 'Resources',
    items: [
      { title: 'Community', href: '/community' },
      { title: 'Docs', href: '/docs' },
      { title: 'Guides', href: '/guides' },
      { title: 'Help', href: '/help' },
      { title: 'Integrations', href: '/integrations' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Resources', href: '/resources' }
    ]
  },
  {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Blog', href: '/blog' },
      { title: 'Careers', href: '/careers' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Contact Us', href: '/contact-us' },
      { title: 'Customers', href: '/customers' },
      { title: 'Partners', href: '/partners' },
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Legal', href: '/legal' }
    ]
  },
  {
    title: 'Social',
    items: [
      { title: 'GitHub', href: 'https://github.com' },
      { title: 'Twitter', href: 'https://twitter.com' },
      { title: 'Discord', href: 'https://discord.com' },
      { title: 'YouTube', href: 'https://youtube.com' }
    ]
  }
]
