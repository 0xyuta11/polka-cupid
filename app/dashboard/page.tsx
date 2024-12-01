"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/Navbar";
import SwipeCard, { SwipeCardHandle } from "@/components/SwipeCard";
import { X, Heart } from "lucide-react";
import { Profile, DUMMY_PROFILES } from "@/lib/dummy-data";

// Helper functions
function getRandomProfiles(count: number): Profile[] {
  return [...DUMMY_PROFILES].sort(() => 0.5 - Math.random()).slice(0, count);
}

// UI Components
function ActionButtons({
  onSwipeLeft,
  onSwipeRight,
}: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) {
  return (
    <div className="flex justify-center gap-8">
      <Button
        size="icon"
        variant="outline"
        className="rounded-full h-14 w-14 shadow-lg"
        onClick={onSwipeLeft}
      >
        <X size={24} className=" text-red-500" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full h-14 w-14 shadow-lg"
        onClick={onSwipeRight}
      >
        <Heart size={24} className=" text-green-700" />
      </Button>
    </div>
  );
}

// Add these constants at the top of the file
const STACK_PROPERTIES = {
  maxRotation: 8, // Maximum rotation in degrees
  maxOffset: 8, // Maximum offset in pixels
  scaleDecrement: 0.05, // How much to decrease scale for each card
  opacityDecrement: 0.15, // How much to decrease opacity for each card
};

// Main App Component
export default function App() {
  const router = useRouter();
  const [currentProfiles, setCurrentProfiles] = useState(DUMMY_PROFILES);
  const activeCardRef = useRef<SwipeCardHandle>(null);

  // Handlers
  const handleSwipe = (direction: "left" | "right") => {
    activeCardRef.current?.handleSwipe(direction);
  };

  const handleSwipeComplete = () => {
    setCurrentProfiles((prev) => prev.slice(1));
  };

  return (
    <div className="flex flex-col min-h-screen dark">
      <NavBar />

      <main className="flex-1 flex items-center justify-center bg-background overflow-hidden">
        <div className="flex flex-col items-center gap-8">
          {/* Cards Stack */}
          <div className="relative w-[320px] h-[500px]">
            {currentProfiles
              .slice(0, 3) // Only show top 3 cards for better performance
              .map((profile, index) => {
                // Calculate random but consistent transformations
                const seed = profile.id; // Use profile.id as seed for consistency
                const random = (min: number, max: number) => {
                  const rand = Math.sin(seed * index) * 10000;
                  return min + (rand - Math.floor(rand)) * (max - min);
                };

                const rotation = random(
                  -STACK_PROPERTIES.maxRotation,
                  STACK_PROPERTIES.maxRotation
                );
                const translateX = random(
                  -STACK_PROPERTIES.maxOffset,
                  STACK_PROPERTIES.maxOffset
                );
                const translateY = random(
                  -STACK_PROPERTIES.maxOffset,
                  STACK_PROPERTIES.maxOffset
                );
                const scale = 1 - index * STACK_PROPERTIES.scaleDecrement;
                const opacity = 1 - index * STACK_PROPERTIES.opacityDecrement;

                const style =
                  index === 0
                    ? {}
                    : {
                        transform: `rotate(${rotation}deg) 
                             translate(${translateX}px, ${translateY}px) 
                             scale(${scale})`,
                        opacity,
                        pointerEvents: "none" as const,
                      };

                return (
                  <div
                    key={profile.id}
                    className="absolute inset-0 transition-all duration-200"
                    style={style}
                  >
                    <SwipeCard
                      ref={index === 0 ? activeCardRef : null}
                      {...profile}
                      onSwipe={handleSwipeComplete}
                    />
                  </div>
                );
              })
              .reverse()}

            {/* Empty State */}
            {currentProfiles.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl text-gray-500">No more profiles!</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {currentProfiles.length > 0 && (
            <ActionButtons
              onSwipeLeft={() => handleSwipe("left")}
              onSwipeRight={() => handleSwipe("right")}
            />
          )}
        </div>
      </main>
    </div>
  );
}
