import React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

const Code = dynamic(() => import('react-notion-x/build/third-party/code'))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection'))
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation'))
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf'))
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal'))

const pageMap = {
  about: '1d07b43e0a0c807794d4e4f2c8609794',
  vision: '1d07b43e0a0c805dbc03dd2d7a3b40b5',
  contact: '1d07b43e0a0c8022a676c23f1b7810d2'
}

const Page = ({ recordMap }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <NotionRenderer
        recordMap={recordMap}
        components={{ Code, Collection, Equation, Pdf, Modal }}
        fullPage={true}
        darkMode={false}
      />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'about' } },
      { params: { slug: 'vision' } },
      { params: { slug: 'contact' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { getPage } = await import('notion-client')
  const recordMap = await getPage(pageMap[params.slug])
  return {
    props: { recordMap },
    revalidate: 60
  }
}

export default Page
