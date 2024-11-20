'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

import { MailOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  Typography,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const { Title, Text } = Typography
const { Option } = Select

export default function AdminPanelUsersListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = Api.user.findMany.useQuery({ include: { company: true } })

  const { data: companies, isLoading: isLoadingCompanies } =
    Api.company.findMany.useQuery({})

  const { mutateAsync: createUser } = Api.user.create.useMutation()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { mutateAsync: inviteEmployer } =
    Api.userInvitation.inviteEmployer.useMutation()

  const handleInviteEmployer = async (values: any) => {
    try {
      await inviteEmployer({
        name: values.name,
        email: values.email,
        companyId: values.companyId,
      })

      enqueueSnackbar('Employer invited successfully', {
        variant: 'success',
      })
      refetchUsers()
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to invite employer', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => name || '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => email || '-',
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      render: (companyName: string) => companyName || '-',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) =>
        role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status
          ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
          : '-',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Users</Title>
      <Text>
        Manage the users registered on the platform and invite new employers
        linked to companies.
      </Text>
      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Invite Employer
        </Button>
      </div>
      {isLoadingUsers ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={users} columns={columns} rowKey="id" />
      )}
      <Modal
        title="Invite Employer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleInviteEmployer}>
          <Form.Item
            name="name"
            label="User Name"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="User Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="User Email"
            rules={[
              { required: true, message: 'Please input the user email!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="User Email" />
          </Form.Item>
          <Form.Item
            name="companyId"
            label="Company"
            rules={[{ required: true, message: 'Please select a company!' }]}
          >
            <Select placeholder="Select a company" loading={isLoadingCompanies}>
              {companies?.map((company: any) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Invite
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
