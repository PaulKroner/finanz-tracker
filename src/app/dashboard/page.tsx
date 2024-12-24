import DashboardSaldo from "@/components/dashboard/saldo";
import LastActions from "@/components/dashboard/lastActions";
import ChartYearly from "@/components/dashboard/chartYearly";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ChartYearly />
      <DashboardSaldo />
      <LastActions />
    </div>
  );
}

export default Dashboard;