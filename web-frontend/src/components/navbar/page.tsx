import { Button } from '../../components/ui/button';
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import AddIncomeExpenseButton from './addIncomeExpenseButton';


const Navbar = () => {
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


        {/* Income / Expense Insert */}
        <AddIncomeExpenseButton />


        {/* <Button className="flex flex-col h-12 p-4">
          <div className="">
            <IoIosAddCircleOutline size={20} />
          </div>
        </Button>

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <MdMoneyOff />
          </div>
          <div className="text-xs">
            Ausgabe +
          </div>
        </Button> */}

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