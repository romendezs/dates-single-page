import type { Metadata } from "next";
import "./globals.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  subsets : ["latin"],
  display : "swap",
  weight: ["100","200", "300", "500"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
