import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/sonner" // Changed to Shadcn/UI Sonner Toaster
import NavigationBar from "@/components/home/NavigationBar";
import PageFooter from "@/components/home/PageFooter";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mytempsmail.com'),
  title: "Free Temporary Gmail Account with Inbox | My Temps Mail", // Focused on Gmail
  description:
    "Instantly get a Free Temporary Gmail Account with Inbox from My Temps Mail. Our 10minutemail generator provides disposable addresses for secure testing, sign-ups, and privacy. No registration required.", // Focused on Gmail
  keywords:
    "free temporary gmail account with inbox, temp gmail, disposable gmail, temporary gmail generator, fake gmail, my temps mail, anonymous gmail, privacy protection, free temp mail", // Focused on Gmail
  authors: [{ name: "My Temps Mail" }],
  creator: "My Temps Mail",
  publisher: "My Temps Mail",
  robots: "index, follow",
  openGraph: {
    title: "Free Temporary Gmail Account with Inbox | My Temps Mail", // Focused on Gmail
    description:
      "Instantly get a Free Temporary Gmail Account with Inbox from My Temps Mail. Our temp Gmail generator provides disposable addresses for secure testing, sign-ups, and privacy. No registration required.", // Focused on Gmail
    url: "https://mytempsmail.com", // Assuming URL might change with branding
    siteName: "My Temps Mail",
    images: [
      {
        url: "/og-image.jpg", // Consider updating if OG image has old branding
        width: 1200,
        height: 630,
        alt: "Temporary Gmail Account Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Temporary Gmail Account with Inbox | My Temps Mail", // Focused on Gmail
    description: "Instantly get a Free Temporary Gmail Account with Inbox from My Temps Mail. Our temp Gmail generator provides disposable addresses for secure testing, sign-ups, and privacy. No registration required.", // Focused on Gmail
    images: ["/og-image.jpg"], // Consider updating if OG image has old branding
    creator: "@mytempsmail", // Assuming Twitter handle might change
  },
  alternates: {
    canonical: "https://mytempsmail.com", // Assuming URL might change with branding
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/fav.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0070f3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "My Temps Mail - Free Temporary Gmail Account with Inbox", // Focused on Gmail
              description: "Instantly generate a Free Temporary Gmail Account with Inbox for secure testing, sign-ups, and privacy protection with My Temps Mail.", // Focused on Gmail
              url: "https://mytempsmail.com", // Assuming URL might change with branding
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <NavigationBar />
          {children}
          <PageFooter />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
