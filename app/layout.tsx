import "./css/globals.css";
import { ppEditorialNewUltralightItalic, inter } from "./fonts";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/app/theme-provider";

export const metadata = {
  title: "Lost and Sound",
  description:
    "Lost and Sound is a festival where rhythm meets nature, and music becomes a journey. Dive into a world of immersive electronic beats, creative expression, and unforgettable experiences.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="flex-grow">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}