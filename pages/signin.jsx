import { useState, useEffect } from "react"
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  appleProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInAnonymously,
} from "../firebase"
import { useRouter } from "next/router"

export default function Signin() {
  const [view, setView] = useState("choose")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = localStorage.getItem("emailForSignIn")
      if (!storedEmail) storedEmail = prompt("Please provide your email")
      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then(() => {
            localStorage.removeItem("emailForSignIn")
            setMessage("Signed in with magic link! Redirecting...")
            router.push("/zenboard")
          })
          .catch(() => setMessage("Magic link sign-in failed"))
      }
    }
  }, [])

  const handleMagicLink = async () => {
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    }
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      localStorage.setItem("emailForSignIn", email)
      setMessage("Check your inbox for a magic link ✨")
    } catch (err) {
      console.error(err)
      setMessage("Could not send magic link.")
    }
  }

  const handleProviderLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider)
      router.push("/zenboard")
    } catch {
      setMessage("Social login failed")
    }
  }

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth)
      router.push("/zenboard")
    } catch (err) {
      console.error(err)
      setMessage("Guest access failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Welcome to ZenTrust
        </h1>

        {view === "choose" && (
          <div className="space-y-4">
            <button
              onClick={() => setView("email")}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-lg flex items-center justify-center space-x-3"
            >
              <span>📧</span>
              <span>Sign in with Email</span>
            </button>

            <button
              onClick={() => setView("guest")}
              className="w-full py-3 px-4 rounded-xl bg-yellow-100 text-yellow-900 font-semibold hover:bg-yellow-200 shadow-md flex items-center justify-center space-x-3"
            >
              <span>🌿</span>
              <span>Explore First (Guest Access)</span>
            </button>

            <hr className="border-t my-2" />

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleProviderLogin(googleProvider)}
                className="w-full py-3 px-4 rounded-xl bg-white border text-gray-800 hover:bg-gray-100 flex items-center justify-center space-x-3 shadow"
              >
                <span>🔑</span>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={() => handleProviderLogin(appleProvider)}
                className="w-full py-3 px-4 rounded-xl bg-white border text-gray-800 hover:bg-gray-100 flex items-center justify-center space-x-3 shadow"
              >
                <span>🍎</span>
                <span>Continue with Apple</span>
              </button>

              <button
                onClick={() => handleProviderLogin(facebookProvider)}
                className="w-full py-3 px-4 rounded-xl bg-white border text-gray-800 hover:bg-gray-100 flex items-center justify-center space-x-3 shadow"
              >
                <span>👤</span>
                <span>Continue with Facebook</span>
              </button>

              <button
                onClick={() => handleProviderLogin(twitterProvider)}
                className="w-full py-3 px-4 rounded-xl bg-white border text-gray-800 hover:bg-gray-100 flex items-center justify-center space-x-3 shadow"
              >
                <span>🐦</span>
                <span>Continue with Twitter</span>
              </button>

              <button
                onClick={() => alert("Web3 login coming soon.")}
                className="w-full py-3 px-4 rounded-xl bg-white border text-indigo-700 hover:bg-indigo-50 flex items-center justify-center space-x-3 shadow"
              >
                <span>🧬</span>
                <span>Connect Wallet (Web3)</span>
              </button>
            </div>

            {message && (
              <p className="text-sm text-green-600 text-center pt-2">{message}</p>
            )}
          </div>
        )}

        {view === "email" && (
          <div className="space-y-4">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button
              onClick={handleMagicLink}
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
            >
              ✨ Send Magic Link
            </button>
            <button
              onClick={() => setView("choose")}
              className="text-sm text-gray-500 underline"
            >
              ← Back
            </button>
            {message && (
              <p className="text-sm text-green-600 text-center pt-2">{message}</p>
            )}
          </div>
        )}

        {view === "guest" && (
          <div className="space-y-4 text-center">
            <p className="text-gray-600">
              You’re entering as a guest. Some features may be limited.
            </p>
            <button
              onClick={handleGuestLogin}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              🧳 Continue as Guest
            </button>
            <button
              onClick={() => setView("choose")}
              className="text-sm text-gray-500 underline"
            >
              ← Back
            </button>
            {message && (
              <p className="text-sm text-green-600 text-center pt-2">{message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
