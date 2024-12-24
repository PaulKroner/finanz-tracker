"use client";

import { Button } from "@/components/ui/button";
import DashboardPage from "./dashboard/page";

type MainProps = {
  view: "home" | "income" | "expanse" | "dashboard";
  setView: (view: "home" | "income" | "expanse" | "dashboard") => void;
};

const Main = ({ view, setView }: MainProps) => {
  return (
    <main className="flex-grow p-4 mb-20">
      {view === "home" && (
        <div>
          <h1>Main Page</h1>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setView("income")}>Einnahme hinzufügen</Button>
            <Button onClick={() => setView("expanse")}>Ausgabe hinzufügen</Button>
            <Button onClick={() => setView("dashboard")}>zum Dashboard</Button>
          </div>
        </div>
      )}

      {view === "income" && (
        <div>
          <h1>Einnahme hinzufügen</h1>
          <p>Hier können Sie eine Einnahme hinzufügen.</p>
          <Button onClick={() => setView("home")}>Zurück</Button>
        </div>
      )}

      {view === "expanse" && (
        <div>
          <h1>Ausgabe hinzufügen</h1>
          <p>Hier können Sie eine Ausgabe hinzufügen.</p>
          <Button onClick={() => setView("home")}>Zurück</Button>
        </div>
      )}

      {view === "dashboard" && (
        <div>
          <DashboardPage />
          <Button onClick={() => setView("home")}>Zurück</Button>
        </div>
      )}

    </main>
  );
};


export default Main;