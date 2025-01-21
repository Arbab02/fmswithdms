import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import FinancialMetric from '@/lib/models/FinancialMetric'; // Updated model name

// PUT handler: Update a specific financial metric
export async function PUT(request, { params }) {
  const { id } = params;
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

  try {
    await connectToDatabase();

    // Check if there's another metric with the same month and year, excluding the current one
    const existingMetric = await FinancialMetric.findOne({
      month,
      year,
      _id: { $ne: id }, // Ensure it doesn't conflict with the current metric
    });

    if (existingMetric) {
      return NextResponse.json(
        { message: 'A metric for this month and year already exists.' },
        { status: 400 }
      );
    }

    // Proceed with the update if no conflict
    const updatedMetric = await FinancialMetric.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    return NextResponse.json(updatedMetric);
  } catch (error) {
    console.error('Error updating financial metric:', error);
    return NextResponse.json({ message: 'Failed to update metric' }, { status: 500 });
  }
}

// DELETE handler: Delete a specific financial metric
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    await FinancialMetric.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Metric deleted successfully' });
  } catch (error) {
    console.error('Error deleting financial metric:', error);
    return NextResponse.json({ message: 'Failed to delete metric' }, { status: 500 });
  }
}

// GET handler: Retrieve a specific financial metric
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const metric = await FinancialMetric.findById(id);

    if (!metric) {
      return NextResponse.json({ message: 'Metric not found' }, { status: 404 });
    }

    return NextResponse.json(metric);
  } catch (error) {
    console.error('Error fetching metric:', error);
    return NextResponse.json({ message: 'Failed to fetch metric' }, { status: 500 });
  }
}