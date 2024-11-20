'use client'

import { Locations } from '@/config/location.objects'
import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

import { Utility } from '@/core/helpers/utility'

import {
  DeleteOutlined,
  FileAddOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { DocumentType } from '@prisma/client'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  Upload,
} from 'antd'

import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input

export default function JobOfferCreationPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: createJobOffer, isLoading } =
    Api.jobOffer.create.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  const [form] = Form.useForm()
  const [attachments, setAttachments] = useState<
    { name: string; url: string }[]
  >([])

  const handleUploadV2 = async (file: File, index: number) => {
    try {
      const { url } = await upload({ file })
      const newAttachments = [...attachments]
      newAttachments[index].url = url
      setAttachments(newAttachments)
    } catch (error) {
      enqueueSnackbar('Failed to upload file', { variant: 'error' })
    }
  }

  const locations = Locations.map(location => ({
    value: location,
    label: Utility.convertEnumToUserFriendly(location),
  }))

  const handleSubmit = async (values: any) => {
    try {
      const jobCreated = await createJobOffer({
        data: {
          title: values.title,
          description: values.description,
          location: values.location,
          attachments: {
            create: attachments.map(att => ({
              url: att.url,
              name: att.name,
            })),
          },
          tags: values.tags?.join(',') ?? null,
          applicationDocumentsRequired: values.applicationDocumentsRequired,
          companyId: user.companyId,
          salary: values.salaryAmount ?? null,
          salaryType: values.salaryType ?? null,
          salaryCurrency: values.salaryCurrency ?? null,
        },
      })
      enqueueSnackbar('Job offer created successfully', { variant: 'success' })
      router.push('/jobs/' + jobCreated.id)
    } catch (error) {
      enqueueSnackbar('Failed to create job offer', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>Create Job Offer</Title>
        <Text>Fill in the details below to post a new job offer.</Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-2"
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter the job title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Job Description"
            rules={[
              { required: true, message: 'Please enter the job description' },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: 'Please enter the job location' },
            ]}
          >
            <Select options={locations} placeholder="Enter job location" />
          </Form.Item>

          <Form.Item name="salaryAmount" label="Salary Amount">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="salaryType" label="Salary Type">
            <Select
              options={[
                { value: 'MONTHLY', label: 'Monthly' },
                { value: 'ONE_OFF', label: 'One-off' },
                { value: 'PER_HOUR', label: 'Per Hour' },
                { value: 'PER_DAY', label: 'Per Day' },
                { value: 'PER_WEEK', label: 'Per Week' },
                { value: 'PER_YEAR', label: 'Per Year' },
              ]}
            />
          </Form.Item>

          <Form.Item name="salaryCurrency" label="Salary Currency">
            <Select
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'GBP', label: 'GBP' },
                { value: 'EUR', label: 'EUR' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Attachments">
            <Space direction="vertical" style={{ width: '100%' }}>
              {attachments.map((attachment, index) => (
                <Space direction="horizontal" style={{ width: '100%' }}>
                  <Input
                    style={{ width: 'calc(100% - 32px)' }}
                    value={attachment.name}
                    onChange={e => {
                      const newAttachments = [...attachments]
                      newAttachments[index].name = e.target.value
                      setAttachments(newAttachments)
                    }}
                  />
                  {attachment.url === '' ? (
                    <Upload
                      customRequest={({ file }) =>
                        handleUploadV2(file as File, index)
                      }
                      listType="text"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  ) : (
                    <Text>File uploaded</Text>
                  )}
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      setAttachments(attachments.filter((_, i) => i !== index))
                    }
                  />
                </Space>
              ))}
              <Button
                icon={<FileAddOutlined />}
                onClick={() =>
                  setAttachments([...attachments, { name: '', url: '' }])
                }
              >
                Add Attachment
              </Button>
            </Space>
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Enter tags"
            />
          </Form.Item>

          <Form.Item
            name="applicationDocumentsRequired"
            label="Application Documents Required"
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Enter required documents"
            >
              <Select.Option value={DocumentType.RESUME}>Resume</Select.Option>
              <Select.Option value={DocumentType.COVER_LETTER}>
                Cover Letter
              </Select.Option>
              <Select.Option value={DocumentType.PORTFOLIO}>
                Portfolio
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Create Job Offer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageLayout>
  )
}
