import "./css/globals.css";
import { ppEditorialNewUltralightItalic, inter } from "./fonts";
import type React from "react";
import Header from "@/components/common/Header" // Server Component
import Footer from "@/components/common/Footer"; // Server Component
import { ThemeProvider } from "@/app/theme-provider"; // Client Component wrapper

export const metadata = {
  title: "Lost and Sound",
  description: "Lost and Sound is a festival where rhythm meets nature, and music becomes a journey. Dive into a world of immersive electronic beats, creative expression, and unforgettable experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}> {/* Ensure base styles are applied */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Enforcing dark theme as per original site
          enableSystem={false} // Disable system preference if you want to force dark
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow"> {/* Added for potential sticky footer setups */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}