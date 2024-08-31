'use client';

import { useState } from 'react';

import IconMenu from '../icone-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal, OutdentIcon, SquarePen, Trash2 } from 'lucide-react';
import ResponsiveDialog from '../responsive-dialoge';
import DeleteForm from './Dialog/delete-form-out';
import { number } from 'zod';
import EditForm from './Dialog/edit-form-out';
interface WithId<T> {
  id: string;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}


export default function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOutOpen, setIsOutOpen] = useState(false);
  const cardId = row.original.id as string;
  // const title = row.original.article as string;

  const copyArticle = () => {
    
    // navigator.clipboard.writeText(cardId +  " " + 
    //   row.original.id +  " " + 
    //   row.original.nomArticle +  " " + 
    //   row.original.categiry +  " " + 
    //   row.original.id +  " " + 
    //   row.original.id +  " " + 
    //   row.original.id)
  }

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Article"
        description='Editing this data is changing your database content ....'
      >
        <EditForm cardId={cardId} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        description='Deleting this article is changing your database content ....'

        title="Delete Article"
      >
        <DeleteForm cardId={parseFloat(cardId)} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500">
            <button
              onClick={() => {
                copyArticle();
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text="Copy Article" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500">
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex text-red-600 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
// onClick={() => navigator.clipboard.writeText(payment.id)}