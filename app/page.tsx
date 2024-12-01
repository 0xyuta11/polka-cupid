"use client";
import { SplineViewer } from "@/components/Threed";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { motion } from "motion/react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  useGSAP(() => {
    if (isLoaded) {
      // Animate out loader
      gsap.fromTo(
        ".loader",
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(".loader", { display: "none" });
          },
        }
      );

      // Animate in hero title
      gsap.fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }
  }, [isLoaded]);

  return (
    <ScrollArea className="h-screen">
      <div className="loader absolute top-0 left-0 w-full h-full bg-background z-20 flex items-center justify-center">
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <main className="relative min-h-screen w-full flex flex-col items-center justify-between bg-background font-newKansasLight overflow-hidden">
        <header className="absolute inset-0 w-full h-full">
          <div className="h-full w-full relative">
            <SplineViewer
              eventsTarget="global"
              onSplineLoad={() => {
                setTimeout(() => setIsLoaded(true), 500);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[5]"></div>
          </div>
        </header>
        <div className="absolute flex flex-col items-center justify-center gap-8 z-10 bottom-24">
          <h1 className="hero-title mb-24 relative text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight px-4 font-displayRegular text-foreground">
            Polka Buddies
          </h1>
          <RainbowButton onClick={() => router.push("/login")}>
            Let&#39;s connect with friends
          </RainbowButton>
        </div>
      </main>
      {isLoaded && (
        <section className="max-w-screen-xl mx-auto min-h-screen bg-black relative">
          <div className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-card p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-newKansasMedium text-foreground mb-4">
                  Find Your People
                </h3>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals who share your interests,
                  hobbies and passions. Our matching algorithm helps you find
                  your perfect friend match.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-card p-8 rounded-lg shadow-lg md:row-span-2"
              >
                <h3 className="text-2xl font-newKansasMedium text-foreground mb-4">
                  Safe & Secure
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your safety is our top priority. All users are verified and
                  our platform includes robust reporting and blocking features.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <span className="text-foreground">ID Verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <span className="text-foreground">24/7 Monitoring</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-card p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-newKansasMedium text-foreground mb-4">
                  Group Activities
                </h3>
                <p className="text-muted-foreground">
                  Join virtual and local meetups, game nights, book clubs and
                  more. Making friends is more fun in groups!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-card p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-newKansasMedium text-foreground mb-4">
                  Chat & Connect
                </h3>
                <p className="text-muted-foreground">
                  Start conversations through text, voice, or video chat.
                  Express yourself with GIFs, stickers and emoji reactions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-card p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-newKansasMedium text-foreground mb-4">
                  Interest Matching
                </h3>
                <p className="text-muted-foreground">
                  From gaming to gardening, find friends who love what you love.
                  Connect through shared interests and activities.
                </p>
              </motion.div>
            </div>
          </div>
          <footer className="w-full bg-black">
            <div className="container mx-auto px-4 py-8">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Polka Buddies. All rights
                reserved.
              </p>
            </div>
          </footer>
        </section>
      )}
    </ScrollArea>
  );
}
