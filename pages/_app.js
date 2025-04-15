// pages/_app.jsx
import '@/components/zenboard/chakra-aura.css'
import '../styles/globals.css'
import { useEffect } from 'react'
import { auth } from '../firebase'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("✅ Signed in as:", user.email || "Anonymous", "| UID:", user.uid)
      } else {
        console.warn("⚠️ No user signed in.")
      }
    })
    return () => unsubscribe()
  }, [])

  return <Component {...pageProps} />
}
