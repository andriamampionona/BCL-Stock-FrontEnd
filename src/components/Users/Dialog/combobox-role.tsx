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

type ComboboxroleProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export function ComboboxRole({ selectedValue, onValueChange }: ComboboxroleProps) {

  
  const { data: session, status } = useSession();

  const bearerData  = session?.user?.bearer;

  const [open, setOpen] = React.useState(false);

  const [roles, setRole] = React.useState<{ role: string }[]>([]);

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/role`, {
          headers:{
            
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + bearerData,
          }
        }); // Remplacez `/roles` par le chemin de votre API
        setRole(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
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
            ? roles.find(role => role.role === selectedValue)?.role
            : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.role}
                  value={role.role}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={selectedValue === role.role ? "opacity-100" : "opacity-0"}
                  />
                  {role.role}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
