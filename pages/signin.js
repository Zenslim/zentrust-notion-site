import { useState } from "react";

export default function Signin() {
  const [view, setView] = useState("choose"); // choose | email | guest

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
              onClick={() => alert("Magic link sent (placeholder)")}
              className="w-full py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50"
            >
              Send me a magic link ✨
            </button>
            <button
              onClick={() => setView("guest")}
              className="w-full py-2 px-4 rounded-xl bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              Explore First (Guest Access)
            </button>
            <hr className="border-t" />
            <div className="flex flex-col space-y-2">
              <button className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100">
                Continue with Google
              </button>
              <button className="py-2 px-4 rounded-xl bg-white border hover:bg-gray-100">
                Continue with GitHub
              </button>
            </div>
          </div>
        )}

        {view === "email" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Email login (placeholder)");
            }}
            className="space-y-4"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-xl"
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setView("choose")}
              className="text-sm text-gray-500 underline"
            >
              ← Back
            </button>
          </form>
        )}

        {view === "guest" && (
          <div className="space-y-4 text-center">
            <p className="text-gray-600">
              You’re entering as a guest. You can explore freely, but some
              features may require full sign-in later.
            </p>
            <button
              onClick={() => alert("Entering as guest (placeholder)")}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Continue as Guest
            </button>
            <button
              onClick={() => setView("choose")}
              className="text-sm text-gray-500 underline"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
