'use client'

import {
  CalendarOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  List,
  Row,
  Tag,
  Typography,
} from 'antd'
const { Title, Text, Paragraph } = Typography

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { SkeletonLoading } from '@/designSystem/ui/SkeletonLoading'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

export default function JobOfferDetailsPage() {
  const router = useRouter()
  const params = useParams<{ jobOfferId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: jobOffer, isLoading } = Api.jobOffer.findUnique.useQuery({
    where: { id: params.jobOfferId, status: 'APPROVED' },
    include: { company: true, attachments: true },
  })

  if (isLoading) {
    return <SkeletonLoading />
  }

  if (!jobOffer) {
    enqueueSnackbar('Job offer not found', { variant: 'error' })
    return (
      <PageLayout layout="narrow">
        <Text>Job offer not found</Text>
      </PageLayout>
    )
  }

  const shareItems = [
    {
      key: 'copyLink',
      label: 'Copy link',
      onClick: () => {
        const currentUrl = window.location.href
        navigator.clipboard
          .writeText(currentUrl)
          .then(() => {
            enqueueSnackbar('Link copied to clipboard', { variant: 'success' })
          })
          .catch(err => {
            console.error('Failed to copy: ', err)
            enqueueSnackbar('Failed to copy link', { variant: 'error' })
          })
      },
    },
  ]

  const documentsRequiredMapping = {
    RESUME: 'Resume',
    COVER_LETTER: 'Cover letter',
    PORTFOLIO: 'Portfolio',
    OTHER: 'Other',
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <Link href={`/company/${jobOffer.company?.id}`}>
                  <Avatar size={50} src={jobOffer.company?.logo}>
                    {' '}
                    {jobOffer.company?.name.charAt(0)}
                  </Avatar>
                </Link>
              </Col>
              <Col>
                <Title level={2} style={{ margin: 0 }}>
                  {jobOffer.title}
                </Title>
                <Text>{jobOffer.company?.name}</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={16}>
              <Col>
                <Button type="text" icon={<ShareAltOutlined />}>
                  <Dropdown
                    menu={{ items: shareItems }}
                    placement="bottomRight"
                  >
                    <span>Share job</span>
                  </Dropdown>
                </Button>
              </Col>
              {(!user || user?.role === 'SEEKER') && (
                <Col>
                  <Button
                    type="primary"
                    onClick={() =>
                      router.push(`/jobseeker/job-offers/${jobOffer.id}/apply`)
                    }
                  >
                    Apply
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text type="secondary">
              <EnvironmentOutlined />{' '}
              {Utility.convertEnumToUserFriendly(jobOffer.location)}
            </Text>
          </Col>
          <Col span={8}>
            <Text type="secondary">
              <DollarOutlined />{' '}
              {jobOffer.salary
                ? `${jobOffer.salary} ${jobOffer.salaryCurrency} (${Utility.convertEnumToUserFriendly(jobOffer.salaryType)})`
                : 'Not specified'}
            </Text>
          </Col>

          <Col span={8}>
            <Text type="secondary">
              <CalendarOutlined />{' '}
              {dayjs(jobOffer.dateCreated).format('MMMM D, YYYY')}
            </Text>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[32, 16]}>
          <Col span={16}>
            <Text className="whitespace-pre-wrap">{jobOffer.description}</Text>
          </Col>
          <Col span={8}>
            <Card>
              {jobOffer.tags && jobOffer.tags.length > 0 && (
                <>
                  <Text type="secondary">Tags</Text>
                  <div style={{ marginTop: '8px' }}>
                    {jobOffer.tags.split(',').map((tag, index) => (
                      <Tag key={index} style={{ marginBottom: '8px' }}>
                        {tag.trim()}
                      </Tag>
                    ))}
                  </div>
                </>
              )}
              {jobOffer.applicationDocumentsRequired &&
                jobOffer.applicationDocumentsRequired.length > 0 && (
                  <>
                    <Text type="secondary">Documents Required</Text>
                    <List
                      size="small"
                      split={false}
                      dataSource={jobOffer.applicationDocumentsRequired}
                      renderItem={item => (
                        <List.Item>
                          <div>
                            <CheckCircleOutlined
                              style={{ color: 'green', marginRight: '8px' }}
                            />
                            <Text>
                              {documentsRequiredMapping[item] || item}
                            </Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </>
                )}
            </Card>
            <Card className="mt-2">
              <Text type="secondary">Company name</Text>
              <Paragraph>{jobOffer?.company.name}</Paragraph>
              <Text type="secondary">Company website</Text>
              <Paragraph>{jobOffer?.company.website}</Paragraph>
              <div>
                <Link href={`/company/${jobOffer?.company.id}`}>
                  <Button>See company page</Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {jobOffer.attachments && jobOffer.attachments.length > 0 && (
            <Col span={24}>
              <Divider>Additional Details</Divider>
              <Text strong>
                <PaperClipOutlined /> Attachments:
              </Text>
              <List
                size="small"
                dataSource={jobOffer.attachments}
                renderItem={(attachment, index) => (
                  <List.Item>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.name ?? `Attachment ${index + 1}`}
                    </a>
                  </List.Item>
                )}
              />
            </Col>
          )}
        </Row>
      </Card>
    </PageLayout>
  )
}
