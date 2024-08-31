"use client"
import { ColumnDef } from "@tanstack/react-table"


import { MoreHorizontal, SquarePen } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"
import { useState } from "react"
import DataTableRowActions from "./data-table-row-actions"

export  type AarticleIn = {
  id: string
  dateDebut: string
  dateFin: number
  designation: string

}


// Function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // "Wed"
    day: '2-digit',   // "19"
    month: 'long',    // "Aug"
    year: 'numeric'    // "2024"
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};



export const columns: ColumnDef<AarticleIn>[] = [
       {
    accessorKey: "id",
    header: "###",
  },

  

  {
    accessorKey: "designation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Design
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },


    {
    accessorKey: "dateDebut",
    cell: ({ getValue }) => {
      const dateValue = getValue<string>();
      return formatDate(dateValue);
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Begin Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },

  


    {
    accessorKey: "dateFin",
    cell: ({ getValue }) => {
      const dateValue = getValue<string>();
      return formatDate(dateValue);
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },

  {
    id: "actions",
    cell:({row}) => <DataTableRowActions row={row} />,
  },

]
