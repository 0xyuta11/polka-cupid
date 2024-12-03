// app/profile/page.tsx
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
// import { useToast } from "@/components/ui/use-toast";
import gsap from "gsap";
import { updateProfile, getProfile, SocialAccount } from "../actions/profile";

interface SocialHandle extends SocialAccount {
  icon: React.ReactNode;
  url: string;
}

export default function ProfilePage({ userId }: { userId: string }) {
  // const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
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
    const loadProfile = async () => {
      const result = await getProfile(userId);
      if (result.success && result.data) {
        setName(result.data.user.name);
        setSocialHandles((prev) =>
          prev.map((handle) => {
            const matchingHandle = result.data.socialHandles.find(
              (h) => h.platform.toLowerCase() === handle.platform.toLowerCase()
            );
            return matchingHandle
              ? { ...handle, ...matchingHandle }
              : handle;
          })
        );
      }
    };

    loadProfile();
  }, [userId]);

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

  const handleSave = async () => {
    const result = await updateProfile(
      userId,
      name,
      socialHandles.map(({ platform, username, isVerified }) => ({
        platform,
        username,
        isVerified,
      }))
    );

    if (result.success) {
      // toast({
      //   title: "Success",
      //   description: "Profile updated successfully",
      // });
      console.log("Profile updated successfully");
      setIsEditing(false);
    } else {
      // toast({
      //   title: "Error",
      //   description: result.error || "Failed to update profile",
      //   variant: "destructive",
      // });
      console.error("Failed to update profile:", result.error);
    }
  };

  const verifyHandle = async (index: number) => {
    const updatedHandles = [...socialHandles];
    updatedHandles[index].isVerified = true;
    setSocialHandles(updatedHandles);

    // Save changes immediately when verifying
    await handleSave();
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
                  {isEditing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="max-w-[200px]"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{name}</h1>
                  )}
                  {socialHandles.some((handle) => handle.isVerified) && (
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
              </div>
            </div>
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

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
