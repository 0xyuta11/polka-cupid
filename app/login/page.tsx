"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          {!showSignUp ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-newKansasMedium text-center text-foreground">
                Welcome Back
              </h1>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-newKansasRegular text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-newKansasRegular text-foreground"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium"
                >
                  Sign In
                </button>
              </form>

              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-3xl font-newKansasMedium text-center text-foreground">
                Create Account
              </h1>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-newKansasRegular text-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="text-sm font-newKansasRegular text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className="text-sm font-newKansasRegular text-foreground"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Create a password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
