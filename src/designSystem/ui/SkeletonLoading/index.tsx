import { PageLayout } from '@/designSystem/layouts'
import { Card, Col, Divider, Row } from 'antd'
import React from 'react'

type Props = {}

export const SkeletonLoading: React.FC<Props> = ({}) => {
  return (
    <PageLayout layout="narrow">
      <Card className="animate-pulse transition-shadow duration-300">
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <svg
                  className="w-50 h-50 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </Col>
              <Col>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={16}>
              <Col>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </Col>
              <Col>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        </Row>

        <Divider />

        <Row gutter={[32, 16]}>
          <Col span={16}>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-4"></div>
          </Col>
          <Col span={8}>
            <Card>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </Card>
            <Card className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}
