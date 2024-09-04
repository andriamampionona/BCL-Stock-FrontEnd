import { useRouter } from "next/navigation";
import { AarticleIn, columns } from "./columns";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IconMenu from "../icone-menu";
import { Button } from "../ui/button";
import { Calendar, CalendarArrowDownIcon, CalendarArrowUp, CalendarCheck, CalendarDays, CalendarDaysIcon, CalendarFold, CalendarFoldIcon, DockIcon, GroupIcon, PlusSquare, Repeat1Icon, Search, SquarePen } from "lucide-react";
import ResponsiveDialog from "../responsive-dialoge";
import AddForm from "./Dialog/add-form";

import { ScrollArea } from "@/components/ui/scroll-area"
import { DownloadIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { ShearchSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ComboboxPeriod } from "./Dialog/combobox-period";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { addperiode } from "./api/article-api";
import { title } from "process";
import { DataTablePeriode } from "./data-table";
import { downloadData } from "../Article-in/api/article-api";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


// export type : 


export default function PeriodePage() {


  const {toast} = useToast();

  const form = useForm<z.infer<typeof ShearchSchema>>({
    resolver: zodResolver(ShearchSchema),
    defaultValues: {
     
      category: '',
      period: "",
     
    },

  });
  

  const [data, setData] = useState<AarticleIn[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isTable, setIsTable] = useState(true);
  const [isCard, setIsCard] = useState(false);


  

  const bearerData  = session?.user?.bearer;



  useEffect(() => {
   
    // if (status === "unauthenticated") {
    //   router.push("/sing-in");
    // } else if (status === "authenticated") {
     
    // }
    const fetchData = async () => {
        try {

        const res = await fetch(apiUrl + "/periode", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " +bearerData,
          },
         
        });
        const user = await res.json();      
          setData(user);
          
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();

  }, [status, router, session, isAddOpen]);

  if (loading) {
    return <div>Chargement...</div>;
  }

const onSubmit = async (values: z.infer<typeof ShearchSchema>) => {
    try {
          // Submit the form data to your API here
    const response = await addperiode( values);
    
    if (response.Message) {      
      
    
      toast({
          title: "Adding: successfull...",
          description: response.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "Adding : faild...",
        description: response.Erreur,
        })
      
    }
    
    setIsAddOpen(false);

    } catch (error) {
      toast({
        variant:'destructive',
        title: "Faild",
        descreiption: error +""
      })
      console.log(error);
    }
  };

  // if (status === "authenticated") { // User authenticated .........
      return (
        <div className="container  mx-auto py-0 ">
           <div className="flex justify-between items-center ">
             <Button
             variant={'outline'}
             onClick={() => {
                setIsAddOpen(true);
              }}
              className="justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text="New Period" icon={<PlusSquare className="h-5 w-5" />} />
            </Button>
            <div className="flex justify-between space-x-1 items-center py-4">
                   
            </div>
           


{/* View mode */}
             <div className="flex justify-between space-x-5 items-center py-4">
              
               

             
                
                    <Button
                variant={'destructive'}
                onClick={() => {
                    downloadData(data, "article-in-data")
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Export To Excel" icon={<DownloadIcon className="h-5 w-5" />} />
                </Button>
            </div>

           </div>

              <DropdownMenuSeparator />



              <DropdownMenuSeparator />
       
        <ScrollArea className='h-4/3'>
 <DataTablePeriode  columns={columns} data={data} /> 
              
              
        </ScrollArea>

      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="New Article"
      >
        <AddForm setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>
        </div>
  );
}
// }
 