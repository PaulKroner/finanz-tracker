"use client";

import Dashboard from "./dashboard/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";
import React, { useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "income" | "expanse" | "dashboard">("home")

  return (
    <div className="flex flex-col min-h-screen p-4 mb-16">
      <Dashboard />
      <section className="fixed bottom-0 w-full">
        <Navbar />
      </section>
      {/* Footer needs to stick to the bottom but above the navbar */}
      {/* <Footer /> */}
    </div>
  );
}
