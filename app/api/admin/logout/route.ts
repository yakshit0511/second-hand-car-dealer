import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("admin_session");
  return NextResponse.json({ message: "Logged out" });
}
