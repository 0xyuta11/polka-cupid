"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MessageCircle, Bell, User } from "lucide-react";

export default function NavBar() {
    const router = useRouter();
    return (
      <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-newKansasMedium">Dashboard</h1>
  
            <div className="flex items-center gap-2">
              {/* Messages Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  /* Handle messages click */
                }}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
  
              {/* Notifications Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  /* Handle notifications click */
                }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  5
                </span>
              </Button>
  
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
                      /* Handle profile click */
                    }}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      /* Handle settings click */
                    }}
                  >
                    Settings
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