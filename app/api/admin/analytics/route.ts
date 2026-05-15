import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";
import Contact from "@/models/Contact";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // 1. Enquiries Over Time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enquiriesByDate = await Contact.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", count: 1, _id: 0 } }
    ]);

    // 2. Cars by Fuel Type
    const fuelTypeData = await Car.aggregate([
      { $group: { _id: "$fuelType", value: { $sum: 1 } } },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 3. Cars by Make
    const makeData = await Car.aggregate([
      { $group: { _id: "$make", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { name: "$_id", count: 1, _id: 0 } }
    ]);

    // 4. Cars by Price Range
    const priceRangeData = await Car.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 15000, 20000, 25000, 30000, 1000000],
          default: "Other",
          output: {
            count: { $sum: 1 }
          }
        }
      },
      {
        $project: {
          range: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "Under $15k" },
                { case: { $eq: ["$_id", 15000] }, then: "$15k-$20k" },
                { case: { $eq: ["$_id", 20000] }, then: "$20k-$25k" },
                { case: { $eq: ["$_id", 25000] }, then: "$25k-$30k" },
                { case: { $eq: ["$_id", 30000] }, then: "Over $30k" }
              ],
              default: "Other"
            }
          },
          count: 1,
          _id: 0
        }
      }
    ]);

    // 5. Most Viewed (Mock data based on existing cars)
    const cars = await Car.find().limit(5).lean();
    const mostViewed = cars.map(car => ({
      name: `${car.make} ${car.model}`,
      views: Math.floor(Math.random() * (2000 - 150 + 1)) + 150,
      image: car.images[0]
    })).sort((a, b) => b.views - a.views);

    return NextResponse.json({
      enquiriesByDate,
      fuelTypeData,
      makeData,
      priceRangeData,
      mostViewed
    }, { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
