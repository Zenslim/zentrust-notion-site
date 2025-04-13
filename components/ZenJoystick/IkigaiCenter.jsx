// components/ZenJoystick/IkigaiCenter.jsx

export default function IkigaiCenter({ ikigai }) {
  return (
    <div className="absolute inset-1/3 rounded-full bg-white/10 backdrop-blur text-center p-4 shadow-inner">
      <p className="text-sm text-gray-200">🌸 Your Ikigai</p>
      <p className="text-lg font-semibold text-white mt-1">{ikigai || 'No Ikigai yet'}</p>
    </div>
  );
}

