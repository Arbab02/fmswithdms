import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Deal from '@/lib/models/Deal'; // Updated model to 'Deal'

// PUT handler: Update a specific deal
export async function PUT(request, { params }) {
  const { id } = params;
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

  try {
    await connectToDatabase();

    // Check if there's another deal with the same month and year, excluding the current one
    const existingDeal = await Deal.findOne({
      month,
      year,
      _id: { $ne: id }, // Ensure it doesn't conflict with the current deal
    });

    if (existingDeal) {
      return NextResponse.json(
        { message: 'A deal for this month and year already exists.' },
        { status: 400 }
      );
    }

    // Proceed with the update if no conflict
    const updatedDeal = await Deal.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    return NextResponse.json(updatedDeal);
  } catch (error) {
    console.error('Error updating deal:', error);
    return NextResponse.json({ message: 'Failed to update deal' }, { status: 500 });
  }
}

// DELETE handler: Delete a specific deal
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    await Deal.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return NextResponse.json({ message: 'Failed to delete deal' }, { status: 500 });
  }
}

// GET handler: Retrieve a specific deal
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const deal = await Deal.findById(id);

    if (!deal) {
      return NextResponse.json({ message: 'Deal not found' }, { status: 404 });
    }

    return NextResponse.json(deal);
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json({ message: 'Failed to fetch deal' }, { status: 500 });
  }
}
