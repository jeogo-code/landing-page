// pages/api/order.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  console.log("Received POST request to create a new order");

  try {
    // Ensure the database connection is established
    await connectToDatabase();

    console.log("Database connection established");

    // Parse the request body
    const {
      firstName,
      lastName,
      phoneNumber,
      selectedWilaya,
      selectedBaladiya,
      quantity,
      totalPrice,
    } = await req.json();

    // Validation
    if (!firstName || !lastName || !phoneNumber || !selectedWilaya || !selectedBaladiya) {
      console.error("Missing required fields:", { firstName, lastName, phoneNumber, selectedWilaya, selectedBaladiya });
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    console.log("All required fields are present");

    // Create a new order instance
    const newOrder = new Order({
      firstName,
      lastName,
      phoneNumber,
      selectedWilaya,
      selectedBaladiya,
      quantity,
      totalPrice,
    });

    // Save the new order to the database
    await newOrder.save();

    console.log("Order created successfully:", newOrder);

    // Return success response
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "An error occurred while creating the order." }, { status: 500 });
  }
}
