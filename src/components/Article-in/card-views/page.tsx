'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, MoreVertical, OutdentIcon, PlusSquareIcon, Search, SquarePen, Trash2 } from 'lucide-react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { AarticleIn } from '../columns';
import ResponsiveDialog from '@/components/responsive-dialoge';
import EditForm from '../Dialog/edit-form';
import DeleteForm from '../Dialog/delete-form';
import IconMenu from '@/components/icone-menu';
import AddForm from '../Dialog/add-form';
import DataTableRowActions from '../data-table-row-actions';
import OutForm from '../Dialog/out-form';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// export type Person
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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


function Item(props: AarticleIn) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOutOpen, setIsOutOpen] = useState(false);
  
  const cardId = props.id ;
  const title = props.nomArticle ;
  const stock = props.stock;

  return (

    <>

<ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Article"
        description='Editing this data is changing your database content ....'
      >
        <EditForm cardId={cardId +""} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        description='Deleting this article is changing your database content ....'

        title={title}
      >
        <DeleteForm cardId={cardId} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>


      <ResponsiveDialog
        isOpen={isOutOpen}
        setIsOpen={setIsOutOpen}
        description='This action is article in your database content ....'

        title={`${title} out`}
      >
        <OutForm cardId={cardId+""} setIsOpen={setIsOutOpen} />
      </ResponsiveDialog>


<div className="grid grid-col-3">
  
      <Card key={props.id} className="flex flex-col justify-between">
        {/* Card Content */}
        
        <CardHeader className='flex-row justify-between gap-4 item-center'>

             <div className="">
               <CardTitle className='text-lg '>{ props.nomArticle }</CardTitle>
               <CardDescription className='text-xs text-ellipsis'> {`${ props.stock } / ${ props.qte}` } stocks</CardDescription>
            
             </div>
             <div className="">
              <CardDescription className='text-sm text-slate-50'> { formatDate(props.date+"") }</CardDescription>
              <CardDescription className='text-xs'> { `${props.pu+""} Ar (PU)` }</CardDescription>

             </div>
            {/* Dropdown Menu */}
          <div className=" right-4 top-4 z-10">
          <span>
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
                      setIsEditOpen(true);
                    }}
                    className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
                  >
                    <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
                  </button>
                </DropdownMenuItem>
                {
                  props.stock == 0 ? "" : 
                  <>
                        
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500">
                      <button
                      disabled = {props.stock==0}
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
          </span>
        </div>
             
        
        </CardHeader>
        <CardContent className=' text-sm text-muted-foreground flex  flex-row justify-between gap-4 item-center'>
          
          <p>{`${ props.category } `}</p>
          <p>{`${props.periode}`}</p>
          <p>{`${ props.utilisateur } (U)`}</p>
          
        </CardContent>
      </Card>
  
</div>

  
    </>
  );
}

export default function ArticleInCardPage() {

  const [data, setData] = useState<any []>([]);

  const { data: session, status } = useSession();

  const bearerData = session?.user?.bearer

    const filterData = async (nom: string) => {
     try {

        const res = await fetch(apiUrl + "/article/"+ nom, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + bearerData,
          },
         
        });
          const user = await res.json();      

          setData([]);
          setData(user);
       
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        } 
  }

const router = useRouter()

  useEffect(()=>{


     if (status === "loading") return; // Ne rien faire si le statut est "loading"
    
    if (status === "unauthenticated") {
      router.replace("/sing-in");  // Redirection vers la page de connexion
    } else {
     
     

    const fetchData = async () => {
        try {

        const res = await fetch(apiUrl + "/article/in", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + bearerData,
          },
         
        });
        const user = await res.json();      
          setData(user);
          
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        } 
        //finally {
        //   setLoading(false);
        // }
      
      };
      fetchData();
    
    }

  }, [])
  const [isAddOpen, setIsAddOpen] = useState(false);

  
  return (
    
    <div className="h-5/6">
      
        <div className="relative m-2 w-1/3">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e)=>{filterData(e.target.value)
       
        }}
        type="search"
        placeholder="filter article..."
        className="w-full appearance-none bg-background pl-8 shadow-none"
      />
    </div>


        <ScrollArea className='h-96'>
      <div className="grid grid-cols-1   pr-5 mt-4 sm:grid-cols-2 gap-4">
          {data.map((article) => (
            <Item key={article.id} {...article} />
          ))}

      </div>

</ScrollArea>


    </div>
  
);
}