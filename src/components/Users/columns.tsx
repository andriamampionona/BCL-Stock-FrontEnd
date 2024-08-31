"use client"
import { ColumnDef } from "@tanstack/react-table"


import { MoreHorizontal, SquarePen } from "lucide-react"
 
import { Button } from "@/components/ui/button"


import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "./data-table-row-actions"




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export  type User = {
   id: number
   nom: string
   email: string
   actif :boolean
   role: string
}

export const columns: ColumnDef<User>[] = [
       {
    accessorKey: "id",
    header: "###",
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "actif",
    header: "State",
  },
  
  {
    accessorKey: "role",
    header: "Role",
  },
    
  // {
  //   accessorKey: "utilisateur",
  //   header: "Utilisateur",
  // },
 
  {
    id: "actions",
    cell:({row}) => <DataTableRowActions row={row} />,
  },

]
