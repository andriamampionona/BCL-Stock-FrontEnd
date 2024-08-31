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

type ComboboxCategoryProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export function ComboboxCategory({ selectedValue, onValueChange }: ComboboxCategoryProps) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("");
  const [categories, setCategories] = React.useState<{ id: number; groupName: string }[]>([]);

  
  const { data: session, status } = useSession();
  const bearerData = session?.user?.bearer

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/groupe`, {
          headers:{
            
        'Content-Type': 'application/json',
        "Authorization": "Bearer " +bearerData,
          }
        }); // Remplacez `/categories` par le chemin de votre API
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
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
            ? categories.find(category => category.groupName === selectedValue)?.groupName
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.groupName}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={selectedValue === category.groupName ? "opacity-100" : "opacity-0"}
                  />
                  {category.groupName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
