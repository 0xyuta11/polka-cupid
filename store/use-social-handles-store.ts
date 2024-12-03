import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SocialHandle {
  platform: string;
  username: string;
  isVerified: boolean;
  url: string;
}

interface SocialHandlesState {
  handles: SocialHandle[];
  setHandles: (handles: SocialHandle[]) => void;
}

const initialHandles = [
  {
    platform: "Email",
    username: "hi@naksh.xyz",
    isVerified: true,
    url: "mailto:",
  },
  {
    platform: "Twitter",
    username: "0xNaksh11",
    isVerified: false,
    url: "https://twitter.com/",
  },
  {
    platform: "Telegram",
    username: "0xNaksh11",
    isVerified: true,
    url: "https://t.me/",
  },
];

export const useSocialHandlesStore = create<SocialHandlesState>()(
  persist(
    (set) => ({
      handles: initialHandles,
      setHandles: (handles) => set({ handles }),
    }),
    {
      name: "social-handles-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
