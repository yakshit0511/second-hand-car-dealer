import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const fuelType = searchParams.get("fuelType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (make) {
      query.make = make;
    }

    if (fuelType) {
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
        { model: { $regex: search, $options: "i" } }
      ];
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { make, model, year, price, mileage, fuelType, transmission } = body;

    if (!make || !model || !year || !price || !mileage || !fuelType || !transmission) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const newCar = new Car({
      make,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      fuelType,
      transmission,
      color: body.color,
      seats: body.seats ? Number(body.seats) : undefined,
      engine: body.engine,
      description: body.description,
      images: body.images || [],
      isFeatured: body.isFeatured || false,
    });

    await newCar.save();
    return NextResponse.json({ success: true, car: newCar }, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}
