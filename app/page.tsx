import Image from "next/image";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  distance: string;
}

// Mock data - in a real app this would come from an API
const mockProfiles: Profile[] = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    bio: "Adventure seeker and coffee enthusiast. Let's explore the city together!",
    imageUrl: "https://placekitten.com/400/600", // Placeholder image
    distance: "2 miles away",
  },
  // Add more mock profiles as needed
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-50 to-rose-100 p-4">
      {/* Top Navigation */}
      <nav className="w-full max-w-md flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-6">
        <button className="text-gray-600 hover:text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-rose-500">DateMe</h1>
        <button className="text-gray-600 hover:text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </nav>

      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src={mockProfiles[0].imageUrl}
            alt={mockProfiles[0].name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h2 className="text-2xl font-bold">
              {mockProfiles[0].name}, {mockProfiles[0].age}
            </h2>
            <p className="text-sm">{mockProfiles[0].distance}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-700">{mockProfiles[0].bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 p-4 border-t border-gray-100">
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:border-red-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:border-green-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
