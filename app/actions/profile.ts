// app/actions/profile.ts
"use server";

import { db } from "@/db";
import { user, account } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface SocialAccount {
  platform: string;
  username: string;
  isVerified: boolean;
}

export async function updateProfile(
  userId: string,
  name: string,
  socialHandles: SocialAccount[]
) {
  if (!userId || !name) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    // Update user name
    await db
      .update(user)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    // Update or create social accounts
    for (const handle of socialHandles) {
      if (!handle.username) continue; // Skip empty handles

      const existingAccount = await db
        .select()
        .from(account)
        .where(
          and(
            eq(account.userId, userId),
            eq(account.providerId, handle.platform.toLowerCase())
          )
        );

      if (existingAccount.length > 0) {
        await db
          .update(account)
          .set({
            accountId: handle.username,
            accessToken: handle.isVerified ? "verified" : null,
            updatedAt: new Date(),
          })
          .where(eq(account.id, existingAccount[0].id));
      } else {
        await db.insert(account).values({
          id: crypto.randomUUID(),
          userId,
          providerId: handle.platform.toLowerCase(),
          accountId: handle.username,
          accessToken: handle.isVerified ? "verified" : null,
          createdAt: new Date(),
          updatedAt: new Date(),
          // Set default values for required fields
          password: null,
          refreshToken: null,
          idToken: null,
          scope: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
        });
      }
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function getProfile(userId: string) {
  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  try {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, userId));

    if (!userData.length) {
      return { success: false, error: "User not found" };
    }

    const socialAccounts = await db
      .select({
        id: account.id,
        providerId: account.providerId,
        accountId: account.accountId,
        accessToken: account.accessToken,
      })
      .from(account)
      .where(eq(account.userId, userId));

    const socialHandles = socialAccounts.map((account) => ({
      platform: account.providerId,
      username: account.accountId || "",
      isVerified: Boolean(account.accessToken),
    }));

    return {
      success: true,
      data: {
        user: userData[0],
        socialHandles,
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}