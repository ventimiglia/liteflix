import { NextResponse } from "next/server";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export async function GET() {
  const { resources } = await cloudinary.v2.api.resources();

  return NextResponse.json(resources);
}

export async function POST(request: Request) {
  try {
    const body = await request.formData();

    body.append("upload_preset", `${process.env.CLOUD_UPLOAD_PRESET}`);
    body.append("folder", "movies");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: body,
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (e: any) {
    console.error(e.message);
    return "";
  }
}
