import { useUserContext } from '@/core/context'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useDesignSystem } from '../../provider'
import { Leftbar } from './components/Leftbar'
import { Topbar } from './components/Topbar'

import { Logo } from './components/Logo'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const { authenticationStatus: isLoggedIn, checkRole, user } = useUserContext()

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const itemsLeftbar = []

  const itemsTopbar = [
    {
      key: '/jobs',
      label: 'Jobs',
      onClick: () => goTo('/jobs'),
    },

    checkRole('EMPLOYER') && {
      key: '/job-offers/',
      label: 'My Jobs',
      onClick: () => goTo('/employer/job-offers/'),
    },
    checkRole('EMPLOYER') && {
      key: '/employer/applications',
      label: 'Applications',
      onClick: () => goTo('/employer/applications'),
    },

    checkRole('EMPLOYER') && {
      key: `/company`,
      label: 'My Company',
      onClick: () => goTo(`/employer/company/${user?.companyId}/edit`),
    },

    checkRole('SEEKER') && {
      key: '/jobseeker/applications',
      label: 'My Applications',
      onClick: () => goTo('/jobseeker/applications'),
    },

    checkRole('ADMIN') && {
      key: '/admin/companies',
      label: 'Companies',
      onClick: () => goTo('/admin/companies'),
    },

    checkRole('ADMIN') && {
      key: '/admin/users',
      label: 'Users',
      onClick: () => goTo('/admin/users'),
    },
  ].filter(Boolean)

  const itemsLeftbarBottom = []

  const itemsMobile = [
    {
      key: '/profile',
      label: 'Profile',
      onClick: () => goTo('/profile'),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
    ...itemsLeftbarBottom,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                header={<Logo height={40} />}
                items={itemsLeftbar}
                itemsBottom={itemsLeftbarBottom}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              itemsMobile={itemsMobile}
              isLoggedIn={isLoggedIn === 'authenticated'}
              items={itemsTopbar}
              header={!isLeftbar && <Logo height={40} className="mr-3" />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
