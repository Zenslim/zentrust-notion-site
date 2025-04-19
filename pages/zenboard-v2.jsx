import ChakraGlowV2 from '@/components/ChakraGlowV2';
import CelestialBackground from '@/components/ZenJoystick/CelestialBackground';

export default function ZenboardV2() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CelestialBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <ChakraGlowV2 />
      </div>
    </div>
  );
}
