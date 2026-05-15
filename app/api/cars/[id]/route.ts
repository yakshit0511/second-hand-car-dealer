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
      return NextResponse.json(
        { error: "Invalid Car ID" }, 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const car = await Car.findById(params.id);
    
    if (!car) {
      return NextResponse.json(
        { error: "Car not found" }, 
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(car, { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid Car ID" }, 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const updatedCar = await Car.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedCar) {
      return NextResponse.json(
        { error: "Car not found" }, 
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(updatedCar, { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid Car ID" }, 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deleted = await Car.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Car not found" }, 
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return NextResponse.json(
      { success: true }, 
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

