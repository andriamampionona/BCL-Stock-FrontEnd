'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type ComboboxPeriodProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export function ComboboxPeriod({ selectedValue, onValueChange }: ComboboxPeriodProps) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("");
  const [period, setperiod] = React.useState<{  id: number, designation: string, dateDebut: string, dateFin: string }[]>([]);

  
    const { data: session, status } = useSession();
 
  const bearerData = session?.user?.bearer

  React.useEffect(() => {
    const fetchperiod = async () => {
      try {
        const response = await axios.get(`${apiUrl}/periode`, {
            headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + bearerData,
        },

        }); // Remplacez `/period` par le chemin de votre API
        setperiod(response.data);
      } catch (error) {
        console.error("Error fetching period:", error);
      }
    };

    fetchperiod();
  }, []);

  return (
     <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[470px] sm:w-[250px] justify-between"
        >
          {selectedValue
            ? period.find(period => period.designation === selectedValue)?.designation
            : "Select period..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search period..." />
          <CommandList>
            <CommandEmpty>No period found.</CommandEmpty>
            <CommandGroup>
              {period.map((period) => (
                <CommandItem
                  key={period.id}
                  value={period.designation}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={selectedValue === period.designation ? "opacity-100" : "opacity-0"}
                  />
                  {period.designation}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
