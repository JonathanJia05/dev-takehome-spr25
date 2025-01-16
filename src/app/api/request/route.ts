// app/api/request/route.ts

import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Request from "../../models/Requests";
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

    //validate input of put
    if (!requestorName || !itemRequested) {
      return NextResponse.json(
        { message: RESPONSES[ResponseType.INVALID_INPUT].message },
        { status: RESPONSES[ResponseType.INVALID_INPUT].code }
      );
    }

    //length verification
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
      lastEditedDate: new Date(),
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
    const status: string | null = searchParams.get("status");

    //validating page
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: 400 }
      );
    }

    const limit = 6;

    //query
    const query: Record<string, unknown> = {};
    if (status) {
      const allowedStatuses: string[] = [
        "pending",
        "completed",
        "approved",
        "rejected",
      ];
      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          { message: "Invalid status value" },
          { status: 400 }
        );
      }
      query.status = status;
    }
    //getting data with pagination
    const totalItems = await Request.countDocuments(query);
    const requests = await Request.find(query)
      .sort({ createdDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        requests,
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, status } = body;

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

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
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
