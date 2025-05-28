import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("CRITICAL: RAPIDAPI_KEY is not set in environment variables.");
      return NextResponse.json({ error: "Server configuration error: API key missing." }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const messageIdFromPath = params.id; // Use the ID from the path for our response

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }
    if (!messageIdFromPath) {
      return NextResponse.json({ error: "Message ID is required in path" }, { status: 400 })
    }

    const rapidApiHost = process.env.RAPIDAPI_HOST || "temporary-gmail-account.p.rapidapi.com"; // Corrected fallback
    const response = await fetch(
      `https://${rapidApiHost}/GetMessage?token=${token}&messageId=${messageIdFromPath}`, // Assuming /GetMessage is correct for this GET
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey, // Use the checked apiKey
          "x-rapidapi-host": rapidApiHost, 
        },
      },
    )

    if (!response.ok) {
      const errorText = await response.text();
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Single Message API Error (GET):", response.status, errorText);
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson && errorJson.message) {
          // Use the error message from the external API if available
          return NextResponse.json({ error: `External API Error: ${errorJson.message}` }, { status: response.status });
        }
      } catch (e) {
        // Fall through if errorText is not JSON or doesn't have a message
      }
      // Generic error if external API error couldn't be parsed nicely
      return NextResponse.json({ error: `API request failed with status ${response.status}` }, { status: response.status });
    }

    const messageData = await response.json(); 
    // TODO: Remove or replace with structured debug log if needed
    // console.log("Single Message (GET) details fetched RAW:", JSON.stringify(messageData, null, 2));

    let fromAddress = "Unknown Sender";
    if (messageData.from && typeof messageData.from === 'object' && messageData.from.address) {
      fromAddress = messageData.from.name ? `${messageData.from.name} <${messageData.from.address}>` : messageData.from.address;
    } else if (typeof messageData.from === 'string') {
      fromAddress = messageData.from;
    }

    return NextResponse.json({
      id: messageData.id || messageData.msgid || messageIdFromPath, 
      from: fromAddress,
      subject: messageData.subject || "No Subject",
      timestamp: messageData.createdAt || messageData.updatedAt || messageData.date || new Date().toISOString(), 
      isRead: true, 
      hasAttachments: Array.isArray(messageData.attachments) && messageData.attachments.length > 0,
      attachments: messageData.attachments || [],
      body: messageData.body || messageData.htmlBody || messageData.html || messageData.bodyHtml || messageData.text_body || messageData.text || messageData.intro || "No full content available.",
    });

  } catch (error: any) {
    // This catch block is for unexpected errors within this route's logic itself,
    // or if the fetch to the external API completely fails (network level).
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Single Message (GET) internal route error:", error);
    return NextResponse.json({ error: error.message || "Failed to process request for message details" }, { status: 500 });
  }
}
