import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { passkey } from "better-auth/plugins";
import { db } from "@/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [passkey()],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
