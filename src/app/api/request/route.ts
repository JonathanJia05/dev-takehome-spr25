// app/api/request/route.ts

import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Request from "../../models/Requests";
import { PAGINATION_PAGE_SIZE } from "../../../lib/constants/config"; // Adjust based on where you defined it
import {
  HTTP_STATUS_CODE,
  ResponseType,
  RESPONSES,
} from "../../../lib/types/apiResponse";

export async function PUT(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { requestorName, itemRequested } = body;

    //validate input
    if (!requestorName || !itemRequested) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    //field length verification
    if (
      typeof requestorName !== "string" ||
      requestorName.trim().length < 3 ||
      requestorName.trim().length > 30
    ) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    if (
      typeof itemRequested !== "string" ||
      itemRequested.trim().length < 2 ||
      itemRequested.trim().length > 100
    ) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    //create new request
    const newRequest = new Request({
      requestorName: requestorName.trim(),
      itemRequested: itemRequested.trim(),
      createdDate: new Date(),
      status: "pending",
    });

    const savedRequest = await newRequest.save();

    return NextResponse.json(savedRequest, {
      status: RESPONSES[ResponseType.CREATED].code,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { message: RESPONSES[ResponseType.UNKNOWN_ERROR].message },
      { status: RESPONSES[ResponseType.UNKNOWN_ERROR].code }
    );
  }
}

export async function GET(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const status = searchParams.get("status");

    const page = pageParam ? parseInt(pageParam, 10) : 1;

    //validate page number
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    //build query
    const query: any = {};
    if (status) {
      const allowedStatuses = ["pending", "completed", "approved", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          { message: RESPONSES[ResponseType.INVALID_INPUT].message },
          { status: RESPONSES[ResponseType.INVALID_INPUT].code }
        );
      }
      query.status = status;
    }

    //fetch with pagination
    const requests = await Request.find(query)
      .sort({ createdDate: -1 }) // Descending order
      .skip((page - 1) * PAGINATION_PAGE_SIZE)
      .limit(PAGINATION_PAGE_SIZE);

    return NextResponse.json(requests, {
      status: RESPONSES[ResponseType.SUCCESS].code,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: RESPONSES[ResponseType.UNKNOWN_ERROR].message },
      { status: RESPONSES[ResponseType.UNKNOWN_ERROR].code }
    );
  }
}

export async function PATCH(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, status } = body;

    //validate input
    if (!id || !status) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    const allowedStatuses = ["pending", "completed", "approved", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    //update request by ID
    const updatedRequest = await Request.findByIdAndUpdate(
      id, // Query by `_id` (Mongoose's default identifier)
      { status, lastEditedDate: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Request not found." },
        { status: HTTP_STATUS_CODE.NOT_FOUND }
      );
    }

    return NextResponse.json(updatedRequest, {
      status: RESPONSES[ResponseType.SUCCESS].code,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { message: RESPONSES[ResponseType.UNKNOWN_ERROR].message },
      { status: RESPONSES[ResponseType.UNKNOWN_ERROR].code }
    );
  }
}
