import Link from 'next/link';
import { Button } from '@/components/ui/button';

type NavbarProps = {
  setView: (view: "home" | "income" | "expanse" | "dashboard") => void;
};

const Navbar = ({ setView }: NavbarProps) => {
  return (
    <nav className="bg-lime-100 p-4">
      <ul className="flex flex-row flex-wrap gap-3">
        <Button onClick={() => setView("income")}>Einnahme hinzufügen</Button>
        <Button onClick={() => setView("expanse")}>Ausgabe hinzufügen</Button>
        <Button onClick={() => setView("dashboard")}>zum Dashboard</Button>
      </ul>
    </nav>
  );
};

export default Navbar;