'use client'

import { NavigationLayout } from '@/designSystem'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function LoginLayout({ children }: Props) {
  return <NavigationLayout>{children}</NavigationLayout>
}
