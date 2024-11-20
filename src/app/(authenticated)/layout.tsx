'use client'

import { useUserContext } from '@/core/context'
import { MrbSplashScreen } from '@/designSystem'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type Props = { children: ReactNode }

export default function AuthenticatedLayout({ children }: Props) {
  const { isLoggedIn, isLoading } = useUserContext()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isLoading, isLoggedIn, pathname])

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn) {
    return <NavigationLayout>{children}</NavigationLayout>
  }
}
