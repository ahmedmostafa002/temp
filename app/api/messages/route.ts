import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, token } = body

    if (!address || !token) {
      return NextResponse.json({ error: "Address and token are required" }, { status: 400 })
    }

    const response = await fetch("https://temporary-gmail-account.p.rapidapi.com/GmailGetMessages", {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST || "temporary-gmail-account.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        token,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("Messages API Error:", response.status, errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    // TODO: Remove or replace with structured debug log if needed
    // console.log("Messages fetched:", data)

    // Transform the response to match our interface
    const messageList = data.member || []
    const messages = messageList.map((msg: any, index: number) => {
      let fromAddress = "Unknown Sender";
      if (msg.from && typeof msg.from === 'object' && msg.from.address) {
        fromAddress = msg.from.name ? `${msg.from.name} <${msg.from.address}>` : msg.from.address;
      } else if (typeof msg.from === 'string') {
        fromAddress = msg.from;
      } else if (msg.sender) {
        fromAddress = msg.sender;
      }

      return {
        id: msg.id || msg.msgid || index.toString(),
        from: fromAddress,
        subject: msg.subject || "No Subject",
        timestamp: msg.createdAt || msg.timestamp || msg.date || new Date().toISOString(),
        isRead: msg.seen === true, // API uses 'seen'
        hasAttachments: msg.hasAttachments === true || (Array.isArray(msg.attachments) && msg.attachments.length > 0),
      }
    })

    return NextResponse.json({ messages })
  } catch (error) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Messages fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
