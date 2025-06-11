"use client"

import { Button } from '@/components/ui/button';
import { FaChartLine } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react';


const Navbar = () => {
  const [date, setDate] = React.useState<Date>()
  return (
    <nav className="bg-lime-100 p-2">
      <ul className="flex flex-row flex-wrap gap-3 justify-around">
        {/* <Button onClick={() => setView("income")}>Einnahme hinzufügen</Button>
        <Button onClick={() => setView("expanse")}>Ausgabe hinzufügen</Button>
        <Button onClick={() => setView("dashboard")}>zum Dashboard</Button> */}
        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <FaChartLine size={10} />
          </div>
          <div className="text-xs">
            Dashboard
          </div>
        </Button>


        <Drawer>
          <DrawerTrigger asChild>
            <Button className="flex flex-col h-12 p-4">
              <IoIosAddCircleOutline />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Was willst du hinzufügen?</DrawerTitle>
              <DrawerDescription>Einnahme oder Ausgabe?</DrawerDescription>
              <div className="flex flex-row justify-center gap-6">
                <Button>Einnahme</Button>
                <Button>Ausgabe</Button>
              </div>
              <div className="flex flex-row justify-center items-center gap-3">
                <Input className="w-20" />
                <div>€</div>
              </div>
              {/* Kalender */}
              <div className="flex flex-row justify-center items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Hinzufügen</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">Abbrechen</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


        {/* <Button className="flex flex-col h-12 p-4">
          <div className="">
            <IoIosAddCircleOutline size={20} />
          </div>
        </Button>

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <MdMoneyOff />
          </div>
          <div className="text-xs">
            Ausgabe +
          </div>
        </Button> */}

        <Button className="flex flex-col h-12 p-4">
          <div className="">
            <IoPersonCircle />
          </div>
          <div className="text-xs">
            Profil
          </div>
        </Button>
      </ul>
    </nav>
  );
};

export default Navbar;