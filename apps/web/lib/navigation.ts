import type { ReactNode } from 'react'

export interface NavigationItemsProps {
  title: string
  href?: string
  description?: string
  categoryTitle?: string
  secondCategoryTitle?: string
  items?: {
    title: string
    href: string
    description?: string
    category?: string
    icon?: ReactNode
  }[]
}

export const NavigationItems: NavigationItemsProps[] = [
  { title: 'Home', href: '/', description: '' },
  { title: 'Testimonials', href: '/testimonials', description: '' },
  {
    title: 'Product',
    description: 'Complete platform for the web',
    categoryTitle: 'Use Cases',
    secondCategoryTitle: 'Users',
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
    title: 'Product',
    items: [
      { title: 'Features', href: '/features' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Integrations', href: '/integrations' },
      { title: 'Changelog', href: '/changelog' }
    ]
  },
  {
    title: 'Resources',
    items: [
      { title: 'Blog', href: '/blog' },
      { title: 'Documentation', href: '/documentation' },
      { title: 'Support', href: '/support' }
    ]
  },
  {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact', href: '/contact' }
    ]
  }
]
