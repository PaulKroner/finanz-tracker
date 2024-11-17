import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finanztracker by Kröner",
  description: "Übersicht für Ein- und Ausgaben",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
