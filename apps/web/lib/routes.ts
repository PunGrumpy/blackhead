import {
  Contact,
  CreditCard,
  Home,
  Layout,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  UserPlus
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Route {
  path: string
  label: string
  description?: string
  icon?: LucideIcon
}

export interface Routes {
  auth: {
    login: Route
    signup: Route
    logout: Route
  }
  dashboard: {
    index: Route
    settings: Route
    createTeam: Route
    upgrade: Route
  }
  home: {
    index: Route
  }
  contact: Route
}

export const routes: Routes = {
  auth: {
    login: {
      path: '/login',
      label: 'Log In',
      description: 'Sign in to your account',
      icon: LogIn
    },
    signup: {
      path: '/signup',
      label: 'Sign Up',
      description: 'Create a new account',
      icon: UserPlus
    },
    logout: {
      path: '/logout',
      label: 'Log Out',
      description: 'Sign out of your account',
      icon: LogOut
    }
  },
  dashboard: {
    index: {
      path: '/dashboard',
      label: 'Dashboard',
      description: 'View your dashboard',
      icon: Layout
    },
    settings: {
      path: '/settings',
      label: 'Settings',
      description: 'Manage your account settings',
      icon: Settings
    },
    createTeam: {
      path: '/create-team',
      label: 'Create Team',
      description: 'Create a new team',
      icon: PlusCircle
    },
    upgrade: {
      path: '/upgrade',
      label: 'Upgrade to Pro',
      description: 'Upgrade your account to Pro',
      icon: CreditCard
    }
  },
  home: {
    index: {
      path: '/',
      label: 'Home',
      description: 'Return to homepage',
      icon: Home
    }
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    description: 'Contact us',
    icon: Contact
  }
}

export const getRoutePath = (route: Route): string => route.path
export const getRouteLabel = (route: Route): string => route.label
export const getRouteDescription = (route: Route): string | undefined =>
  route.description
export const getRouteIcon = (route: Route): LucideIcon | undefined => route.icon
