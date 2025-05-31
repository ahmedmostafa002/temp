import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Ensure the API key is available
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("OpenAI API key is not set in environment variables.");
  // Potentially throw an error or handle this case more gracefully
  // For now, we'll let it fail at runtime if the key is missing when an API call is made.
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export async function POST(request: NextRequest) {
  if (!openaiApiKey) {
    return NextResponse.json({ message: "OpenAI API key not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { nameText, provider, quantity } = body;

    if (!quantity || typeof quantity !== 'number' || quantity <= 0 || quantity > 50) {
      return NextResponse.json({ message: "Invalid quantity. Must be between 1 and 50." }, { status: 400 });
    }

    if (!provider || typeof provider !== 'string') {
      return NextResponse.json({ message: "Invalid provider." }, { status: 400 });
    }

    let domainToUse = provider;
    if (provider && !provider.startsWith('@')) {
      // For predefined domains like "gmail.com", prepend "@"
      domainToUse = `@${provider}`;
    }
    // If provider already starts with "@" (custom user input), it will be used as is.
    // Ensure custom domain is valid, e.g. starts with @ and has a dot. Basic validation.
    if (provider && provider.startsWith('@') && !provider.substring(1).includes('.')) {
        return NextResponse.json({ message: "Invalid custom domain format. Must be like @yourdomain.com" }, { status: 400 });
    }


    const prompt = `
      Generate ${quantity} unique and professional-looking email addresses.
      Each email address must:
      1. Be plausible and resemble a real, commonly used email address format. Avoid overly generic or clearly fake patterns like "random.email".
      2. ${nameText ? `Incorporate the exact text "${nameText}" into the username part of *every* generated email. This text should be a clear and recognizable part of each username (e.g., if "${nameText}" is "john.doe", usernames could be "john.doe123", "contact.john.doe", "john.doe.official" etc.).` : 'Generate diverse and professional-sounding random usernames if no specific text is provided.'}
      3. Use the domain: "${domainToUse}".
      4. Usernames should consist of lowercase letters, numbers, and optionally single dots (.) or single hyphens (-). They should not start or end with dots/hyphens, nor have them consecutively.
      5. Usernames should generally be between 6 and 30 characters long.
      6. Ensure high randomness and uniqueness among the generated emails while adhering to all above constraints.
      7. The generated emails should sound credible and suitable for professional or personal use.

      Provide the output as a JSON array of strings, where each string is an email address. For example: ["professional.name@example.com", "another.name123@example.com"]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert email address generator. You will provide responses in JSON format only." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8, // Increase randomness
      max_tokens: 150 * quantity, // Estimate tokens needed
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("OpenAI returned no content.");
    }

    // Attempt to parse the JSON content
    let parsedEmails;
    try {
        // The model might return a JSON object with a key like "emails" or directly an array.
        // We need to be flexible here.
        const jsonResponse = JSON.parse(content);
        if (Array.isArray(jsonResponse)) {
            parsedEmails = jsonResponse;
        } else if (jsonResponse && typeof jsonResponse === 'object' && Array.isArray(Object.values(jsonResponse)[0])) {
            // Common pattern is {"emails": [...]} or {"generated_emails": [...]}
            parsedEmails = Object.values(jsonResponse)[0];
        } else {
            throw new Error("Unexpected JSON structure from OpenAI.");
        }

        if (!Array.isArray(parsedEmails) || !parsedEmails.every(email => typeof email === 'string')) {
            throw new Error("OpenAI response is not an array of email strings.");
        }

    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", content, parseError);
      throw new Error("Invalid JSON response from OpenAI.");
    }
    

    return NextResponse.json({ emails: parsedEmails }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/generate-emails:', error);
    let errorMessage = "An unknown error occurred while generating emails.";
    let statusCode = 500;

    if (error instanceof OpenAI.APIError) {
      errorMessage = `OpenAI API Error: ${error.message}`;
      statusCode = error.status || 500;
      if (error.status === 401) {
        errorMessage = "OpenAI API key is invalid or not authorized.";
      } else if (error.status === 429) {
        errorMessage = "Rate limit exceeded with OpenAI. Please try again later.";
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
}
