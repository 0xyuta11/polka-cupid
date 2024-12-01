"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function App() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-newKansasMedium">Dashboard</h1>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hover:bg-accent"
            >
              Home
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-newKansasMedium">Hello from dashboard</h1>
      </main>
    </div>
  );
}
