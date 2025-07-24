import { useState } from "react";
import YearSelect from "../../components/ui/yearSelect";
import MonthSelect from "../../components/ui/monthSelect";
import DetailsSaldo from "../../components/details/DetailsSaldo";
import DetailsLastIncome from "../../components/details/DetailsLastIncome";

const DetailsPage = () => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (

    <div className="flex flex-col justify-center items-center gap-4">
      <YearSelect onYearChange={setSelectedYear} />
      <MonthSelect
        onMonthChange={(monthIndex: number) => {
          setSelectedMonth(monthIndex);
        }}
      />

      <DetailsSaldo selectedYear={selectedYear} selectedMonth={selectedMonth} />

      <DetailsLastIncome selectedYear={selectedYear} selectedMonth={selectedMonth} />

    </div>
  );
}

export default DetailsPage;