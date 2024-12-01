"use client";

import InfoDialog from "@/components/infodialog";
import SignInForm from "@/components/SignInform";
import SignUpForm from "@/components/SignUpform";
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

              <SignInForm />

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

              <SignUpForm />

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
      <div className="fixed bottom-4 right-4">
        <InfoDialog
          message="Skip this page"
          link="/onboarding"
          linkText="Onboarding"
        />
      </div>
    </main>
  );
}
