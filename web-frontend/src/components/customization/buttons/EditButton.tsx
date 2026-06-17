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
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { updateCategory } from "../../../api/customization/UpdateCategory";
import Select from "../../ui/select";

type EditButtonProps = {
  category: any;
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
  onClosePopover: () => void;
};

const EditButton = ({ category, setCategories, onClosePopover }: EditButtonProps) => {

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"income" | "expense" | "both">("both");
  const [color, setColor] = useState("#64748b");
  const [icon, setIcon] = useState("circle");

  const handleUpdate = async () => {
    // Check if all fields are filled
    if (!title) {
      toast("Bitte alle Felder ausfüllen.");
      return;
    }

    // funzt erstmal nur für income
    try {
      const updatedData = {
        title,
        type,
        color,
        icon,
      };

      const updatedEntry = await updateCategory(category.id, updatedData);

      // Liste lokal aktualisieren
      setCategories((prev: any[]) =>
        prev.map((e) => e.id === category.id ? { ...e, ...updatedEntry } : e)
      );

      toast.success("Eintrag erfolgreich aktualisiert!");
      onClosePopover(); // Popover schließen
    } catch (error) {
      toast.error("Fehler beim Speichern.");
      console.error(error);
    }
  };

    useEffect(() => {
      if (category) {
        setTitle(category.title);
        setType(category.type ?? "both");
        setColor(category.color ?? "#64748b");
        setIcon(category.icon ?? "circle");
      }
    }, [category]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 w-70 h-13 md:w-30 md:h-9">
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

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Titel:</div>
              <Input
                className="w-32 p-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Typ:</div>
              <Select
                className="w-40"
                value={type}
                onValueChange={(value) => setType(value as "income" | "expense" | "both")}
                options={[
                  { value: "both", label: "Beides" },
                  { value: "income", label: "Einnahme" },
                  { value: "expense", label: "Ausgabe" },
                ]}
              />
            </div>
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Farbe:</div>
              <Input className="w-32 p-1" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className="flex items-center">
              <div className="w-24 p-2 flex justify-start items-start">Icon:</div>
              <Input className="w-32 p-4" value={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>

          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="h-13 md:h-9" variant="outline" onClick={onClosePopover}>zurück</Button>
          </DialogClose>
          <Button className="h-13 md:h-9" type="submit" onClick={handleUpdate}>Änderungen speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
