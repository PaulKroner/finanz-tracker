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
import { Button } from "../../ui/button";
import DeleteButtonTable from "../buttons/DeleteButtonTable";
import EditButtonTable from "../buttons/EditButtonTable";

const MobileDrawerOptions = () => {
    const [open, setOpen] = useState(false) // State for closing Popover when Dialog is closed
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
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
            <DeleteButtonTable onClosePopover={() => setOpen(false)} />
          </div>
          <div className="flex items-center justify-center">
            <EditButtonTable onClosePopover={() => setOpen(false)} />
          </div>

        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileDrawerOptions;