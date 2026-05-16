import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email: "admin@autonova.com" });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    await Admin.create({
      email: "admin@autonova.com",
      password: "admin", // Using 'admin' as requested for temp user
      name: "AutoNova Admin",
    });

    return NextResponse.json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
  }
}
