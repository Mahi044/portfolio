import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahendra Reddy R V - Portfolio",
  description: "Tech Enthusiast passionate about development, data science, analytics, and AWS solutions.",
  keywords: ["Mahendra Reddy", "Portfolio", "Developer", "Data Science", "AWS", "React", "Next.js"],
  authors: [{ name: "Mahendra Reddy R V" }],
  creator: "Mahendra Reddy R V",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Mahendra Reddy R V - Portfolio",
    description: "Tech Enthusiast passionate about development, data science, analytics, and AWS solutions.",
    siteName: "Mahendra Reddy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahendra Reddy R V - Portfolio",
    description: "Tech Enthusiast passionate about development, data science, analytics, and AWS solutions.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav.png" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
