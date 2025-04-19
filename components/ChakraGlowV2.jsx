import { useEffect, useState } from 'react';

export default function ChakraGlowV2() {
  const [message, setMessage] = useState('Your presence matters.');
  const messages = [
    'You are safe here.',
    'Your breath is enough.',
    'You matter.',
    'We’re glad you’re here.',
    'It’s okay to rest.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
      <div className="relative">
        <div className="w-64 h-64 bg-green-500 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl md:text-3xl text-white font-semibold">{message}</div>
        </div>
      </div>
    </div>
  );
}