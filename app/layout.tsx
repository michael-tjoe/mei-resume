import type { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Meie_Script, Sora } from "next/font/google";
import { ViewportProvider } from "@/providers/ViewportProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora-family",
  display: "swap",
});

const meieScript = Meie_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stefanny Kusuma",
  description:
    "Graphic designer and illustrator specializing in social media design.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  const initialIsDesktop = device.type !== "mobile";

  return (
    <html
      lang="en"
      className={`${sora.variable} ${meieScript.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ViewportProvider initialIsDesktop={initialIsDesktop}>
          {children}
        </ViewportProvider>
      </body>
    </html>
  );
}
