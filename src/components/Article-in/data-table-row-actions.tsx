'use client';

import { useState } from 'react';

//import DeleteForm from '@/components/forms/delete-form';

import EditForm from './Dialog/edit-form';
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
import DeleteForm from './Dialog/delete-form';
import { number } from 'zod';
import OutForm from './Dialog/out-form';

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
  const title = row.original.nomArticle as string;
  const stock = row.original.stock as number;

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

        title={title}
      >
        <DeleteForm cardId={parseFloat(cardId)} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>


      <ResponsiveDialog
        isOpen={isOutOpen}
        setIsOpen={setIsOutOpen}
        description='This action is article in your database content ....'

        title={`${title} out`}
      >
        <OutForm cardId={cardId} setIsOpen={setIsOutOpen} />
      </ResponsiveDialog>



      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px] z-50">
         
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
          {
            stock == 0 ? "" : 
            <>
                  
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500">
                <button
                disabled = {stock==0}
                  onClick={() => {
                    setIsOutOpen(true);
                  }}
                  className="w-full justify-start flex text-red-300 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                >
                  <IconMenu text="Get Out" icon={<OutdentIcon className="h-4 w-4" />} />
                </button>
              </DropdownMenuItem>
            
            </>
          }
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