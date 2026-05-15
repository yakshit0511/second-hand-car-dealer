import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalCars, totalEnquiries, featuredCars, newThisMonth] = await Promise.all([
      Car.countDocuments(),
      Contact.countDocuments(),
      Car.countDocuments({ isFeatured: true }),
      Car.countDocuments({ createdAt: { $gte: startOfMonth } }),
    ]);

    return NextResponse.json(
      { totalCars, totalEnquiries, featuredCars, newThisMonth },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
