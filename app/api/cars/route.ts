import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import mongoose from "mongoose";

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
    const ids = searchParams.get("ids");

    // Handle specific IDs (for Wishlist)
    if (ids) {
      const idArray = ids.split(",").filter(id => mongoose.Types.ObjectId.isValid(id.trim()));
      const cars = await Car.find({ _id: { $in: idArray } }).lean();
      return NextResponse.json(cars, { headers: { "Content-Type": "application/json" } });
    }

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

    const cars = await Car.find(query).sort({ createdAt: -1 }).lean();
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
    const newCar = await Car.create(body);
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
