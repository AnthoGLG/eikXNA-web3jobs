'use client'
import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Space,
  Typography,
  Upload,
} from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Title } = Typography

export default function CreateCompanyPage() {
  const router = useRouter()
  const [form] = Form.useForm()
  const { user } = useUserContext()
  const { mutateAsync: upload } = useUploadPublic()
  const [logo, setLogo] = useState<string>()

  const createCompany = Api.company.create.useMutation({
    onSuccess: company => {
      message.success('Company created successfully')
      router.push(`/employer/company/${company.id}/edit`)
    },
    onError: error => {
      message.error(`Failed to create company: ${error.message}`)
    },
  })

  const handleUpload = async (file: File) => {
    try {
      const response = await upload({ file })
      setLogo(response.url)
    } catch (error) {
      message.error('File upload failed')
    }
  }

  const onFinish = async (values: any) => {
    try {
      createCompany.mutate({
        data: {
          name: values.name,
          address: values.address,
          website: values.website,
          logo,
          users: {
            connect: {
              id: user?.id,
            },
          },
        },
      })
    } catch (error) {
      message.error(`Failed to create company: ${error.message}`)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>Create New Company</Title>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[
              { required: true, message: 'Please input the company name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: 'Please input the company address!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              { required: true, message: 'Please input the company website!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="logo" label="Company Logo">
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              beforeUpload={file => {
                handleUpload(file)
                return false
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={createCompany.isLoading}
              >
                Create
              </Button>
              <Button onClick={() => router.push('/admin/companies')}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageLayout>
  )
}
