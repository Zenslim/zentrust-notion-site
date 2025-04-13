// pages/[slug].js
import React from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import { NotionAPI } from 'notion-client'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

const Code = dynamic(() => import('react-notion-x/build/third-party/code'))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection'))
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation'))
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf'))
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal'))

const pageMap = {
 why: '1d17b43e0a0c80caa37ff56c1c9943be',  // WHY - Why We Exist
  how: '1d17b43e0a0c805a9676ec69cb7a5bf2',  // HOW - The ZenTrust Way
  what: '1d07b43e0a0c80448e3fd83b044656a8'  // WHAT WE OFFER
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
    paths: Object.keys(pageMap).map((slug) => ({
      params: { slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const api = new NotionAPI()
  const recordMap = await api.getPage(pageMap[params.slug])
  return {
    props: { recordMap },
    revalidate: 60
  }
}

export default Page
