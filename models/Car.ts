import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    color: { type: String },
    seats: { type: Number },
    engine: { type: String },
    description: { type: String },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// MongoDB model registration fix — prevents "Cannot overwrite model" error on Vercel
const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);
export default Car;
