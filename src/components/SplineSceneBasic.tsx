'use client'

import React from 'react';
import { SplineScene } from "./ui/splite";
import { Card } from "./ui/card"
import { Spotlight } from "./ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-screen min-h-screen bg-white dark:bg-black/96 relative overflow-hidden border-0 rounded-none flex flex-col justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 hidden dark:block"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center text-center md:text-left pt-20 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 pb-4">
            Physical AI & Humanoid Robotics
          </h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-lg mx-auto md:mx-0 text-lg">
            Bridging the gap between the digital brain and the physical body.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 md:flex-[1.5] relative h-[50vh] md:h-full">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}