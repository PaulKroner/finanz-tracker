import { Button } from '../../components/ui/button';
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import AddIncomeExpenseButton from './addIncomeExpenseButton';
import { Link } from 'react-router';


const Navbar = () => {

  return (
    // <nav className="bg-white/70 backdrop backdrop-opacity-80 backdrop-blur-3xl p-2 shadow-lg border">
    <nav className="bg-white-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border shadow-md p-2">

      <ul className="flex flex-row flex-wrap gap-2 justify-around">

        <Link to="/dashboard">
          <Button className="flex flex-col h-15 w-15 p-4" variant="ghost">
            <div className="">
              <FaChartLine className="size-6" strokeWidth="5" />
            </div>
            <div className="text-xs">
              Start
            </div>
          </Button>
        </Link>

        <Link to="/details">
          <Button className="flex flex-col h-15 w-15 p-4" variant="ghost">
            <div className="">
              <IoStatsChart className="size-6" />
            </div>
            <div className="text-xs">
              Details
            </div>
          </Button>
        </Link>

        {/* Income / Expense Insert */}
        <AddIncomeExpenseButton />

        <Link to="/customization">
          <Button className="flex flex-col h-15 w-15 p-4" variant="ghost">
            <div className="">
              <TbAdjustmentsHorizontal className='size-6' />
            </div>
            <div className="text-xs">
              Anpassen
            </div>
          </Button>
        </Link>


        <Button className="flex flex-col h-15 w-15 p-4" variant="ghost">
          <div className="">
            <IoPersonCircle className="size-6" strokeWidth="10" />
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