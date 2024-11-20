'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { Button, message, Modal, Pagination, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Title } = Typography

export default function EmployerJobOffersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useUserContext()
  const pageSize = 10
  const [selectedJobOffer, setSelectedJobOffer] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()

  const {
    data: jobOffers,
    isLoading,
    refetch,
  } = Api.jobOffer.findMany.useQuery({
    where: { companyId: user?.companyId },
    include: { company: true },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  const { mutateAsync: updateJobOffer } = Api.jobOffer.update.useMutation()

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const showArchiveModal = jobOffer => {
    setSelectedJobOffer(jobOffer)
    setIsModalVisible(true)
  }

  const handleArchive = async () => {
    try {
      await updateJobOffer({
        where: { id: selectedJobOffer.id },
        data: { status: 'ARCHIVED' },
      })
      message.success('Job offer archived successfully')
      refetch()
    } catch (error) {
      message.error('Failed to archive job offer')
    }
    setIsModalVisible(false)
  }

  const handleRowClick = record => {
    router.push(`/jobseeker/job-offers/${record.id}`)
  }

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: date => dayjs(date).format('YYYY-MM-DD'),
      sorter: (a, b) =>
        dayjs(a.dateCreated).unix() - dayjs(b.dateCreated).unix(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            onClick={e => {
              e.stopPropagation()
              showArchiveModal(record)
            }}
          >
            Archive
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation()
              router.push(`/employer/applications/`)
            }}
            style={{ marginLeft: '10px' }}
          >
            See Applications
          </Button>
        </>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Job Offers</Title>
      <Table
        dataSource={jobOffers}
        columns={columns}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        className="cursor-pointer"
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <Pagination
        current={currentPage}
        total={jobOffers?.length || 0}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
      <Modal
        title="Archive Job Offer"
        visible={isModalVisible}
        onOk={handleArchive}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to archive this job offer?</p>
      </Modal>
    </PageLayout>
  )
}
