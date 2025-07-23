import DashboardSaldo from "../../components/dashboard/DashboardSaldo";
import LastActions from "../../components/dashboard/lastActions";
import ChartYearly from "../../components/dashboard/chartYearly";
import YearSelect from "../../components/ui/yearSelect";
import { useState } from "react";
import ChartCategoryYearly from "../../components/dashboard/ChartCategoryYearly";

const Dashboard = () => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>

      <div className="flex justify-center items-center">
        <YearSelect onYearChange={setSelectedYear} />
      </div>

      <ChartYearly selectedYear={selectedYear} />

      <DashboardSaldo selectedYear={selectedYear} />

      <ChartCategoryYearly selectedYear={selectedYear} />

      <LastActions />
    </div>
  );
}

export default Dashboard;