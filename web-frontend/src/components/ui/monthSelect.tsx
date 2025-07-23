import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Button } from "../../components/ui/button";
import { useEffect, useRef, useState } from "react";

type MonthSelectProps = {
  onMonthChange: (monthIndex: number) => void;
};

const MonthSelect = ({ onMonthChange }: MonthSelectProps) => {

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ];
  const monthRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Scroll to the current month button
    const currentRef = monthRefs.current[selectedMonth];
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Notify parent component about the selected month
    onMonthChange(selectedMonth); // Notify parent on mount and on Month change
  }, [selectedMonth]);

  return (
    <div className="flex items-center justify-center w-full md:w-150">
      <ScrollArea className="w-full rounded-xl border shadow-sm whitespace-nowrap">
        <div className="flex items-center justify-center w-full space-x-4 p-4">
          {months.map((month, idx) => (
            <Button
              key={month}
              variant={selectedMonth === idx ? "default" : "outline"}
              className="w-20 rounded-full"
              onClick={() => setSelectedMonth(idx)}
              ref={(el) => {
                monthRefs.current[idx] = el;
              }}
            >
              {month}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default MonthSelect;