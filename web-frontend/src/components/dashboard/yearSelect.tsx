import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Button } from "../../components/ui/button";
import { useEffect, useRef, useState } from "react";

const YearSelect = () => {

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const yearRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const currentRef = yearRefs.current[selectedYear];
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedYear]);

  return (
    <div className="flex items-center justify-center w-full p-4">
      <ScrollArea className="flex items-center justify-center w-full rounded-md border whitespace-nowrap">
        <div className="flex items-center justify-center w-full space-x-4 p-4">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              className="w-20"
              onClick={() => setSelectedYear(year)}
              ref={(el) => { yearRefs.current[year] = el; }}
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