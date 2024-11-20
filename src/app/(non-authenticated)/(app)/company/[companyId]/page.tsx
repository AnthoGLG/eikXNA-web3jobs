'use client'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { SkeletonLoading } from '@/designSystem/ui/SkeletonLoading'
import { EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Row, Typography } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const { Title, Text } = Typography

export default function CompanyPage() {
  const { user } = useUserContext()
  const params = useParams<any>()

  const { data: companyData, isLoading } = Api.company.findUnique.useQuery({
    where: { id: params?.companyId },
  })

  if (isLoading) {
    return <SkeletonLoading />
  }

  if (!companyData) {
    return (
      <PageLayout layout="narrow">
        <Card>
          <Text>No company data found.</Text>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar size={50} src={companyData.logo}>
              {companyData.name?.charAt(0)}
            </Avatar>
          </Col>
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              {companyData.name}
            </Title>
          </Col>
        </Row>

        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Text strong>
              <EnvironmentOutlined /> Address:
            </Text>
            <Paragraph>{companyData.address}</Paragraph>
          </Col>

          <Col xs={24} sm={12}>
            <Text strong>
              <GlobalOutlined /> Website:
            </Text>
            <Paragraph>{companyData.website}</Paragraph>
          </Col>
        </Row>

        <Divider />
        {!!user && user?.companyId === params.companyId && (
          <div style={{ textAlign: 'center' }}>
            <Link href={`/employer/company/${params?.companyId}/edit`}>
              <Button type="primary">Edit Company Information</Button>
            </Link>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
