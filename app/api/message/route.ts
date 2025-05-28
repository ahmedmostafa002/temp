import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messageId, address, token } = body

    if (!messageId || !address || !token) {
      return NextResponse.json({ error: "MessageId, address, and token are required" }, { status: 400 })
    }

    const response = await fetch("https://temporary-gmail-account.p.rapidapi.com/GmailGetMessage", {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST || "temporary-gmail-account.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
        address,
        token,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Message API Error:", response.status, errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    // TODO: Remove or replace with structured debug log if needed
    // console.log("Message details fetched RAW:", JSON.stringify(data, null, 2)) // Detailed logging

    if (!data.member || data.member.length === 0) {
      throw new Error("Message not found or invalid response structure from API");
    }

    const messageData = data.member[0]; // Actual message data is in the first element of 'member' array

    let fromAddress = "Unknown Sender";
    if (messageData.from && typeof messageData.from === 'object' && messageData.from.address) {
      fromAddress = messageData.from.name ? `${messageData.from.name} <${messageData.from.address}>` : messageData.from.address;
    } else if (typeof messageData.from === 'string') {
      fromAddress = messageData.from;
    }


    return NextResponse.json({
      id: messageData.id || messageData.msgid || messageId,
      from: fromAddress,
      subject: messageData.subject || "No Subject",
      timestamp: messageData.createdAt || messageData.updatedAt || new Date().toISOString(),
      isRead: true, // Mark as read when detail is fetched
      hasAttachments: Array.isArray(messageData.attachments) && messageData.attachments.length > 0,
      attachments: messageData.attachments || [], // Pass along the attachments array
      // Prioritize HTML content, then text, then intro.
      body: messageData.htmlBody || messageData.html || messageData.bodyHtml || messageData.text || messageData.intro || "No full content available.",
    })
  } catch (error) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Message fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch message details" }, { status: 500 })
  }
}
