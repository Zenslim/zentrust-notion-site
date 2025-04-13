import { useState, useEffect } from "react"
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
  twitterProvider,
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
            setMessage("Signed in with magic link!")
            router.push("/zenboard") // ⬅️ Optional redirect
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
      setMessage("Magic link sent! Check your email ✨")
    } catch (err) {
      console.error(err)
      setMessage("Error sending magic link.")
    }
  }

  const handleProviderLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch {
      setMessage("Social login failed")
    }
  }

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth)
      router.push("/dashboard")
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
              className="w-full py-2 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
            >
              Sign in with Email
            </button>
            <button
              onClick={() => setView("guest")}
              className="w-full py-2 px-4 rounded-xl bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              Explore First (Guest Access)
            </button>
            <hr className="border-t" />
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleProviderLogin(googleProvider)}
                className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100"
              >
                🔑 Continue with Google
              </button>
              <button
                onClick={() => handleProviderLogin(githubProvider)}
                className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100"
              >
                👨‍💻 Continue with GitHub
              </button>
              <button
                onClick={() => handleProviderLogin(facebookProvider)}
                className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100"
              >
                👤 Continue with Facebook
              </button>
              <button
                onClick={() => handleProviderLogin(twitterProvider)}
                className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100"
              >
                🐦 Continue with Twitter
              </button>
              <button
                onClick={() => alert("LinkedIn login not implemented yet")}
                className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100"
              >
                💼 Continue with LinkedIn
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
              Send me a magic link ✨
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
              You’re entering as a guest. You can explore freely, but some
              features may require full sign-in later.
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
