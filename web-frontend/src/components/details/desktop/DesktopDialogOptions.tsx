import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { Button } from "../../ui/button";
import DeleteButtonTable from "../buttons/DeleteButtonTable";
import EditButtonTable from "../buttons/EditButtonTable";
import { useState } from "react";

type DesktopDialogOptionsProps = {
  entry: { id: number },
  entries: any,
  setEntries: (data: any) => void,
};

const DesktopDialogOptions = ({ entry, entries, setEntries }: DesktopDialogOptionsProps) => {
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
          <DeleteButtonTable
            entry={entry}
            setEntries={setEntries}
            onClosePopover={() => setOpen(false)}
          />
        </div>
        <div className="flex items-center justify-center">
          <EditButtonTable
            entry={entry}
            setEntries={setEntries}
            onClosePopover={() => setOpen(false)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DesktopDialogOptions;