'use client'

import React, { Suspense, lazy, useState } from 'react'
// Lazy load Spline to avoid blocking the main bundle
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Add state to track if the Spline scene has finished loading
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 
         Placeholder / Loader Overlay 
         Visible while isLoading is true.
      */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          {/* Spinner */}
          <span className="loader"></span>
        </div>
      )}

      {/* 
         The 3D Scene
         We keep it mounted but hidden or behind the loader until ready.
      */}
      <Suspense 
        fallback={null}
      >
        <div className={`w-full h-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Spline
            scene={scene}
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </Suspense>
    </div>
  )
}
