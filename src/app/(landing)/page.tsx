'use client'
import LandingButton from '@/designSystem/landing/LandingButton'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import {
  CheckOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

export default function LandingPage() {
  const features = [
    {
      heading: 'Effortless Search',
      description: 'Find remote jobs quickly with our powerful search engine.',
      icon: <SearchOutlined className="text-2xl text-blue-500" />,
    },
    {
      heading: 'Only the Good Stuff',
      description:
        'We verify all job listings to ensure quality and legitimacy.',
      icon: <CheckOutlined className="text-2xl text-green-500" />,
    },
    {
      heading: 'Stay Ahead of the Game',
      description:
        'Get notified about new job postings that match your criteria.',
      icon: <ClockCircleOutlined className="text-2xl text-yellow-500" />,
    },
  ]
  const questionAnswers = [
    {
      question: 'What is MarbleJob?',
      answer:
        'MarbleJob is a comprehensive job board application designed to streamline the hiring process for employers and job seekers alike.',
    },
    {
      question: 'How does MarbleJob help employers?',
      answer:
        'Employers can easily post job offers, manage applications, and evaluate potential hires all in one place.',
    },
    {
      question: 'How does MarbleJob help job seekers?',
      answer:
        'Job seekers have access to a wide array of job offers and can apply with ease using their resume and motivation letter.',
    },
    {
      question: 'What features are included in the admin panel?',
      answer:
        'The admin panel allows administrators to manage companies, users, and invite employers to join the platform.',
    },
  ]
  const navItems = [
    {
      title: 'Jobs',
      link: '/jobs',
    },
    {
      title: 'Post a Job',
      link: '/register',
    },
  ]

  const logos = [
    { url: 'https://lefthook.com/wp-content/uploads/Slack-logo-2.png' },
    {
      url: 'https://i.imgur.com/UmJRIXm.png',
    },
    { url: 'https://i.imgur.com/5j5npl3.png' },
    { url: 'https://i.imgur.com/mNRwSrr.png' },
  ]

  return (
    <LandingContainer navItems={navItems}>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center flex items-center justify-center h-[calc(100vh-74px)]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461263895214-7761d3a942de?q=80&w=3020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Opportunity is wherever you are
          </h1>
          <p className="text-xl sm:text-2xl mb-10">
            {"We're connecting the best talent with the best companies."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <LandingButton
              href="/jobs"
              className="bg-black hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
            >
              Browse jobs
            </LandingButton>
            <LandingButton
              href="/register"
              className="bg-white hover:bg-gray-100 hover:text-black text-black px-8 py-3 rounded-full text-lg font-semibold"
            >
              Post a job
            </LandingButton>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm lg:text-sm text-gray-500 mb-8 text-center	">
            Top Companies Hiring Remotely
          </h2>
          <div className="flex justify-center space-x-8">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.url}
                alt="Company logo"
                style={{ height: '50px' }}
                className="grayscale"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold lg:tracking-tight mb-12">
            The Fastest Way to Find Real Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.heading}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div id="benefits" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold lg:tracking-tight mb-8">
            Rest Easy with MarbleJobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                heading: 'Real remote job listings',
                description:
                  'We manually review every single job post to ensure its 100% remote, high-quality, and spam-free.',
                icon: <CheckOutlined className="text-2xl text-green-500" />,
              },
              {
                heading: 'Personalized results',
                description:
                  'Receive custom job recommendations based on your skills, experience, and preferences.',
                icon: <FileTextOutlined className="text-2xl text-blue-500" />,
              },
              {
                heading: "Don't waste your time",
                description:
                  'Say goodbye to sifting through countless job boards. We bring all the best remote jobs to one place.',
                icon: (
                  <ClockCircleOutlined className="text-2xl text-yellow-500" />
                ),
              },
              {
                heading: 'Fast & easy to browse',
                description:
                  'Our clean, minimalist design lets you quickly scan jobs and find relevant opportunities.',
                icon: <SearchOutlined className="text-2xl text-purple-500" />,
              },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-4">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.heading}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LandingFAQ
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about MarbleJob"
        questionAnswers={questionAnswers}
      />
      {/* CTA */}
      <div className="bg-gray-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold lg:tracking-tight`}>
            Millions of professionals are already enjoying a job.
          </h2>
          <p className="text-xl mb-8">Be the next one.</p>
          <Link
            href="/jobs"
            className="bg-white hover:bg-gray-100 hover:text-black text-black px-8 py-3 rounded-full text-lg font-semibold"
          >
            Find Your Next Remote Job
          </Link>
        </div>
      </div>
    </LandingContainer>
  )
}
