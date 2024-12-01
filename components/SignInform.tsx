import { AtSign, Lock } from "lucide-react";
import EmailInput from "./input";
import PasswordInput from "./passwordinput";
import InputWithIcon from "./input";

export default function SignInForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <InputWithIcon
          label="Email"
          icon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
          type="email"
        />
      </div>

      <div className="space-y-2">
        <InputWithIcon
          label="Password"
          icon={<Lock size={16} strokeWidth={2} aria-hidden="true" />}
          type="password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium"
      >
        Sign In
      </button>
    </form>
  );
}
