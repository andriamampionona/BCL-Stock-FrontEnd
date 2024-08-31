import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"

import { Input } from "@/components/ui/input"
interface DataTableProps<TData, TValue> {
    
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({

  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])    
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

   const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

    const [pagination, setPagination] = React.useState({
  pageIndex: 0,
  pageSize: 4,
})

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), 
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      },
    onPaginationChange: (pagination) => {
      setPagination(pagination)
    },
  })


  return (
     <div>
        <div className="flex items-center py-4">
        <Input
          placeholder="Filter article..."
          value={(table.getColumn("article")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("article")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    
    
      <div className="flex items-center justify-end space-x-2 my-3 mx-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <span className="text-sm ">Page {pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination({
              ...pagination,
              pageSize: Number(e.target.value),
            })
          }}
          className="p-1 border rounded"
        >
          {[4, 10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    
    </div>
   
  

      
    </div>
  )
}
