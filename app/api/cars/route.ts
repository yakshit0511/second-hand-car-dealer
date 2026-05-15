import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const make = searchParams.get("make");
    const fuelType = searchParams.get("fuelType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    const query: any = {};
    
    // Add featured filter
    if (featured === "true") {
      query.isFeatured = true;
    }

    if (make && make !== "All") {
      query.make = make;
    }
    
    if (fuelType && fuelType !== "All") {
      query.fuelType = fuelType;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { make: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    return NextResponse.json(cars, { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    return NextResponse.json(newCar, { 
      status: 201, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
