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
} from "../../components/ui/dialog"
import { Button } from "../ui/button";

const DeleteButtonTable = ({ onClosePopover }: { onClosePopover: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="">
            <MdDelete className="size-6"/>
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
            <Button variant="outline" onClick={onClosePopover}>zurück</Button>
          </DialogClose>
          <Button variant="destructive" type="submit" onClick={onClosePopover}>Eintrag löschen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteButtonTable;