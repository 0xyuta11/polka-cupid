"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AtSign, Github, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import gsap from "gsap";

interface SocialHandle {
  platform: string;
  username: string;
  isVerified: boolean;
  icon: React.ReactNode;
  url: string;
}

export default function ProfilePage() {
  const [isProfileVerified, setIsProfileVerified] = useState(false);
  const [socialHandles, setSocialHandles] = useState<SocialHandle[]>([
    {
      platform: "GitHub",
      username: "",
      isVerified: false,
      icon: <Github className="w-4 h-4" />,
      url: "https://github.com/",
    },
    {
      platform: "Twitter",
      username: "",
      isVerified: false,
      icon: <Twitter className="w-4 h-4" />,
      url: "https://twitter.com/",
    },
    {
      platform: "Instagram",
      username: "",
      isVerified: false,
      icon: <Instagram className="w-4 h-4" />,
      url: "https://instagram.com/",
    },
  ]);

  useEffect(() => {
    gsap.fromTo(
      ".profile-container",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  const verifyHandle = (index: number) => {
    const updatedHandles = [...socialHandles];
    updatedHandles[index].isVerified = true;
    setSocialHandles(updatedHandles);

    // Check if any handle is verified to update profile verification status
    const hasVerifiedHandle = updatedHandles.some(
      (handle) => handle.isVerified
    );
    setIsProfileVerified(hasVerifiedHandle);
  };

  return (
    <ScrollArea className="h-screen w-screen">
      <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-8">
        <div className="profile-container space-y-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <AtSign className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  {isProfileVerified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-500"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Verified
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This profile has verified social handles</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="text-zinc-500">@johndoe</p>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>

          {/* Social Handles Section */}
          <div className="space-y-6 bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold">Social Handles</h2>
            <div className="space-y-4">
              {socialHandles.map((handle, index) => (
                <div key={handle.platform} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                    {handle.icon}
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-zinc-500">
                      {handle.platform}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder={`Enter your ${handle.platform} username`}
                        value={handle.username}
                        onChange={(e) => {
                          const updatedHandles = [...socialHandles];
                          updatedHandles[index].username = e.target.value;
                          setSocialHandles(updatedHandles);
                        }}
                        className="max-w-md"
                      />
                      {handle.isVerified ? (
                        <Badge className="bg-green-500/10 text-green-500">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => verifyHandle(index)}
                          disabled={!handle.username}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Profile Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-zinc-500">
                Frontend developer passionate about creating beautiful user
                interfaces.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-zinc-500">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-zinc-500">Matches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
