"use client";

import Footer from "./footer/page";
import Main from "./main/page";
import Navbar from "./navbar/page";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "income" | "expanse" | "dashboard">("home");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setView={setView} />
      <Main view={view} setView={setView} />
      <Footer />
    </div>
  );
}
