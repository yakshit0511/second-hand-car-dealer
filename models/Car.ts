import mongoose, { Schema, Model } from "mongoose";
import { ICar as ICarType } from "@/types/car";

type CarDoc = Omit<ICarType, '_id' | 'createdAt'> & {
  createdAt: Date;
};

const CarSchema: Schema<CarDoc> = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuelType: { 
    type: String, 
    enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
    required: true 
  },
  transmission: { 
    type: String, 
    enum: ["Automatic", "Manual"],
    required: true 
  },
  color: { type: String },
  description: { type: String },
  images: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  seats: { type: Number },
  engine: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Car: Model<CarDoc> = mongoose.models.Car || mongoose.model<CarDoc>("Car", CarSchema);

export default Car;

