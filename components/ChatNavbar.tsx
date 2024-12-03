"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MessageCircle, Bell, User, Heart } from "lucide-react";
import NotificationsDropdown from "@/components/NotificationDropdown";
export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
        <h1 
            className="text-xl font-newKansasMedium cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => {
              router.push('/dashboard')
            }}
          >
            DOTBuddies
          </h1>
          
        
          <div className="flex items-center gap-2">
          <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                router.push('/matches')
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>
            {/* Messages Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                router.push('/chat/1')
              }}
            >
              <MessageCircle className="h-5 w-5" />
              
            </Button>

            {/* Notifications Button */}
            
            <NotificationsDropdown />
            

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-border"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/")}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
