export async function getStaticProps() {
  return {
    redirect: {
      destination: '/home',
      permanent: false
    }
  }
}

export default function Redirect() {
  return null
}
