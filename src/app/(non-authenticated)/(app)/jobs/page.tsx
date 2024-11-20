'use client'

import { Locations } from '@/config/location.objects'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import {
  EnvironmentOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Prisma, SalaryType } from '@prisma/client'
import {
  Button,
  Card,
  Input,
  InputNumber,
  Pagination,
  Popover,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd'
import Avatar from 'antd/es/avatar/avatar'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'

const { Title, Text, Paragraph } = Typography

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string>(null)
  const [selectedPayPeriod, setSelectedPayPeriod] = useState<SalaryType>(null)
  const [selectedMinPay, setSelectedMinPay] = useState<number | null>(null)
  const [selectedOrderBy, setSelectedOrderBy] = useState<string>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    [],
  )

  const {
    data: paginatedJobOffers,
    isLoading,
    refetch,
  } = Api.jobOffer.findMany.useQuery({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { company: { name: { contains: searchTerm, mode: 'insensitive' } } },
      ],
      ...(selectedLocation ? { location: selectedLocation } : {}),
      ...(selectedMinPay ? { salary: { gte: selectedMinPay } } : {}),
      ...(selectedPayPeriod ? { salaryType: selectedPayPeriod } : {}),
      ...(selectedCurrency ? { salaryCurrency: selectedCurrency } : {}),
      status: 'APPROVED',
    },
    include: { company: true },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: {
      ...(selectedOrderBy === 'most-recent' ? { dateCreated: 'desc' } : {}),
      ...(selectedOrderBy === 'salary-high' ? { salary: 'desc' } : {}),
    },
  })

  const { data: totalCount } = Api.jobOffer.count.useQuery({
    where: {
      ...(user?.role === 'EMPLOYER' ? { companyId: user.companyId } : {}),
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { company: { name: { contains: searchTerm, mode: 'insensitive' } } },
      ],
      ...(selectedLocation ? { location: selectedLocation } : {}),
      ...(selectedMinPay ? { salary: { gte: selectedMinPay } } : {}),
      ...(selectedPayPeriod ? { salaryType: selectedPayPeriod } : {}),
      ...(selectedCurrency ? { salaryCurrency: selectedCurrency } : {}),
      status: 'APPROVED',
    },
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <PageLayout layout="narrow">
      {user?.role === 'EMPLOYER' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/employer/job-offers/new')}
          >
            Create Job Offer
          </Button>
        </div>
      )}
      <Card className="bg-[#F7FAFC]" bordered={false}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input
            placeholder="Search by job title"
            onChange={e => debouncedSetSearchTerm(e.target.value)}
            suffix={
              <Button
                type="primary"
                shape="circle"
                icon={<FileSearchOutlined />}
              />
            }
          />
          <Space wrap>
            <Select
              style={{ width: 200 }}
              placeholder="Country or timezone"
              onChange={value => setSelectedLocation(value)}
              allowClear
            >
              {Locations.map(location => (
                <Select.Option key={location} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
            <Popover
              placement="bottom"
              content={
                <div style={{ padding: '8px' }}>
                  <Select
                    style={{ width: '100%', marginBottom: '8px' }}
                    placeholder="Currency"
                    onChange={value => setSelectedCurrency(value)}
                  >
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="GBP">GBP</Select.Option>
                  </Select>
                  <Select
                    style={{ width: '100%', marginBottom: '8px' }}
                    placeholder="Per"
                    onChange={value => setSelectedPayPeriod(value)}
                  >
                    <Select.Option value={SalaryType.PER_HOUR}>
                      Per hour
                    </Select.Option>
                    <Select.Option value={SalaryType.MONTHLY}>
                      Per month
                    </Select.Option>
                    <Select.Option value={SalaryType.PER_YEAR}>
                      Per year
                    </Select.Option>
                  </Select>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Minimum"
                    onChange={value => setSelectedMinPay(Number(value))}
                    prefix={selectedCurrency}
                  />
                </div>
              }
              trigger="click"
            >
              <Button
                style={{ width: 150 }}
                className="text-gray-400 justify-start font-normal		"
              >
                Salary
              </Button>
            </Popover>
          </Space>
        </Space>
      </Card>

      {isLoading ? (
        <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 0',
            }}
          >
            <Text>{paginatedJobOffers?.length || 0} jobs</Text>
            <Select
              defaultValue="most-recent"
              style={{ width: 150 }}
              onChange={value => setSelectedOrderBy(value)}
            >
              <Select.Option value="most-recent">Most recent</Select.Option>
              <Select.Option value="salary-high">Salary high</Select.Option>
            </Select>
          </div>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {paginatedJobOffers?.map(
              (
                jobOffer: Prisma.JobOfferGetPayload<{
                  include: { company: true }
                }>,
              ) => (
                <Link href={`/jobs/${jobOffer.id}`}>
                  <Card key={jobOffer.id} hoverable>
                    <Space
                      direction="horizontal"
                      size="large"
                      align="start"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ flex: 1 }}
                      >
                        <Space align="start">
                          <Avatar size={50} src={jobOffer.company?.logo}>
                            {' '}
                            {jobOffer.company?.name.charAt(0)}
                          </Avatar>
                          <Space direction="vertical" size={0}>
                            <Title level={4} style={{ margin: 0 }}>
                              {jobOffer.title}
                            </Title>
                            <Text>{jobOffer.company?.name}</Text>
                          </Space>
                        </Space>
                      </Space>
                      <Space direction="vertical" align="end">
                        <Text type="secondary">
                          Posted {jobOffer.dateCreated?.toLocaleDateString()}
                        </Text>
                        <div>
                          <Tag icon={<EnvironmentOutlined />} color="default">
                            {jobOffer.location}
                          </Tag>
                          {jobOffer?.tags?.split(',')?.map((tag, index) => (
                            <Tag key={index} color="default">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </Space>
                    </Space>
                  </Card>
                </Link>
              ),
            )}
          </Space>
          <Pagination
            current={currentPage}
            total={totalCount || 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </>
      )}
    </PageLayout>
  )
}
