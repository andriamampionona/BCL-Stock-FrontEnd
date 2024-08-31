import { useRouter } from "next/navigation";
import { AarticleOut, columnsOut } from "./columns-out";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IconMenu from "../icone-menu";
import { Button } from "../ui/button";
import { CalendarDays, CalendarDaysIcon, DockIcon, DownloadIcon, PlusSquare, SquarePen } from "lucide-react";
import ResponsiveDialog from "../responsive-dialoge";
import { DataTable } from "./data-table";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ArticleOutPage() {
  const [data, setData] = useState<AarticleOut[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);

  

  const bearerData = session?.user?.bearer

  useEffect(() => {

    if (status === "loading") return; // Ne rien faire si le statut est "loading"
    
    if (status === "unauthenticated") {
      router.replace("/sing-in");  // Redirection vers la page de connexion
    } else {

    const fetchData = async () => {
        try {

        const res = await fetch(apiUrl + "/article/out", {
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
      
    }
   

  }, [status, router, session, isAddOpen]);

  if (loading) {
    return <div className="flex flex-row justify-center items-center">Loading...</div>;
  }

  // if (status === "authenticated") { // User authenticated .........
      return (
        <div className="container  mx-auto ">
            <div className="flex justify-between items-center p">
             <Button
             variant={'outline'}
             onClick={() => {
                setIsAddOpen(true);
              }}
              className="justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text="New Article" icon={<PlusSquare className="h-5 w-5" />} />
            </Button>
            <div className="flex justify-between space-x-1 items-center py-4">
              <Button
                variant={'outline'}
                onClick={() => {
                    setIsAddOpen(true);
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Date 1" icon={<CalendarDays className="h-5 w-5" />} />
                </Button>
                

                <Button
                variant={'outline'}
                onClick={() => {
                    setIsAddOpen(true);
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Date 1" icon={<CalendarDaysIcon className="h-5 w-5" />} />
                </Button>
                
            </div>

            <div className="flex justify-between space-x-5 items-center py-4">
              <Button
                variant={'secondary'}
                onClick={() => {
                    setIsAddOpen(true);
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Pdf" icon={<DockIcon className="h-5 w-5" />} />
                </Button>

                <Button
                variant={'destructive'}
                onClick={() => {
                    setIsAddOpen(true);
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Excel" icon={<DownloadIcon className="h-5 w-5" />} />
                </Button>
                
            </div>
           </div>
              <DropdownMenuSeparator />
            
            <DataTable  columns={columnsOut} data={data} />


        </div>
  );
}
// }
 