import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    let formDataforDB: { id: string; value: string }[] = [];
    for (const key in data) {
      formDataforDB.push({ id: key, value: data[key] });
    }
    const supabase = createServerActionClient({ cookies });
    const result = await supabase.from("settings").upsert(formDataforDB);
    console.log(result);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to process request", {
      status: 500,
    });
  }
}
