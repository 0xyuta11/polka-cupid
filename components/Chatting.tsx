"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatNavBar from "@/components/ChatNavbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Types for our chat data
interface Message {
  id: number;
  sender: "me" | "other";
  text: string;
  timestamp: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
}

// Initial chats data
const INITIAL_CHATS: Chat[] = [
  {
    id: 1,
    name: "Emma Johnson",
    lastMessage: "Sure, meeting tomorrow.",
    messages: [
      {
        id: 1,
        sender: "other",
        text: "Hey, are you free to discuss the project?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Yes, what would you like to discuss?",
        timestamp: "10:35 AM",
      },
      {
        id: 3,
        sender: "other",
        text: "Sure, meeting tomorrow.",
        timestamp: "10:40 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    lastMessage: "The report is almost ready.",
    messages: [
      {
        id: 1,
        sender: "other",
        text: "I'm working on the quarterly report.",
        timestamp: "2:15 PM",
      },
      {
        id: 2,
        sender: "me",
        text: "Great, let me know when it's done.",
        timestamp: "2:20 PM",
      },
      {
        id: 3,
        sender: "other",
        text: "The report is almost ready.",
        timestamp: "2:25 PM",
      },
    ],
  },
];

// Dummy matches data (should match your matches page data)
const DUMMY_MATCHES = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 28,
    bio: "Software engineer who loves hiking and coffee",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    age: 32,
    bio: "Creative director with a passion for travel",
  },
  {
    id: 3,
    name: "Sophie Chen",
    age: 26,
    bio: "Data scientist and amateur photographer",
  },
];

interface ChatPageProps {
  matchId?: string;
}

export default function ChatPage({ matchId }: ChatPageProps) {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (matchId) {
      const matchIdNumber = Number(matchId);
      let currentChat = chats.find((chat) => chat.id === matchIdNumber);

      if (!currentChat) {
        const match = DUMMY_MATCHES.find((m) => m.id === matchIdNumber);

        if (match) {
          const newChat: Chat = {
            id: matchIdNumber,
            name: match.name,
            lastMessage: "No messages yet",
            messages: [],
          };

          setChats((prevChats) => {
            // Double check the chat doesn't already exist before adding
            if (!prevChats.some((chat) => chat.id === matchIdNumber)) {
              return [...prevChats, newChat];
            }
            return prevChats;
          });

          currentChat = newChat;
        }
      }

      if (currentChat) {
        setSelectedChat(currentChat);
      }
    } else if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [matchId]);

  const handleSendMessage = () => {
    if (!selectedChat || (!messageInput.trim() && !selectedFile)) return;

    const newMessage: Message = {
      id: selectedChat.messages.length + 1,
      sender: "me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              lastMessage: messageInput,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessageInput("");
    setSelectedFile(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    setMessageInput((prev) => prev + emojiObject.emoji);
  };

  if (!selectedChat) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen dark">
      <ChatNavBar />

      <main className="flex-1 flex bg-background">
        {/* Sidebar: Chat List */}
        <div className="w-80 border-r border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 flex items-center hover:bg-accent cursor-pointer ${
                selectedChat.id === chat.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-foreground">
                {chat.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{chat.name}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-foreground">
                {selectedChat.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{selectedChat.name}</span>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === "me"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-50 block text-right mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </DialogContent>
            </Dialog>

            <Input
              placeholder="Type a message..."
              className="flex-1"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!messageInput.trim() && !selectedFile}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
