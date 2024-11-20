'use client'
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
  Spin,
  Typography,
  Upload,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const { Title } = Typography

export default function CompanyPage() {
  const params = useParams<any>()
  const router = useRouter()
  const [form] = Form.useForm()
  const { mutateAsync: upload } = useUploadPublic()
  const [logo, setLogo] = useState<string>()

  const { data: companyData, isLoading } = Api.company.findUnique.useQuery({
    where: { id: params?.companyId },
  })

  const handleUpload = async (file: File) => {
    try {
      const response = await upload({ file })
      setLogo(response.url)
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' })
    }
  }

  const updateCompany = Api.company.update.useMutation({
    onSuccess: () => {
      message.success('Company information updated successfully')
      router.push(`/employer/company/${params?.companyId}/edit`)
    },
    onError: error => {
      message.error(`Failed to update company information: ${error.message}`)
    },
  })

  const onFinish = async (values: any) => {
    try {
      updateCompany.mutate({
        where: { id: params?.companyId },
        data: {
          name: values.name,
          address: values.address,
          website: values.website,
          logo,
        },
      })
    } catch (error) {
      message.error(`Failed to upload logo: ${error.message}`)
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!companyData) {
    return (
      <PageLayout layout="narrow">
        <Card>
          <Typography.Text>No company data found.</Typography.Text>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>Edit Company Details</Title>
        <Form
          form={form}
          initialValues={companyData}
          onFinish={onFinish}
          layout="vertical"
        >
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
                loading={updateCompany.isLoading}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageLayout>
  )
}
