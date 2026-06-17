import { Button } from "../../ui/button";
import { IoMdAdd } from "react-icons/io";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer"
import { useState } from "react";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { postCategory } from "../../../api/customization/PostCategory";
import type { Category } from "../../../types/types";

type AddCategoryButtonProps = {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const AddCategoryButton = ({ setCategories }: AddCategoryButtonProps) => {

  const [open, setOpen] = useState(false) // State for closing Popover when Dialog is closed
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"income" | "expense" | "both">("both");
  const [color, setColor] = useState("#64748b");
  const [icon, setIcon] = useState("circle");

  const handlePostCategory = async () => {
    if (!title) {
      toast.error("Bitte gib einen Titel für die Kategorie ein.");
      return;
    }

    const createdCategory = await postCategory({ title, type, color, icon });
    if (createdCategory) {
      setCategories((prev) => [...prev, createdCategory]);
      setTitle("");
      setType("both");
      setColor("#64748b");
      setIcon("circle");
      setOpen(false);
    }

  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full h-13 md:w-1/2" variant="outline">
            Neue Kategorie hinzufügen
            <IoMdAdd className="size-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Neue Kategory hinzufügen</DrawerTitle>
            <div className="flex flex-col justify-center items-center gap-2 mt-6">
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
                <select className="w-32 p-2 border rounded" value={type} onChange={(e) => setType(e.target.value as "income" | "expense" | "both")}>
                  <option value="both">Beides</option>
                  <option value="income">Einnahme</option>
                  <option value="expense">Ausgabe</option>
                </select>
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
          </DrawerHeader>
          <DrawerFooter className="items-center mb-4 gap-4">

            <Button className="w-54 h-13 md:h-9" onClick={handlePostCategory}>
              Hinzufügen
            </Button>

            <DrawerClose asChild>
              <Button variant="outline" className="w-54 h-13 md:h-9">Abbrechen</Button>
            </DrawerClose>

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  );
}

export default AddCategoryButton;
