import { useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IconMenu from "../icone-menu";
import { Button } from "../ui/button";
import { DownloadIcon, PlusSquare, SquarePen } from "lucide-react";
import ResponsiveDialog from "../responsive-dialoge";
import AddForm from "./Dialog/add-user-form";
import { getAllUser } from "./api/users-api";
import { columns } from "./columns";
import { useToast } from "../ui/use-toast";
import { downloadData } from "../Article-in/api/article-api";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UsersPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);

   const { toast } = useToast()

  const bearerData  = session?.user?.bearer;

  useEffect(() => {

    const fetchData = async () => {
        try {

          const res = await getAllUser(bearerData);
            // console.log(res)
          setData(res);
          
        } catch (error) {
          toast({
          title: "Deletng : successfull...",
          description: error+ "",
        })
          
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

  // if (status === "authenticated") { // User authenticated .........
      return (
        <div className="container  mx-auto ">
            
  <div className="flex flex-row justify-between space-x-5 items-center py-4">
              

            <Button
             variant={'outline'}
             onClick={() => {
                setIsAddOpen(true);
              }}
              className="justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text="New User" icon={<PlusSquare className="h-5 w-5" />} />
            </Button>
            
            <div className="flex justify-between space-x-5 items-center py-4">
              

                <Button
                variant={'destructive'}
                onClick={() => {
                    downloadData(data, "Users-data")
                  }}
                  className="justify-start flex rounded-md p-2 transition-all duration-75"
                >
                  <IconMenu text="Export To Excel" icon={<DownloadIcon className="h-5 w-5" />} />
                </Button>
                
            </div>
</div>

              <DropdownMenuSeparator />

            <DataTable  columns={columns} data={data} />

      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="New User"
      >
        <AddForm setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>
        </div>
  );
}
// }
 