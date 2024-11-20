'use client'

import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Spin, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

const { Title, Paragraph } = Typography

export default function SeekerApplicationsPage() {
  const router = useRouter()

  const { data: applications, isLoading } = Api.application.findMany.useQuery({
    include: {
      jobOffer: { include: { company: true } },
      documents: true,
    },
  })

  const columns = [
    {
      title: 'Job Title',
      dataIndex: ['jobOffer', 'title'],
      key: 'jobTitle',
    },
    {
      title: 'Company Name',
      dataIndex: ['jobOffer', 'company', 'name'],
      key: 'companyName',
    },
    {
      title: 'Application Date',
      dataIndex: 'createdAt',
      key: 'applicationDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
  ]

  const handleRowClick = record => {
    router.push(`/jobs/${record.id}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Applications</Title>
      <Paragraph>
        View and manage your submitted job applications here.
      </Paragraph>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={applications}
          columns={columns}
          rowKey="id"
          className="cursor-pointer"
          onRow={record => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 10 }}
        />
      )}
    </PageLayout>
  )
}
