import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid Car ID" }, { status: 400 });
    }

    const currentCar = await Car.findById(params.id);
    
    if (!currentCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Find similar cars (same make), excluding the current car
    let similarCars = await Car.find({
      _id: { $ne: params.id },
      make: currentCar.make
    }).limit(3);

    // If less than 3, fill with random other cars
    if (similarCars.length < 3) {
      const needed = 3 - similarCars.length;
      const similarIds = similarCars.map(c => c._id);
      const additionalCars = await Car.find({
        _id: { $nin: [params.id, ...similarIds] }
      }).limit(needed);
      
      similarCars = [...similarCars, ...additionalCars];
    }

    return NextResponse.json(similarCars);
  } catch (error) {
    console.error("Error fetching similar cars:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
