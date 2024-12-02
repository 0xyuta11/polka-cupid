"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Trait {
  emoji: string;
  label: string;
  category: "creativity" | "interests" | "sports" | "personality";
}

interface UserData {
  age: string;
  gender: string;
  selectedTraits: Trait[];
  wantedTraits: Trait[];
}

const creativityTraits: Trait[] = [
  { emoji: "🎨", label: "Art", category: "creativity" },
  { emoji: "📸", label: "Photography", category: "creativity" },
  { emoji: "💃", label: "Dance", category: "creativity" },
  { emoji: "🎵", label: "Music", category: "creativity" },
  { emoji: "⭐", label: "Puzzles", category: "creativity" },
];

const interestTraits: Trait[] = [
  { emoji: "👨‍💻", label: "Hackathons", category: "interests" },
  { emoji: "🎬", label: "Movies", category: "interests" },
  { emoji: "⛓️", label: "Blockchain", category: "interests" },
];

const sportsTraits: Trait[] = [
  { emoji: "🏀", label: "Basketball", category: "sports" },
  { emoji: "⚽", label: "Football", category: "sports" },
  { emoji: "🏏", label: "Cricket", category: "sports" },
  { emoji: "♟️", label: "Chess", category: "sports" },
  { emoji: "🔴", label: "Carrom", category: "sports" },
];

const personalityTraits: Trait[] = [
  { emoji: "🥺", label: "Weeb", category: "personality" },
  { emoji: "🎮", label: "Gamer", category: "personality" },
  { emoji: "😋", label: "Foodie", category: "personality" },
  { emoji: "🌍", label: "Traveler", category: "personality" },
  { emoji: "📚", label: "Bookworm", category: "personality" },
  { emoji: "😄", label: "Humourous", category: "personality" },
  { emoji: "🏳️‍🌈", label: "LGBTQ+", category: "personality" },
];

export default function SelectTraitsPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [userData, setUserData] = useState<UserData>({
    age: "23",
    gender: "Female",
    selectedTraits: [],
    wantedTraits: [],
  });
  const [newTrait, setNewTrait] = useState<Trait>({
    emoji: "😊",
    label: "",
    category: "creativity",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("what-you-are");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      {
        y: 0,
        opacity: 1,
      }
    );
  }, []);

  const toggleTrait = (trait: Trait) => {
    setUserData((prev) => {
      const traitList =
        activeTab === "what-you-are" ? "selectedTraits" : "wantedTraits";
      const isSelected = prev[traitList].some((t) => t.label === trait.label);

      if (isSelected) {
        return {
          ...prev,
          [traitList]: prev[traitList].filter((t) => t.label !== trait.label),
        };
      } else {
        return {
          ...prev,
          [traitList]: [...prev[traitList], trait],
        };
      }
    });
  };

  const TraitButton = ({ emoji, label, category }: Trait) => {
    const buttonRef = useRef(null);
    const traitList =
      activeTab === "what-you-are" ? "selectedTraits" : "wantedTraits";
    const isSelected = userData[traitList].some((t) => t.label === label);

    const handleClick = () => {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
      toggleTrait({ emoji, label, category });
    };

    return (
      <Button
        ref={buttonRef}
        variant={isSelected ? "default" : "outline"}
        className={`rounded-full transition-all ${
          isSelected
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        onClick={handleClick}
      >
        <span className="mr-2">{emoji}</span>
        {label}
      </Button>
    );
  };

  const handleSubmit = async () => {
    router.push("/dashboard");
    // try {
    //   const response = await fetch("/api/traits", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save traits");
    //   }

    //   console.log("Traits saved successfully!");
    // } catch (error) {
    //   console.error("Error saving traits:", error);
    // }
  };

  const addCustomTrait = () => {
    if (newTrait.label.trim()) {
      setUserData((prev) => ({
        ...prev,
        selectedTraits: [...prev.selectedTraits, newTrait],
      }));
      setNewTrait({
        emoji: "😊",
        label: "",
        category: "creativity",
      });
      setIsDialogOpen(false);
    }
  };

  const AddTraitDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border-dashed border-2"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Custom Trait
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Trait</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <label className="text-sm text-zinc-500">Emoji</label>
            <Input
              value={newTrait.emoji}
              onChange={(e) =>
                setNewTrait((prev) => ({ ...prev, emoji: e.target.value }))
              }
              placeholder="Choose an emoji"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500">Label</label>
            <Input
              value={newTrait.label}
              onChange={(e) =>
                setNewTrait((prev) => ({ ...prev, label: e.target.value }))
              }
              placeholder="Enter trait name"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-500">Category</label>
            <select
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2"
              value={newTrait.category}
              onChange={(e) =>
                setNewTrait((prev) => ({
                  ...prev,
                  category: e.target.value as Trait["category"],
                }))
              }
            >
              <option value="creativity">Creativity</option>
              <option value="interests">Interests</option>
              <option value="sports">Sports</option>
              <option value="personality">Personality</option>
            </select>
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={addCustomTrait}
          >
            Add Trait
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const TraitSection = ({
    title,
    traits,
    category,
  }: {
    title: string;
    traits: Trait[];
    category: Trait["category"];
  }) => (
    <div>
      <label className="text-sm text-zinc-500">{title}</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {traits.map((trait) => (
          <TraitButton key={trait.label} {...trait} />
        ))}
        {/* Add custom traits that match this category */}
        {userData.selectedTraits
          .filter(
            (trait) =>
              trait.category === category &&
              !traits.some((t) => t.label === trait.label)
          )
          .map((trait) => (
            <TraitButton key={trait.label} {...trait} />
          ))}
        {category === "creativity" && <AddTraitDialog />}
      </div>
    </div>
  );

  return (
    <ScrollArea className="h-screen w-screen flex items-center justify-center">
      <div className="h-screen max-w-5xl bg-white dark:bg-black p-4 md:p-8 flex items-start justify-center mx-auto">
        <div ref={containerRef} className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">
              Everyone is <span className="text-purple-600">Unique</span>, so
              are you!
            </h1>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="what-you-are">What you are</TabsTrigger>
              <TabsTrigger value="what-you-want">What you want</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {activeTab === "what-you-are" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-500">Age:</label>
                  <Input
                    type="number"
                    value={userData.age}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, age: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-500">Gender:</label>
                  <select
                    className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <TraitSection
                title="Creativity"
                traits={creativityTraits}
                category="creativity"
              />
              <TraitSection
                title="Interests"
                traits={interestTraits}
                category="interests"
              />
              <TraitSection
                title="Sports"
                traits={sportsTraits}
                category="sports"
              />
              <TraitSection
                title="Personality"
                traits={personalityTraits}
                category="personality"
              />
            </div>
          </div>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleSubmit}
          >
            Next
          </Button>

          <div className="text-sm text-zinc-500 text-center">
            {activeTab === "what-you-are"
              ? `Selected traits: ${userData.selectedTraits.length}`
              : `Wanted traits: ${userData.wantedTraits.length}`}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
