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

const EditButtonTable = ({ onClosePopover }: { onClosePopover: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 w-40 h-13 md:w-30 md:h-9">
          <span>Ändern</span>
          <MdEdit className="size-6"/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eintrag bearbeiten</DialogTitle>
          <DialogDescription>
            Hier kannst du Änderungen vornehmen. Klicke auf Speichern, wenn du fertig bist.
          </DialogDescription>
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