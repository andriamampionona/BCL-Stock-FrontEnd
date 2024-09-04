'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, PlusSquareIcon, SquarePen, Trash2 } from 'lucide-react';
import { getAllGroupe } from './api/group-api';
import ResponsiveDialog from '../responsive-dialoge';
import EditGroupForm from './Dialog/edit-form';
import DeleteGroupForm from './Dialog/delete-form';
import AddForm from './Dialog/add-form';
import IconMenu from '../icone-menu';

import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession } from 'next-auth/react';
import { DownloadIcon } from '@radix-ui/react-icons';
import { downloadData } from '../Article-in/api/article-api';
// export type Person
export type Groupe = {
  id: string;
  groupName: string;
  // role: string;
  // description: string;
  // image: string;
};

function Item(props: Groupe) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  return (

    <>

      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        description="Are you sure that you want to update this one?"
        title="Edit One Group"
      >

        <EditGroupForm cardId={props.id} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete One Group"
        description="Are you sure you want to delete this one?"
      >
        <DeleteGroupForm cardId={parseFloat(props.id)} group={props.groupName} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>


      <Card className="w-full py-2 shadow-md relative hover:shadow-2xl duration-200 transition-all">
        {/* Card Content */}
        
             
    <CardDescription className="pl-6 pb-1 text-sm">{props.groupName}</CardDescription>
                {/* <span className="text-neutral-500 text-sm">{props.role}</span> */}
          
        {/* Dropdown Menu */}
        <div className="absolute right-2 top-1 z-10">
          <span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px] z-50">
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                  <button
                    onClick={() => {
                      setIsEditOpen(true);
                    }}
                    className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                  >
                    <IconMenu
                      text="Edit"
                      icon={<SquarePen className="h-4 w-4" />}
                    />
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                  <button
                    onClick={() => {
                      setIsDeleteOpen(true);
                    }}
                    className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                  >
                    <IconMenu
                      text="Delete"
                      icon={<Trash2 className="h-4 w-4" />}
                    />
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
      </Card>
    </>
  );
}

export default function GroupCardPage() {

  const [GROUPS, setGroupes] = useState<any []>([]);

  
  const { data: session, status } = useSession();
 
  const bearerData  = session?.user?.bearer;

  useEffect(()=>{

   const fetchGroupes = async () => {
      try {
        const a = await getAllGroupe(bearerData); // Ensure await is used here
        setGroupes(a); // Set the resolved value of the promise
      } catch (error) {
        console.error('Failed to fetch groupes:', error);
      }
    };

    fetchGroupes(); // Call the async function inside useEffect
    
   


  }, [])
  const [isAddOpen, setIsAddOpen] = useState(false);

  
  return (
    <div className="w-full h- container mx-auto">
      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="A New Group"
        description="Are you sure that you want to add this person to your database ?"
      >
        <AddForm setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>


  <div className="flex flex-row justify-between space-x-5 items-center py-4">
              

      <Card
        onClick={()=>{setIsAddOpen(true)}}
        className=" w-40 p-4 mb-2 cursor-pointer flex shadow-md relative hover:shadow-xl duration-200 transition-all">
          <IconMenu text="New Group" icon={<PlusSquareIcon className="h-5 w-5" />} />
      </Card>

                <Button
                variant={'destructive'}
                onClick={() => {
                    downloadData(GROUPS, "Group-data")
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Export To Excel" icon={<DownloadIcon className="h-5 w-5" />} />
                </Button>
                
      </div>

      <DropdownMenuSeparator />

        <ScrollArea className='h-5/6'>

      <div className="grid grid-cols-1 pr-5 mt-4 sm:grid-cols-3 gap-4">
          {GROUPS.map((group) => (
            <Item key={group.id} {...group} />
          ))}

      </div>

        </ScrollArea>

    </div>
  );
}