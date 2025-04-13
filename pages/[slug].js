import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import 'react-notion-x/src/styles.css'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(m => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(m => m.Collection)
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(m => m.Equation)
)
const Pdf = dynamic(() =>
  import('react-notion-x/build/third-party/pdf').then(m => m.Pdf)
)
const Modal = dynamic(() =>
  import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)

const notionPageIds = {
  why: '1d17b43e0a0c80caa37ff56c1c9943be',
  how: '1d17b43e0a0c805a9676ec69cb7a5bf2',
  what: '1d07b43e0a0c80448e3fd83b044656a8'
}

export async function getStaticPaths() {
  const paths = Object.keys(notionPageIds).map(slug => ({
    params: { slug }
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const id = notionPageIds[params.slug]
  const notion = new NotionAPI()
  const recordMap = await notion.getPage(id)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export default function NotionPage({ recordMap }) {
  return (
    <div className="bg-white text-black min-h-screen px-4 md:px-12 py-8 space-y-8">

      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/zentrust-logo.png"
          alt="ZenTrust Logo"
          className="h-10 md:h-14 w-auto mb-2"
        />
           {/* Notion Page Content */}
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        disableHeader={true}
        header={null}
        footer={null}
        components={{
          Code,
          Collection,
          Equation,
          Pdf,
          Modal
        }}
      />

      {/* Back to Home - Bottom */}
      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
