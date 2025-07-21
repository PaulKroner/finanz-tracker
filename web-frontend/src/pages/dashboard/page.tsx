import DashboardSaldo from "../../components/dashboard/saldo";
import LastActions from "../../components/dashboard/lastActions";
import ChartYearly from "../../components/dashboard/chartYearly";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>

      <ChartYearly />
      <DashboardSaldo />
      <LastActions />
    </div>
  );
}

export default Dashboard;