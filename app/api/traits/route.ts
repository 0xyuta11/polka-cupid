import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save to database (implement according to your schema)
    // Example:
    // await db.insert(traits).values({
    //   userId: 'user_id',
    //   age: data.age,
    //   gender: data.gender,
    //   traits: JSON.stringify(data.selectedTraits)
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving traits:', error);
    return NextResponse.json(
      { error: 'Failed to save traits' },
      { status: 500 }
    );
  }
} 