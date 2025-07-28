import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { Button } from "../../ui/button";
import DeleteButtonTable from "../DeleteButtonTable";
import EditButtonTable from "../EditButtonTable";
import { useState } from "react";

const DesktopDialogOptions = () => {
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
          <DeleteButtonTable onClosePopover={() => setOpen(false)} />
        </div>
        <div className="flex items-center justify-center">
          <EditButtonTable onClosePopover={() => setOpen(false)} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DesktopDialogOptions;