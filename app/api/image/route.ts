import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");

    if (contentType?.startsWith("multipart/form-data")) {
      const formData = await request.formData();
      const imageFile = formData.get("image") as File;
      if (imageFile) {
        const supabase = createServerActionClient({ cookies });
        // Process the image file as needed
        // For example, you could save it to a database or perform image analysis
        // var crypto = require("crypto");
        var randomFileName = `${crypto
          .randomBytes(20)
          .toString("hex")}.${imageFile.name.split(".").pop()}`;

        const imageUploadStatus = await supabase.storage
          .from("images")
          .upload(`/${randomFileName}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
        return NextResponse.json(
          {
            url: `${
              supabase.storage.from("images").getPublicUrl("").data.publicUrl
            }${randomFileName}`,
          },
          { status: 200 }
        );
      }
    }

    return new Response("No image found in the request", {
      status: 400,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to process image", {
      status: 500,
    });
  }
}
