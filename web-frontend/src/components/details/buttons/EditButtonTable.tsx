import { MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Button } from "../../ui/button";
import { useState } from "react";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils"
import { Calendar } from "../../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { useCategories } from "../../../customHooks/dashboardHooks/useCategories";
// import { useChartUpdate } from "../../../context/ChartUpdateContext";
import { format } from "date-fns";

type Selection = "income" | "expense" | null;

const EditButtonTable = ({ onClosePopover }: { onClosePopover: () => void }) => {

  const [date, setDate] = useState<Date>();
  const [selected, setSelected] = useState<Selection>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const categories = useCategories();

  // const { refresh } = useChartUpdate()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 w-40 h-13 md:w-30 md:h-9">
          <span>Ändern</span>
          <MdEdit className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eintrag bearbeiten</DialogTitle>
          <DialogDescription>
            Hier kannst du Änderungen vornehmen. Klicke auf Speichern, wenn du fertig bist.
          </DialogDescription>
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
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="h-13 md:h-9" variant="outline" onClick={onClosePopover}>Cancel</Button>
          </DialogClose>
          <Button className="h-13 md:h-9" type="submit" onClick={onClosePopover}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButtonTable;