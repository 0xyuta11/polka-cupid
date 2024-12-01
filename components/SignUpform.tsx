import InputWithIcon from "./input";

import { AtSign, User } from "lucide-react";
import PasswordInput from "./passwordinput";

export default function SignUpForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <InputWithIcon
          label="Full Name"
          icon={<User size={16} strokeWidth={2} aria-hidden="true" />}
          type="text"
        />
      </div>

      <div className="space-y-2">
        <InputWithIcon
          label="Email"
          icon={<AtSign size={16} strokeWidth={2} aria-hidden="true" />}
          type="email"
        />
      </div>

      <div className="space-y-2">
        <PasswordInput />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-newKansasMedium"
      >
        Sign Up
      </button>
    </form>
  );
}
