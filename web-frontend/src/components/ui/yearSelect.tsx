import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Button } from "../../components/ui/button";
import { useEffect, useRef, useState } from "react";

type YearSelectProps = {
  onYearChange: (year: number) => void;
};

const YearSelect = ({ onYearChange }: YearSelectProps) => {

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const yearRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Scroll to the current year button
    const currentRef = yearRefs.current[selectedYear];
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Notify parent component about the selected year
    onYearChange(selectedYear); // Notify parent on mount and on year change
  }, [selectedYear]);

  return (
    <div className="flex items-center justify-center w-full md:w-150">
      <ScrollArea className="w-full rounded-xl border shadow-sm whitespace-nowrap">
        <div className="flex items-center justify-center w-full space-x-4 p-4">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              className="w-20 rounded-full"
              onClick={() => setSelectedYear(year)}
              ref={(el) => {
                yearRefs.current[year] = el;
              }}
            >
              {year}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default YearSelect;