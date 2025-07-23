import { useState } from "react";
import YearSelect from "../../components/ui/yearSelect";
import MonthSelect from "../../components/ui/monthSelect";
import DetailsSaldo from "../../components/details/DetailsSaldo";

const DetailsPage = () => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (
    <div>
      <h1>Details Page</h1>
      <div className="flex flex-col justify-center items-center gap-3">
        <YearSelect onYearChange={setSelectedYear} />
        <MonthSelect
          onMonthChange={(monthIndex: number) => {
            setSelectedMonth(monthIndex);
          }}
        />
      </div>

      <DetailsSaldo selectedYear={selectedYear} selectedMonth={selectedMonth} />

    </div>
  );
}

export default DetailsPage;