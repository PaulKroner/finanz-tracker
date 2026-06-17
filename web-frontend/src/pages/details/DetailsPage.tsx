import { useState } from "react";
import YearSelect from "../../components/ui/yearSelect";
import MonthSelect from "../../components/ui/monthSelect";
import DetailsSaldo from "../../components/details/DetailsSaldo";
import DetailsLastIncome from "../../components/details/DetailsLastIncome";
import DetailsLastExpense from "../../components/details/DetailsLastExpense";
import DetailsCategoryOverview from "../../components/details/DetailsCategoryOverview";
import FinanceFileActions from "../../components/details/FinanceFileActions";
import { Input } from "../../components/ui/input";
import { useCategories } from "../../customHooks/dashboardHooks/useCategories";

const DetailsPage = () => {

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [titleFilter, setTitleFilter] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isDescending, setIsDescending] = useState(true);
  const categories = useCategories();

  return (

    <div className="flex flex-col justify-center items-center gap-4">
      <YearSelect onYearChange={setSelectedYear} />
      <MonthSelect
        onMonthChange={(monthIndex: number) => {
          setSelectedMonth(monthIndex);
        }}
      />
      <div className="border rounded-xl p-4 shadow-sm w-full md:w-150">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="grid gap-2 md:grid-cols-2">
          <Input placeholder="Titel suchen" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
          <select className="p-2 border rounded" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Alle Kategorien</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <select className="p-2 border rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Datum</option>
            <option value="title">Titel</option>
            <option value="amount">Betrag</option>
          </select>
          <select className="p-2 border rounded" value={isDescending ? "desc" : "asc"} onChange={(e) => setIsDescending(e.target.value === "desc")}>
            <option value="desc">Absteigend</option>
            <option value="asc">Aufsteigend</option>
          </select>
        </div>
      </div>

      <DetailsSaldo selectedYear={selectedYear} selectedMonth={selectedMonth} />

      <DetailsLastIncome
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        titleFilter={titleFilter}
        categoryId={categoryId}
        sortBy={sortBy}
        isDescending={isDescending}
      />

      <DetailsLastExpense
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        titleFilter={titleFilter}
        categoryId={categoryId}
        sortBy={sortBy}
        isDescending={isDescending}
      />

      <DetailsCategoryOverview selectedYear={selectedYear} selectedMonth={selectedMonth} />
      <FinanceFileActions selectedYear={selectedYear} selectedMonth={selectedMonth} />
      
    </div>
  );
}

export default DetailsPage;
