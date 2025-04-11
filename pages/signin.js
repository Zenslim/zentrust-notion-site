import SignIn from '../components/SignIn';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to ZenTrust 🧘</h1>
      <SignIn />
    </main>
  );
}
