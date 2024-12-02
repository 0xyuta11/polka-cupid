import { AtSign, Lock } from "lucide-react";
import InputWithIcon from "./input";
import { createAuthClient } from "better-auth/react";
import { useState } from "react";

export default function SignInForm() {
  const client = createAuthClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await client.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Sign in failed");
        return;
      }

      setSuccess(
        "Successfully signed up! Please check your email to verify your account."
      );
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="space-y-2">
        <InputWithIcon
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
          type="email"
        />
      </div>

      <div className="space-y-2">
        <InputWithIcon
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={16} strokeWidth={2} aria-hidden="true" />}
          type="password"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {success && <p className="text-sm text-green-500">{success}</p>}

      <button
        type="button"
        disabled={loading}
        onClick={handleSignIn}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </>
  );
}
