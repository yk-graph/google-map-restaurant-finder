import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const lat = request.nextUrl.searchParams.get("lat");
    const lng = request.nextUrl.searchParams.get("lng");
    const radius = request.nextUrl.searchParams.get("radius");

    const res = await fetch(
      `${BASE_URL}/nearbysearch/json?keyword=${category}&type=restaurant&location=${lat},${lng}&radius=${radius}&language=ja&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("サーバーエラーが発生しました", { status: 500 });
  }
}
