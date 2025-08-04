import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer"
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../../../components/ui/button";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

type CategoryOptionsProps = {
  category: { id: number };
  setCategories: (data: any) => void;
};

const MobileCategoryOptions = ({ category, setCategories }: CategoryOptionsProps) => {
  const [open, setOpen] = useState(false) // State for closing Popover when Dialog is closed

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <BsThreeDots />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Was möchtest du tun?</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="mb-10 gap-4">
          <div className="flex items-center justify-center">
            <DeleteButton
              category={category}
              setCategories={setCategories}
              onClosePopover={() => setOpen(false)}
            />
          </div>
          <div className="flex items-center justify-center">
            <EditButton
              category={category}
              setCategories={setCategories}
              onClosePopover={() => setOpen(false)}
            />
          </div>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileCategoryOptions;