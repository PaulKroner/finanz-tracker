import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
};

const Select = ({ value, onValueChange, options, placeholder = "Auswählen", className }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("h-10 w-full justify-between rounded-lg px-3 font-normal", !selectedOption && "text-muted-foreground", className)}
        >
          <span className="truncate">{selectedOption?.label ?? placeholder}</span>
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
        <div className="max-h-64 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                disabled={option.disabled}
                className={cn("h-9 w-full justify-start rounded-md px-2 font-normal", isSelected && "bg-accent text-accent-foreground")}
                onClick={() => handleSelect(option.value)}
              >
                <span className="flex-1 truncate text-left">{option.label}</span>
                {isSelected && <Check className="size-4" />}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Select;
