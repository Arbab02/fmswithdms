import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Deal from "@/lib/models/Deal"; // Updated model name

// GET handler: Retrieve all deals from the database
export async function GET() {
  try {
    await connectToDatabase();
    const deals = await Deal.find({});
    return NextResponse.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { message: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}

// POST handler: Add a new deal
export async function POST(request) {
  try {
    const {
      name,
      industry,
      businessType,
      amount,
      title,
      description,
      website,
      email,
      phone,
      address,
      business,
      status,
      startDate,
      endDate,
      month,
      year,
    } = await request.json();

    await connectToDatabase();

    // Check if a deal with the same name and business already exists
    const existingDeal = await Deal.findOne({ name, business });

    if (existingDeal) {
      return NextResponse.json(
        { message: "A deal with this name and business already exists." },
        { status: 400 }
      );
    }

    const newDeal = await Deal.create({
      name,
      industry,
      businessType,
      amount,
      title,
      description,
      website,
      email,
      phone,
      address,
      business,
      status,
      startDate,
      endDate,
      month,
      year,
    });

    return NextResponse.json(newDeal);
  } catch (error) {
    console.error("Error creating deal:", error);
    return NextResponse.json(
      { message: "Failed to create deal" },
      { status: 500 }
    );
  }
}
