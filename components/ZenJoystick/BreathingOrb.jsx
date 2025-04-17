export default function BreathingOrb() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(165, 89, 255, 0.25) 0%, rgba(0, 0, 0, 0) 80%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(100px)',
        opacity: 0.6,
        animation: 'glowingAura 6s ease-in-out infinite',
        zIndex: 0,
      }}
    />
  );
}
