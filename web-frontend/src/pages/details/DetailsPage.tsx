import { useState } from "react";
import YearSelect from "../../components/ui/yearSelect";
import MonthSelect from "../../components/ui/monthSelect";
import DetailsSaldo from "../../components/details/DetailsSaldo";
import DetailsLastIncome from "../../components/details/DetailsLastIncome";
import DetailsLastExpense from "../../components/details/DetailsLastExpense";
import DetailsCategoryOverview from "../../components/details/DetailsCategoryOverview";
import FinanceFileActions from "../../components/details/FinanceFileActions";
import { Input } from "../../components/ui/input";
import Select from "../../components/ui/select";
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
          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            options={[
              { value: "", label: "Alle Kategorien" },
              ...categories.map((category) => ({ value: category.id.toString(), label: category.title })),
            ]}
          />
          <Select
            value={sortBy}
            onValueChange={setSortBy}
            options={[
              { value: "date", label: "Datum" },
              { value: "title", label: "Titel" },
              { value: "amount", label: "Betrag" },
            ]}
          />
          <Select
            value={isDescending ? "desc" : "asc"}
            onValueChange={(value) => setIsDescending(value === "desc")}
            options={[
              { value: "desc", label: "Absteigend" },
              { value: "asc", label: "Aufsteigend" },
            ]}
          />
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
