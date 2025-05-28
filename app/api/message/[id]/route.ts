import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) { // context is now any
  const id = context.params?.id; // Optional chaining for safety with any
  if (!id) {
    return NextResponse.json({ error: "Message ID not found in params" }, { status: 400 });
  }
  // You can add a log here to verify it's being hit if needed
  // console.log(`API route /api/message/[id] called with ID: ${id}`);
  return NextResponse.json({ message: `Successfully accessed message with ID: ${id}`, receivedId: id });
}
