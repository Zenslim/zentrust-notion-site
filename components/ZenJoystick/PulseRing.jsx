// components/ZenJoystick/PulseRing.jsx

export default function PulseRing({ bp }) {
  const total =
    bp.spiritual + bp.psycho + bp.bio + bp.social || 0;

  const intensity = Math.min(total / 400, 1); // Normalize (0–1)
  const glowSize = 300 + intensity * 200; // 300–500px

  return (
    <div
      className="absolute rounded-full bg-pink-600 blur-3xl opacity-30 animate-pulse -z-10"
      style={{
        width: `${glowSize}px`,
        height: `${glowSize}px`,
        top: `calc(50% - ${glowSize / 2}px)`,
        left: `calc(50% - ${glowSize / 2}px)`,
        transition: 'all 0.8s ease-in-out',
      }}
    />
  );
}
