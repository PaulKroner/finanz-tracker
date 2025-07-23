import { Button } from '../../components/ui/button';
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import AddIncomeExpenseButton from './addIncomeExpenseButton';
import { Link } from 'react-router';


const Navbar = () => {

  return (
    <nav className="bg-lime-100 p-2">
      <ul className="flex flex-row flex-wrap gap-3 justify-around">

        <Link to="/dashboard">
          <Button className="flex flex-col h-12 p-4">
            <div className="">
              <FaChartLine size={10} />
            </div>
            <div className="text-xs">
              Dashboard
            </div>
          </Button>
        </Link>

        <Link to="/details">
          <Button className="flex flex-col h-12 p-4">
            <div className="">
              <IoStatsChart size={10} />
            </div>
            <div className="text-xs">
              Details
            </div>
          </Button>
        </Link>

        {/* Income / Expense Insert */}
        <AddIncomeExpenseButton />

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