export interface NavigationItemsProps {
  title: string
  href?: string
  description?: string
  items?: {
    title: string
    href: string
  }[]
}

export const NavigationItems: NavigationItemsProps[] = [
  { title: 'Home', href: '/', description: '' },
  { title: 'Testimonials', href: '/testimonials', description: '' },
  {
    title: 'Product',
    description: 'Managing a small business today is already tough',
    items: [
      {
        title: 'Pricing',
        href: '/pricing'
      },
      {
        title: 'Features',
        href: '/features'
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
