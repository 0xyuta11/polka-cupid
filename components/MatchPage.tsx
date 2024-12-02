"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MatchPage() {
  const matchContainerRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    // Animate in the match container
    gsap.fromTo(
      matchContainerRef.current,
      {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
      },
      {
        y: 0,
        opacity: 1,
        ease: "power3.inOut",
      }
    );

    // Animate the character with a bouncy effect
    gsap.from(characterRef.current, {
      duration: 1.5,
      y: -20,
      scale: 0.8,
      ease: "elastic.out(1, 0.3)",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl flex gap-4">
        <Card
          ref={matchContainerRef}
          className="flex-1 p-8 bg-slate-900/50 backdrop-blur border-slate-800"
        >
          <div className="text-center space-y-8">
            <h1 className="text-3xl font-bold text-white">
              Congratulations! 🎉
            </h1>

            <div ref={characterRef} className="flex justify-center">
              <img
                src="/character.png"
                alt="Cute character with heart"
                className="w-32 h-32"
              />
            </div>

            <p className="text-slate-300">
              You have been matched with 0xca7aD2f1F2...21197a
            </p>

            <div className="flex gap-2">
              <Input
                className="bg-slate-800 border-slate-700"
                placeholder="Send a message..."
              />
              <Button className="bg-violet-600 hover:bg-violet-700">
                Send
              </Button>
            </div>
          </div>
        </Card>

        <div className="w-72 space-y-4">
          <Card className="p-4 bg-slate-900/50 backdrop-blur border-slate-800">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/your-avatar.png" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <p className="text-sm text-slate-300">0x07D43b8Ed4...cCbbFc</p>
              <p className="text-sm font-medium text-white">You</p>
            </div>
          </Card>

          <Card className="p-4 bg-slate-900/50 backdrop-blur border-slate-800">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/match-avatar.png" />
                <AvatarFallback>Match</AvatarFallback>
              </Avatar>
              <p className="text-sm text-slate-300">0xca7aD2f1F2...21197a</p>
              <p className="text-sm font-medium text-white">Your match</p>
            </div>
          </Card>

          <Card className="p-4 bg-slate-900/50 backdrop-blur border-slate-800 cursor-pointer hover:bg-slate-900/70 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <div className="text-red-500 text-2xl">💔</div>
              <p className="text-sm font-medium text-white">Break up</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
