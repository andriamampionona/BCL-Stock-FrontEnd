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




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export  type AarticleIn = {
  id: number
  category: string
  //status: "pending" | "processing" | "success" | "failed"
  nomArticle: string
  qte: number
  pu: number
  montant: number
  date: string
  utilisateur: string

}


// Function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Wed"
    day: '2-digit',   // "19"
    month: 'short',    // "Aug"
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
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const dateValue = getValue<string>();
      return formatDate(dateValue);
    },
  },
    {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "nomArticle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Article
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "qte",
    header: "Quantié",
  },
  
  {
    accessorKey: "pu",
    header: "PU",
  },
    {
    accessorKey: "montant",
    header: "Montant",
  },
  {
    accessorKey: "utilisateur",
    header: "Utilisateur",
  },
 
  {
    id: "actions",
    cell:({row}) => <DataTableRowActions row={row} />,
  },

]
