import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaChartLine } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

type NavbarProps = {
  setView: (view: "home" | "income" | "expanse" | "dashboard") => void;
};

const Navbar = ({ setView }: NavbarProps) => {
  return (
    <nav className="bg-lime-100 p-2">
      <ul className="flex flex-row flex-wrap gap-3 justify-around">
        {/* <Button onClick={() => setView("income")}>Einnahme hinzufügen</Button>
        <Button onClick={() => setView("expanse")}>Ausgabe hinzufügen</Button>
        <Button onClick={() => setView("dashboard")}>zum Dashboard</Button> */}
        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <FaChartLine size={10} />
          </div>
          <div className="text-xs">
            Dashboard
          </div>
        </Button>

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <MdAttachMoney />
          </div>
          <div className="text-xs">
            Einnahme +
          </div>
        </Button>

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <MdMoneyOff />
          </div>
          <div className="text-xs">
            Ausgabe +
          </div>
        </Button>

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <IoPersonCircle />
          </div>
          <div className="text-xs">
            Profil
          </div>
        </Button>
      </ul>
    </nav>
  );
};

export default Navbar;