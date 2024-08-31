"use client"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "./data-table-row-actions"

export  type AarticleOut = {
  id: number
  category: string
  article: string
  quantite: number
  description: number
  date: string
  utilisateur: string

}

// Function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Wed"
    day: '2-digit',   // "19"
    month: 'short',    // "Aug"
    // year: 'numeric'    // "2024"
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};



export const columnsOut: ColumnDef<AarticleOut>[] = [
  {
    accessorKey: "id",
    header: "###",
  },
    {
    accessorKey: "date",
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
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },

  {
    accessorKey: "article",
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantite",
    header: "Quantié",
  },

    {
    accessorKey: "description",
    header: "description",
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
