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
import { deleteCategory } from "../../../api/customization/DeleteCategory";

type DeleteButtonTableProps = {
  category: any;
  setCategories: (data: any[]) => void;
  onClosePopover: () => void;
};

const DeleteButton = ({
  category,
  setCategories,
  onClosePopover,
}: DeleteButtonTableProps) => {

  const handleDelete = async () => {
    await deleteCategory(category, setCategories);
    onClosePopover();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="flex items-center justify-center gap-2 w-70 h-13 md:w-30 md:h-9">
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

export default DeleteButton;