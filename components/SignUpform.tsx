import InputWithIcon from "./input";

import { AtSign, User } from "lucide-react";
import PasswordInput from "./passwordinput";

import { createAuthClient } from "better-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUpForm() {
  const client = createAuthClient({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await client.signUp.email({
        email,
        password,
        name,
      });

      if (signUpError) {
        setError(signUpError.message || "Sign up failed");
        return;
      }

      router.push("/onboarding");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <InputWithIcon
          label="Full Name"
          icon={<User size={16} strokeWidth={2} aria-hidden="true" />}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <InputWithIcon
          label="Email"
          icon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <PasswordInput
          required
          password={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {success && <p className="text-sm text-green-500">{success}</p>}

      <button
        type="button"
        disabled={loading}
        onClick={handleSignUp}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
}
