'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { PlusOutlined } from '@ant-design/icons'
import { Prisma } from '@prisma/client'
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text } = Typography

export default function AdminPanelCompaniesListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: companies,
    isLoading,
    refetch,
  } = Api.company.findMany.useQuery({})
  const { mutateAsync: createCompany } = Api.company.create.useMutation()

  const [form] = Form.useForm()
  const [creating, setCreating] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCreateCompany = async (values: Prisma.CompanyCreateInput) => {
    try {
      setCreating(true)
      await createCompany({ data: values })
      enqueueSnackbar('Company created successfully', { variant: 'success' })
      form.resetFields()
      refetch()
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to create company', { variant: 'error' })
    } finally {
      setCreating(false)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Companies</Title>
      <Text>Manage the companies registered on the platform.</Text>
      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Create Company
        </Button>
      </div>
      <Modal
        title="Create New Company"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={creating}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateCompany}>
          <Form.Item
            name="name"
            label="Company Name"
            rules={[
              { required: true, message: 'Please input the company name!' },
            ]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Form>
      </Modal>
      {isLoading ? (
        <Spin />
      ) : (
        <Table
          dataSource={companies}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text: string) => text || '-',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
              render: (text: string) => text || '-',
            },
            {
              title: 'Website',
              dataIndex: 'website',
              key: 'website',
              render: (text: string) => text || '-',
            },
          ]}
          rowKey="id"
        />
      )}
      <Space />
    </PageLayout>
  )
}
