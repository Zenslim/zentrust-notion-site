import CelestialBackground from '@/components/CelestialBackground';
import PlanetMessenger from '@/components/PlanetMessenger';

export default function ZenboardV2() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <CelestialBackground />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <PlanetMessenger />
      </div>
    </div>
  );
}
