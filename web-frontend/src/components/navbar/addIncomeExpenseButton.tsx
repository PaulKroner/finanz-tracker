import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { cn } from "../../lib/utils"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { Button } from '../../components/ui/button';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "../../components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react";
import axios from "axios";
import { useChartUpdate } from "../../context/ChartUpdateContext";
import { useCategories } from "../../customHooks/dashboardHooks/useCategories";

type Selection = "income" | "expense" | null;

const AddIncomeExpenseButton = () => {
  const [date, setDate] = useState<Date>();
  const [selected, setSelected] = useState<Selection>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const categories = useCategories();

  const { refresh } = useChartUpdate()

  const handleSubmit = async () => {
    if (!selected || !title || !amount || !date || categoryId === null) {
      alert("Bitte fülle alle Felder aus.");
      return;
    }

    const url = `http://localhost:5062/api/${selected}`;

    try {
      const payload = {
        title,
        amount: parseFloat(amount),
        categoryId: categoryId,
        date: date.toISOString(), // full ISO 8601 format
      };

      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Erfolgreich hinzugefügt!");

      // Reset form
      setSelected(null);
      setTitle("");
      setAmount("");
      setDate(undefined);

      refresh(); // Trigger chart update
    } catch (error) {
      console.error("Fehler beim Senden:", error);
      alert("Fehler beim Hinzufügen des Eintrags.");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex flex-col h-12 p-4">
          <IoIosAddCircleOutline />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>

          <DrawerTitle>Was willst du hinzufügen?</DrawerTitle>
          {/* <DrawerDescription>Einnahme oder Ausgabe?</DrawerDescription> */}

          <div className="flex flex-row justify-center gap-4">
            <Button
              variant={selected === "income" ? "default" : "outline"}
              onClick={() => setSelected("income")}
              className="w-26"
            >
              Einnahme
            </Button>
            <Button
              variant={selected === "expense" ? "default" : "outline"}
              onClick={() => setSelected("expense")}
              className="w-26"
            >
              Ausgabe
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            {/* Zeile 1 */}
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Titel:</div>
              <Input
                className="w-32 p-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Zeile 2 */}
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Betrag:</div>
              <div className="flex items-center w-32">
                <Input
                  type="number"
                  placeholder="Betrag"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="ml-2 text-gray-500">€</span>
              </div>

            </div>
          </div>

          {/* category */}
          <div className="flex items-center justify-center">
            <div className="w-24 p-2 flex justify-start items-start">Kategorie:</div>
            <select
              className="w-32 p-2 border rounded"
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="" disabled>Kategorie wählen</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* calendar */}
          <div className="flex flex-row justify-center items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-56 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Datum auswählen</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />
              </PopoverContent>
            </Popover>
          </div>

        </DrawerHeader>
        <DrawerFooter className="items-center">

          <Button className="w-48" onClick={handleSubmit}>
            Hinzufügen
          </Button>

          <DrawerClose asChild>
            <Button variant="outline" className="w-48">Abbrechen</Button>
          </DrawerClose>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddIncomeExpenseButton;