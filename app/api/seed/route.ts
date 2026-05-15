import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

export const dynamic = "force-dynamic";

const dummyCars = [
  {
    make: "BMW",
    model: "M4 Competition",
    year: 2021,
    price: 65000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "3.0L",
    color: "Isle of Man Green",
    description: "Stunning M4 Competition in Isle of Man Green. Full carbon fiber package, laser lights, and executive package.",
    features: ["Carbon Fiber Seats", "Harman Kardon Sound", "Heated Steering Wheel", "Head-up Display"],
    images: ["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true
  },
  {
    make: "Tesla",
    model: "Model 3 Performance",
    year: 2022,
    price: 45000,
    mileage: 8000,
    fuelType: "Electric",
    transmission: "Automatic",
    engineSize: "Dual Motor",
    color: "Pearl White",
    description: "Lightning fast Model 3 Performance. Full Self-Driving capability included. Track mode enabled.",
    features: ["Autopilot", "Panoramic Roof", "Premium Audio", "20'' Überturbine Wheels"],
    images: ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true
  },
  {
    make: "Mercedes-Benz",
    model: "C63 AMG",
    year: 2020,
    price: 58000,
    mileage: 22000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "4.0L V8",
    color: "Obsidian Black",
    description: "The last of the V8s. Immaculate condition, full Mercedes service history, night package.",
    features: ["Performance Exhaust", "Burmester Surround", "Active Park Assist", "Nappa Leather"],
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"],
    isFeatured: true
  },
  {
    make: "Audi",
    model: "RS5 Sportback",
    year: 2021,
    price: 62000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.9L V6",
    color: "Nardo Gray",
    description: "Aggressive styling meets daily usability. RS Sport exhaust, ceramic brakes, and carbon fiber interior.",
    features: ["Virtual Cockpit", "Massage Seats", "Bang & Olufsen", "360 Camera"],
    images: ["https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  },
  {
    make: "Ford",
    model: "Mustang GT",
    year: 2023,
    price: 48000,
    mileage: 1500,
    fuelType: "Petrol",
    transmission: "Manual",
    engineSize: "5.0L V8",
    color: "Race Red",
    description: "Brand new Mustang GT with the 6-speed manual. Active exhaust and performance pack 1.",
    features: ["Brembo Brakes", "Line Lock", "Magneride Suspension", "Sync 4"],
    images: ["https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  },
  {
    make: "Porsche",
    model: "911 Carrera S",
    year: 2019,
    price: 115000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "PDK",
    engineSize: "3.0L",
    color: "GT Silver",
    description: "Timeless 911 in GT Silver. Sport Chrono package, PASM, and Bose sound system.",
    features: ["Sport Chrono", "Glass Sunroof", "Adaptive Sport Seats", "LED Matrix Headlights"],
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  },
  {
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2022,
    price: 85000,
    mileage: 5000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "3.0L",
    color: "Carpathian Grey",
    description: "Luxury meets capability. P400e Plug-in Hybrid with extended electric range.",
    features: ["Air Suspension", "Pixel LED Lights", "Meridian Sound", "Meridian Signature"],
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  },
  {
    make: "Toyota",
    model: "Supra MK5",
    year: 2021,
    price: 52000,
    mileage: 9000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "3.0L",
    color: "Renaissance Red",
    description: "The legend returns. A91 Edition with carbon fiber aero and unique wheels.",
    features: ["JBL Audio", "Active Differential", "Brembo Brakes", "Carbon Mirror Caps"],
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  },
  {
    make: "Honda",
    model: "Civic Type R",
    year: 2023,
    price: 46000,
    mileage: 500,
    fuelType: "Petrol",
    transmission: "Manual",
    engineSize: "2.0L Turbo",
    color: "Championship White",
    description: "The ultimate hot hatch. FL5 generation in classic Championship White.",
    features: ["Rev-Match System", "LogR Data Logger", "Limited Slip Diff", "Bucket Seats"],
    images: ["https://images.unsplash.com/photo-1594070319944-7c0c638f3f4d?auto=format&fit=crop&w=800&q=80"],
    isFeatured: false
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Wipe existing data to fix broken images and force refresh
    await Car.deleteMany({});
    
    // Insert new high-quality inventory
    await Car.insertMany(dummyCars);
    
    return NextResponse.json(
      { success: true, message: "Database force-refreshed with high-quality images" },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed database" }, 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
