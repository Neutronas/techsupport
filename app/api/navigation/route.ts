import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data);
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase
      .from("navigation")
      .update({ title: data.title, href: data.href })
      .eq("id", data.id);
    if (error) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to process request", {
      status: 500,
    });
  }
}
