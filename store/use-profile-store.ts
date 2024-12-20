import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SocialHandle {
  platform: string;
  username: string;
  isVerified: boolean;
  icon?: React.ReactNode;
  url: string;
}

interface ProfileState {
  name: string;
  age: string;
  gender: string;
  selectedTraits: Array<{
    emoji: string;
    label: string;
    category: "creativity" | "interests" | "sports" | "personality";
  }>;
  wantedTraits: Array<{
    emoji: string;
    label: string;
    category: "creativity" | "interests" | "sports" | "personality";
  }>;
  socialHandles: SocialHandle[];
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setSelectedTraits: (traits: ProfileState["selectedTraits"]) => void;
  setWantedTraits: (traits: ProfileState["wantedTraits"]) => void;
  setSocialHandles: (handles: SocialHandle[]) => void;
  reset: () => void;
}

const initialState = {
  name: "",
  age: "",
  gender: "",
  selectedTraits: [],
  wantedTraits: [],
  socialHandles: [
    {
      platform: "Email",
      username: "hi@vbhv.xyz",
      isVerified: true,
      url: "mailto:",
    },
    {
      platform: "Twitter",
      username: "0xVaibhav11",
      isVerified: true,
      url: "https://twitter.com/",
    },
    {
      platform: "Telegram",
      username: "0xVaibhav11",
      isVerified: true,
      url: "https://t.me/",
    },
  ],
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...initialState,
      setName: (name) => set({ name }),
      setAge: (age) => set({ age }),
      setGender: (gender) => set({ gender }),
      setSelectedTraits: (selectedTraits) => set({ selectedTraits }),
      setWantedTraits: (wantedTraits) => set({ wantedTraits }),
      setSocialHandles: (socialHandles) => set({ socialHandles }),
      reset: () => set(initialState),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

if (typeof window !== "undefined") {
  useProfileStore.persist.rehydrate();
}
