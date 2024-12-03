"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Dummy matches data (replace with your actual data source)
const DUMMY_MATCHES = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 28,
    bio: "Software engineer who loves hiking and coffee",
    profilePic: null, // You can add profile picture logic later
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    age: 32,
    bio: "Creative director with a passion for travel",
    profilePic: null,
  },
  {
    id: 3,
    name: "Sophie Chen",
    age: 26,
    bio: "Data scientist and amateur photographer",
    profilePic: null,
  }
];

export default function MatchesPage() {
  const router = useRouter();
  const [matches] = useState(DUMMY_MATCHES);

  const handleChatWithMatch = (matchId: number) => {
    router.push(`/chat/${matchId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 dark">
      <h1 className="text-2xl font-semibold mb-6">Your Matches</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <div 
            key={match.id} 
            className="bg-secondary rounded-lg p-6 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-foreground text-3xl">
              {match.name.charAt(0).toUpperCase()}
            </div>
            
            <h2 className="text-xl font-medium">{match.name}, {match.age}</h2>
            <p className="text-muted-foreground mb-4">{match.bio}</p>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => handleChatWithMatch(match.id)}
                className="w-full"
              >
                Start Chat
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}