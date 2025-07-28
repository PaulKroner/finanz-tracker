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
} from "../../components/ui/dialog"
import { Button } from "../ui/button";

const EditButtonTable = ({ onClosePopover }: { onClosePopover: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 w-30">
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
            <Button variant="outline" onClick={onClosePopover}>Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onClosePopover}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButtonTable;