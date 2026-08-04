'use client';

import dynamic from 'next/dynamic';

// Split each MorphSVG chalk into its own chunk (bundle-dynamic-imports).
const Game = dynamic(() => import('./Game'), { ssr: false, loading: () => null });
const Mic = dynamic(() => import('./Mic'), { ssr: false, loading: () => null });
const Paint = dynamic(() => import('./Paint'), {
  ssr: false,
  loading: () => null,
});

/**
 * Chalks decoration from Figma (Portfolio → Frame 30, node 726-469).
 * Three stacked chalk-style icons: game (top), mic (middle), paint (bottom).
 * Frame: 151.82×574px. Icons positioned per Figma layout.
 * All icons morph on hover via GSAP MorphSVG.
 */
function Chalks() {
  return (
    <div className="absolute inset-0 size-full">
      <Game className="absolute top-[5%] left-45 aspect-126/89 w-[13.29%]" />
      <Mic className="absolute top-[25%] left-4 aspect-140/121 w-[14.77%]" />
      <Paint className="absolute top-[45%] left-40 aspect-180/184 w-[18.99%]" />
    </div>
  );
}

export default Chalks;
