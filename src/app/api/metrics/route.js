import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FinancialMetric from "@/lib/models/FinancialMetric"; // Updated model name

// GET handler: Retrieve all financial metrics from the database
export async function GET() {
  try {
    await connectToDatabase();
    const metrics = await FinancialMetric.find({});
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching financial metrics:", error);
    return NextResponse.json(
      { message: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}

// POST handler: Add a new financial metric
export async function POST(request) {
  try {
    const {
      revenue,
      expenses,
      profit,
      loss,
      cogs,
      grossMargin,
      netIncome,
      clv,
      cac,
      roi,
      churnRate,
      month,
      year,
    } = await request.json();

    await connectToDatabase();

    // Check if a metric for the same month and year already exists
    const existingMetric = await FinancialMetric.findOne({ month, year });

    if (existingMetric) {
      return NextResponse.json(
        { message: "A metric for this month and year already exists." },
        { status: 400 }
      );
    }

    const newMetric = await FinancialMetric.create({
      revenue,
      expenses,
      profit,
      loss,
      cogs,
      grossMargin,
      netIncome,
      clv,
      cac,
      roi,
      churnRate,
      month,
      year,
    });

    return NextResponse.json(newMetric);
  } catch (error) {
    console.error("Error creating financial metric:", error);
    return NextResponse.json(
      { message: "Failed to create metric" },
      { status: 500 }
    );
  }
}
