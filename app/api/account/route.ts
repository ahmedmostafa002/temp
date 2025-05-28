import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = await fetch("https://temporary-gmail-account.p.rapidapi.com/GmailGetAccount", {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST || "temporary-gmail-account.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generateNewAccount: 1, // Changed to 1 to force new account generation
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
      console.error("API Error:", response.status, errorText)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    // TODO: Remove or replace with structured debug log if needed
    // console.log("Account generated:", data)

    return NextResponse.json({
      email: data.email || data.address,
      token: data.token,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Account generation error:", error)
    return NextResponse.json({ error: "Failed to generate temporary Gmail account" }, { status: 500 })
  }
}
