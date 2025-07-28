import { MdDelete } from "react-icons/md";
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
import { deleteEntry } from "../../../api/detailsAPI/DeleteEntry";
import { useState } from "react";

type DeleteButtonTableProps = {
  id: number;
  data: any[];
  setData: (data: any[]) => void;
  onClosePopover: () => void;
};

const DeleteButtonTable = ({
  id,
  data,
  setData,
  onClosePopover,
}: DeleteButtonTableProps) => {

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteEntry(id, data, setData,);
    setOpen(false);
    onClosePopover();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="flex items-center justify-center gap-2 w-40 h-13 md:w-30 md:h-9">
          <span>Löschen</span>
          <MdDelete className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eintrag wirklich löschen?</DialogTitle>
          <DialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="h-13 md:h-9" variant="outline" onClick={onClosePopover}>zurück</Button>
          </DialogClose>
          <Button
            className="h-13 md:h-9"
            variant="destructive"
            onClick={handleDelete}
          >
            Eintrag löschen
          </Button>        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteButtonTable;