import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

const dummyCars = [
  {
    make: "BMW",
    model: "3 Series",
    year: 2021,
    price: 24500,
    mileage: 32000,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Black",
    seats: 5,
    engine: "2.0L Turbo",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"]
  },
  {
    make: "Mercedes",
    model: "C-Class",
    year: 2020,
    price: 27900,
    mileage: 28000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Silver",
    seats: 5,
    engine: "2.0L Diesel",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800", "https://images.unsplash.com/photo-1563720223809-b2a83f2c0de2?w=800"]
  },
  {
    make: "Audi",
    model: "A4",
    year: 2019,
    price: 21000,
    mileage: 45000,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "White",
    seats: 5,
    engine: "2.0L TFSI",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800", "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600"]
  },
  {
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 18500,
    mileage: 15000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    color: "Blue",
    seats: 5,
    engine: "2.5L Hybrid",
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"]
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2018,
    price: 22000,
    mileage: 55000,
    fuelType: "Petrol",
    transmission: "Manual",
    color: "Red",
    seats: 4,
    engine: "5.0L V8",
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800", "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"]
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    price: 31000,
    mileage: 20000,
    fuelType: "Electric",
    transmission: "Automatic",
    color: "White",
    seats: 5,
    engine: "Electric Motor",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800", "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800"]
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 14500,
    mileage: 38000,
    fuelType: "Petrol",
    transmission: "Automatic",
    color: "Grey",
    seats: 5,
    engine: "1.5L Turbo",
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"]
  },
  {
    make: "Volkswagen",
    model: "Golf",
    year: 2019,
    price: 13900,
    mileage: 42000,
    fuelType: "Diesel",
    transmission: "Manual",
    color: "Blue",
    seats: 5,
    engine: "2.0L TDI",
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800", "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"]
  },
  {
    make: "Hyundai",
    model: "Tucson",
    year: 2022,
    price: 19800,
    mileage: 12000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    color: "Black",
    seats: 5,
    engine: "1.6L Hybrid",
    isFeatured: false,
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800", "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800"]
  }
];

export async function GET() {
  try {
    await connectDB();
    
    const count = await Car.countDocuments();
    if (count === 0) {
      await Car.insertMany(dummyCars);
      return NextResponse.json({ success: true, message: "9 cars seeded successfully" });
    }
    
    return NextResponse.json({ success: true, message: "Database already seeded" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 });
  }
}
