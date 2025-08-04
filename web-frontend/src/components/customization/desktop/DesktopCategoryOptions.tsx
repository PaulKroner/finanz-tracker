import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { Button } from "../../ui/button";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";

type CategoryOptionsProps = {
  category: {id: number};
  setCategories: (data: any) => void;
};

const CategoryOptions = ({category, setCategories}: CategoryOptionsProps) => {

  const [open, setOpen] = useState(false) // State for closing Popover when Dialog is closed

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
          <BsThreeDots />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-38 flex flex-col items-center justify-center gap-2 p-4">
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
      </PopoverContent>
    </Popover>
  );
}

export default CategoryOptions;