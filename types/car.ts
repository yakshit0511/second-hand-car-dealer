export interface ICar {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Automatic' | 'Manual';
  color?: string;
  description?: string;
  images: string[];
  isFeatured: boolean;
  seats?: number;
  engine?: string;
  createdAt: string;
}
