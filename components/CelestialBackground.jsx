import React from 'react';

export default function CelestialBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Placeholder for star field animation */}
      <canvas id="starfield" className="w-full h-full" />
    </div>
  );
}
