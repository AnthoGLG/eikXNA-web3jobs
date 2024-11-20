'use client'

import { DocumentTypeLabel } from '@/config/document.objects'
import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { EmailType } from '@/server/libraries/email/internal/email.type'
import { UploadOutlined } from '@ant-design/icons'
import { DocumentType } from '@prisma/client'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography

export default function JobApplicationSubmissionPage() {
  const router = useRouter()
  const params = useParams<any>()

  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: upload } = useUploadPublic()

  const [documents, setDocuments] = useState<
    Array<{ type: DocumentType; url: string }>
  >([])

  const { data: jobOffer, isLoading } = Api.jobOffer.findUnique.useQuery({
    where: { id: params.jobOfferId },
    include: { company: true },
  })

  const { mutateAsync: createApplication, isLoading: isLoadingApply } =
    Api.application.create.useMutation()
  const { mutateAsync: sendEmailToCompany } =
    Api.email.sendToCompany.useMutation()

  const handleUpload = async (file: File, documentType: DocumentType) => {
    try {
      const response = await upload({ file })
      setDocuments(prev => [...prev, { type: documentType, url: response.url }])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' })
    }
  }

  const handleSubmit = async () => {
    if (!jobOffer) return

    try {
      await createApplication({
        data: {
          documents: {
            create: documents.map(doc => ({
              type: doc.type,
              url: doc.url,
            })),
          },
          jobOfferId: jobOffer.id,
          userId: user.id,
        },
      })

      sendEmailToCompany({
        subject: 'New Application received',
        companyId: jobOffer?.companyId,
        type: EmailType.NOTIFICATION_EMPLOYER_JOB_APPLY,
        variables: {
          jobName: jobOffer.title,
          userName: user.name,
          userEmail: user.email,
        },
      })
      enqueueSnackbar('Application submitted successfully', {
        variant: 'success',
      })
      router.push('/seeker/applications')
    } catch (error) {
      enqueueSnackbar('Failed to submit application', { variant: 'error' })
    }
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Apply for {jobOffer?.title}
        </Title>
        <Text
          type="secondary"
          style={{ display: 'block', marginBottom: '24px' }}
        >
          {jobOffer?.description}
        </Text>
        <Divider style={{ margin: '24px 0' }}>Documents</Divider>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          {jobOffer?.applicationDocumentsRequired?.length ? (
            <Row gutter={[16, 24]}>
              {jobOffer.applicationDocumentsRequired.map((document, index) => (
                <Col span={24} key={index}>
                  <Form.Item
                    label={DocumentTypeLabel[document]}
                    style={{ marginBottom: '16px' }}
                  >
                    <Upload
                      beforeUpload={file => {
                        handleUpload(file, document)
                        return false
                      }}
                      showUploadList={false}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        style={{ width: '100%' }}
                      >
                        Upload {DocumentTypeLabel[document]}
                      </Button>
                    </Upload>
                    {documents.find(doc => doc.type === document) && (
                      <Text
                        type="success"
                        style={{ display: 'block', marginTop: '8px' }}
                      >
                        {DocumentTypeLabel[document]} uploaded
                      </Text>
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          ) : (
            <Paragraph
              style={{
                textAlign: 'center',
                fontSize: '16px',
                color: '#8c8c8c',
              }}
            >
              No documents needed
            </Paragraph>
          )}

          <Form.Item
            style={{
              marginTop: '32px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoadingApply}
            >
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageLayout>
  )
}
