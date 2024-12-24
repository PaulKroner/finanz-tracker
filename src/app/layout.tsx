import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar/page";

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
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <section className="fixed bottom-0 w-full">
          <Navbar />
        </section>
      </body>
    </html>
  );
}
