import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, messageId, address, token } = body;

    if (!fileName || !messageId || !address || !token) {
      return NextResponse.json(
        { error: "fileName, messageId, address, and token are required" },
        { status: 400 }
      );
    }

    const apiResponse = await fetch(
      "https://temporary-gmail-account.p.rapidapi.com/GmailAttachmentDownload",
      {
        method: "POST",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host":
            process.env.RAPIDAPI_HOST ||
            "temporary-gmail-account.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          messageId,
          address,
          token,
        }),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Attachment API Error:", apiResponse.status, errorText);
      // Try to parse errorText as JSON if it's a RapidAPI error object
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorJson.message || "Failed to download attachment" },
          { status: apiResponse.status }
        );
      } catch (e) {
        return NextResponse.json(
          { error: "Failed to download attachment" },
          { status: apiResponse.status }
        );
      }
    }

    // The API is expected to return the file content directly or a link.
    // If it returns file content, we need to stream it back.
    // For simplicity, let's assume it might return a JSON with a download link or base64 content.
    // Based on typical RapidAPI behavior for file downloads, it might return the file directly.
    // Let's get the raw response and set appropriate headers.

    const fileBuffer = await apiResponse.arrayBuffer();
    
    // Determine content type if possible, or use a generic one
    const contentType = apiResponse.headers.get("Content-Type") || "application/octet-stream";
    const contentDisposition = apiResponse.headers.get("Content-Disposition") || `attachment; filename="${fileName}"`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });

  } catch (error) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Attachment download error:", error);
    return NextResponse.json(
      { error: "Internal server error during attachment download" },
      { status: 500 }
    );
  }
}
