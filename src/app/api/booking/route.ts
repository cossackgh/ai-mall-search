import { NextRequest, NextResponse } from "next/server";

type BookingRecord = {
  id: string;
  restaurant: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  createdAt: string;
};

// In-memory store (resets on server restart — fine for demo)
const bookings = new Map<string, BookingRecord>();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { restaurant, date, time, guests, name, phone } = body;

  if (!restaurant || !date || !time || !guests || !name || !phone) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const id = "GAL-" + Math.floor(1000 + Math.random() * 9000);
  const record: BookingRecord = {
    id,
    restaurant,
    date,
    time,
    guests: Number(guests),
    name: name.trim(),
    phone: phone.trim(),
    createdAt: new Date().toISOString(),
  };
  bookings.set(id, record);

  return NextResponse.json({ bookingId: id, ...record });
}
