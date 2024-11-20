'use client'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  enum RoleUser {
    SEEKER = 'SEEKER',
    EMPLOYER = 'EMPLOYER',
  }

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const searchParams = useSearchParams()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)

  const [roleUser, setRoleUser] = useState<RoleUser | null>(null)

  const { mutateAsync: registerUser } =
    Api.authentication.register.useMutation()

  const [emailLocked, setEmailLocked] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        const email = decodedToken.email
        if (email) {
          form.setFieldsValue({ email })
          setEmailLocked(true)
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [searchParams, form])

  const handleSubmit = async (values: Partial<User>) => {
    if (!roleUser) return

    setLoading(true)

    try {
      const token = searchParams.get('token') ?? undefined
      await registerUser({ ...values, role: roleUser, tokenInvitation: token })

      signIn('credentials', {
        ...values,
        callbackUrl:
          roleUser === RoleUser.EMPLOYER ? '/employer/company/new' : '/jobs',
      })
    } catch (error) {
      enqueueSnackbar(`Could not signup: ${error.message}`, {
        variant: 'error',
      })

      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
        }}
        gap="large"
      >
        {roleUser === null && (
          <>
            <AppHeader
              title="How would you like to use MarbleJobs?"
              description={null}
            />

            <Typography.Paragraph style={{ textAlign: 'center' }}>
              Already have an account? <a href="/login">Log in</a>
            </Typography.Paragraph>
            <Flex vertical gap="middle">
              <Button
                size="large"
                onClick={() => setRoleUser(RoleUser.SEEKER)}
                style={{
                  height: 'auto',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border:
                    roleUser === RoleUser.SEEKER
                      ? '2px solid #1890ff'
                      : undefined,
                }}
              >
                <Flex vertical align="flex-start">
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {"I'm looking for a job"}
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    {'Find jobs at top companies'}
                  </Typography.Text>
                </Flex>
                <img
                  src="https://i.imgur.com/OAMIkP0.png"
                  alt="Job Seeker"
                  style={{ height: '100px' }}
                />
              </Button>

              <Button
                size="large"
                onClick={() => setRoleUser(RoleUser.EMPLOYER)}
                style={{
                  height: 'auto',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border:
                    roleUser === RoleUser.EMPLOYER
                      ? '2px solid #1890ff'
                      : undefined,
                }}
              >
                <Flex vertical align="flex-start">
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    I want to attract talent
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    Post your open jobs
                  </Typography.Text>
                </Flex>
                <img
                  src="https://i.imgur.com/RfaJZyY.png"
                  alt="Employer"
                  style={{ height: '100px' }}
                />
              </Button>
            </Flex>
          </>
        )}

        {roleUser !== null && (
          <>
            {roleUser === RoleUser.EMPLOYER && (
              <>
                {' '}
                <AppHeader title="Sign up to find talents" description={null} />
                <Typography.Paragraph style={{ textAlign: 'center' }}>
                  Already have an account? <a href="/login">Log in</a>
                </Typography.Paragraph>
              </>
            )}
            {roleUser === RoleUser.SEEKER && (
              <>
                {' '}
                <AppHeader
                  title="Sign up to apply for jobs"
                  description={null}
                />
                <Typography.Paragraph style={{ textAlign: 'center' }}>
                  Already have an account? <a href="/login">Log in</a>
                </Typography.Paragraph>
              </>
            )}

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  disabled={emailLocked}
                />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Name is required' }]}
                label="Name"
              >
                <Input placeholder="Your name" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password is required' }]}
              >
                <Input.Password
                  type="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  size="large"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Flex>
    </Flex>
  )
}
