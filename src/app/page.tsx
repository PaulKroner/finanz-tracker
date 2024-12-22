"use client";

import Footer from "./footer/page";
import Main from "./main/page";
import Navbar from "./navbar/page";
import { useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "income" | "expanse" | "dashboard">("home");
  return (
    <div className="flex flex-col min-h-screen">
      <Main view={view} setView={setView} />
      <section className="fixed bottom-0 w-full">
        <Navbar setView={setView} />
      </section>
    </div>
  );
}
