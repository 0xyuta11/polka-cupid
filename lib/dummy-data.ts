// Types
export interface Profile {
    id: number;
    name: string;
    age: number;
    image: string;
    bio: string;
    profession: string;
    skills: string[];
    twitterVerified?: boolean;  
    telegramVerified?: boolean; 
  }

  //use these images
//   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"

export const DUMMY_PROFILES: Profile[] = [
  {
    id: 1,
      name: "Sarah",
      age: 25,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
      bio: "Adventure seeker and coffee enthusiast. Love hiking and photography.",
      profession: "UX Designer",
      skills: ["Design", "Figma", "User Research", "Prototyping"],
      twitterVerified: true,
    telegramVerified: true,
  },
  {
    id: 2,
    name: "John",
    age: 30,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Tech enthusiast and avid reader. Loves to code and learn new things.",
    profession: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    twitterVerified: true,
    telegramVerified: true,
  },
  {
    id: 3,
    name: "Emily",
    age: 28,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Travel lover and foodie. Always looking for the next adventure.",
    profession: "Marketing Manager",
    skills: ["Marketing", "Content Creation", "SEO", "Social Media"],
    twitterVerified: true,
    telegramVerified: true,
  },
  {
    id: 4,
    name: "Michael",
    age: 35,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Foodie and fitness enthusiast. Loves to cook and workout.",
    profession: "Chef",
    skills: ["Cooking", "Fitness", "Nutrition", "Healthy Eating"],
    twitterVerified: true,
    telegramVerified: true,
  },
  {
    id: 5,
    name: "Olivia",
    age: 29,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Art lover and nature enthusiast. Always looking for inspiration.",
    profession: "Artist",
    skills: ["Painting", "Drawing", "Art History", "Creative Writing"],
    twitterVerified: true,
    telegramVerified: true,
  },
];