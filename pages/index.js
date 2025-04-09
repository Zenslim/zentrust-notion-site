// pages/index.js
export async function getStaticProps() {
  return {
    redirect: {
      destination: '/index', // this points to your Notion homepage (slug: 'index')
      permanent: false
    }
  }
}

export default function Redirect() {
  return null
}
