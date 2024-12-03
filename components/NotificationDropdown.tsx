"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, X } from "lucide-react";

// Dummy notifications data
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    type: "message",
    title: "New Message",
    description: "Emma sent you a message",
    timestamp: "5 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "match",
    title: "New Match",
    description: "You have a new potential match",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "profile",
    title: "Profile Update",
    description: "Your profile was viewed 10 times today",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "like",
    title: "Profile Like",
    description: "Someone liked your profile",
    timestamp: "Yesterday",
    read: true,
  },
];

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const handleClearNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          >
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        
        {notifications.map(notification => (
          <DropdownMenuItem 
            key={notification.id} 
            className={`flex items-start p-3 ${
              !notification.read ? 'bg-accent/50' : ''
            }`}
          >
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-sm">{notification.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {notification.description}
              </p>
            </div>
            <div className="flex ml-2">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsRead(notification.id);
                  }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearNotification(notification.id);
                }}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </DropdownMenuItem>
        ))}

        {notifications.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}