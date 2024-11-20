'use client'

import { Prisma } from '@prisma/client'
import { Typography, Table, Spin, Row, Col } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function EmployerApplicationsViewPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: applications,
    isLoading,
    refetch,
  } = Api.application.findMany.useQuery({
    where: { jobOffer: { companyId: user?.companyId } },
    include: { jobOffer: true, user: true, documents: true },
  })

  const columns = [
    {
      title: 'Candidate Name',
      dataIndex: ['user', 'name'],
      key: 'candidateName',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Job Offer',
      dataIndex: ['jobOffer', 'title'],
      key: 'jobOfferTitle',
    },

    {
      title: 'Documents',
      dataIndex: 'documents',
      key: 'documents',
      render: (documents: any[]) => (
        <>
          {documents?.map((doc, index) => (
            <a
              key={index}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: '10px' }}
            >
              <FileTextOutlined /> {doc.type}
            </a>
          ))}
        </>
      ),
    },
    {
      title: 'Date Applied',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Applications</Title>
          <Text>Review and manage the applications for your job offers.</Text>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24}>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={applications} columns={columns} rowKey="id" />
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
