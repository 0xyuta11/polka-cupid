"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AtSign,
  Github,
  Twitter,
  Instagram,
  Link as LinkIcon,
  Mail,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfileStore } from "@/store/use-profile-store";
import { useSocialHandlesStore } from "@/store/use-social-handles-store";
import gsap from "gsap";

export default function ProfilePage() {
  const {
    name,
    age,
    gender,
    selectedTraits,
    wantedTraits,
    setName,
    setAge,
    setGender,
    setSelectedTraits,
    setWantedTraits,
  } = useProfileStore();

  const { handles: socialHandles, setHandles: setSocialHandles } =
    useSocialHandlesStore();

  const [hydrated, setHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name || "",
    age: age || "",
    gender: gender || "",
    selectedTraits: selectedTraits || [],
    wantedTraits: wantedTraits || [],
    socialHandles: socialHandles || [],
  });

  useEffect(() => {
    setHydrated(true);
    setEditedData({
      name: name || "",
      age: age || "",
      gender: gender || "",
      selectedTraits: selectedTraits || [],
      wantedTraits: wantedTraits || [],
      socialHandles: socialHandles || [],
    });
  }, [name, age, gender, selectedTraits, wantedTraits, socialHandles]);

  if (!hydrated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-zinc-100 animate-pulse" />
          <div className="h-8 w-48 bg-zinc-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setName(editedData.name);
    setAge(editedData.age);
    setGender(editedData.gender);
    setSelectedTraits(editedData.selectedTraits);
    setWantedTraits(editedData.wantedTraits);
    setSocialHandles(editedData.socialHandles);
    setIsEditing(false);
  };

  const removeTrait = (
    trait: (typeof selectedTraits)[0],
    type: "selected" | "wanted"
  ) => {
    if (type === "selected") {
      setEditedData((prev) => ({
        ...prev,
        selectedTraits: prev.selectedTraits.filter(
          (t) => t.label !== trait.label
        ),
      }));
    } else {
      setEditedData((prev) => ({
        ...prev,
        wantedTraits: prev.wantedTraits.filter((t) => t.label !== trait.label),
      }));
    }
  };

  const verifyHandle = (index: number) => {
    // redirect to https://socialkyc.io in new tab
    window.open("https://socialkyc.io", "_blank");
    const updatedHandles = [...editedData.socialHandles];
    updatedHandles[index] = {
      ...updatedHandles[index],
      isVerified: true,
    };
    setEditedData((prev) => ({ ...prev, socialHandles: updatedHandles }));
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Github className="w-4 h-4" />;
      case "Twitter":
        return <Twitter className="w-4 h-4" />;
      case "Instagram":
        return <Instagram className="w-4 h-4" />;
      case "Email":
        return <Mail className="w-4 h-4" />;
      case "Telegram":
        return <Send className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  const SocialHandlesSection = () => (
    <div className="space-y-6 bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Social Handles</h2>
        {isEditing && (
          <Badge variant="outline" className="text-xs">
            Edit Mode
          </Badge>
        )}
      </div>
      <div className="space-y-4">
        {(isEditing ? editedData.socialHandles : socialHandles).map(
          (handle, index) => (
            <div key={handle.platform} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                {getSocialIcon(handle.platform)}
              </div>
              <div className="flex-1">
                <label className="text-sm text-zinc-500">
                  {handle.platform}
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Enter your ${handle.platform.toLowerCase()}`}
                    value={handle.username}
                    onChange={(e) => {
                      const updatedHandles = [...editedData.socialHandles];
                      updatedHandles[index] = {
                        ...updatedHandles[index],
                        username: e.target.value,
                      };
                      setEditedData((prev) => ({
                        ...prev,
                        socialHandles: updatedHandles,
                      }));
                    }}
                    className="max-w-md"
                    disabled={!isEditing}
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
                      disabled={!handle.username || !isEditing}
                    >
                      Verify
                    </Button>
                  )}
                  {handle.username && !isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(handle.url + handle.username, "_blank")
                      }
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

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
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="max-w-[200px]"
                      placeholder="Your name"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">
                      {name || "Anonymous User"}
                    </h1>
                  )}
                  {/* ... Verified badge ... */}
                </div>
                <div className="text-zinc-500 space-x-2">
                  {isEditing ? (
                    <>
                      <Input
                        type="number"
                        value={editedData.age}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                        className="w-20 inline-block"
                        placeholder="Age"
                      />
                      <select
                        value={editedData.gender}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        className="ml-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Other">Other</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span>{age} years old</span>
                      <span>•</span>
                      <span>{gender}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Traits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selected Traits */}
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4">My Traits</h2>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedData.selectedTraits : selectedTraits).map(
                  (trait) => (
                    <Badge
                      key={trait.label}
                      variant="secondary"
                      className="text-sm group"
                    >
                      <span className="mr-1">{trait.emoji}</span>
                      {trait.label}
                      {isEditing && (
                        <button
                          onClick={() => removeTrait(trait, "selected")}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* Wanted Traits */}
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4">Looking For</h2>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedData.wantedTraits : wantedTraits).map(
                  (trait) => (
                    <Badge
                      key={trait.label}
                      variant="secondary"
                      className="text-sm group"
                    >
                      <span className="mr-1">{trait.emoji}</span>
                      {trait.label}
                      {isEditing && (
                        <button
                          onClick={() => removeTrait(trait, "wanted")}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Social Handles Section */}
          <SocialHandlesSection />

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-500 mb-1">Total Traits</h3>
              <p className="text-2xl font-bold">{selectedTraits.length}</p>
            </div>
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-500 mb-1">Looking For</h3>
              <p className="text-2xl font-bold">{wantedTraits.length}</p>
            </div>
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-500 mb-1">
                Verified Handles
              </h3>
              <p className="text-2xl font-bold">
                {socialHandles.filter((h) => h.isVerified).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
