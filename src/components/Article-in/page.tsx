import { useRouter } from "next/navigation";
import { AarticleIn, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ArticleInPage() {
  const [data, setData] = useState<AarticleIn[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sing-in");
    } else if (status === "authenticated") {
      const fetchData = async () => {
        try {

        const res = await fetch("http://127.0.0.1:8080/bcl/stock/api/article/in", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " +session?.user?.bearer,
          },
         
        });
        const user = await res.json();

        console.log(user);
      
          setData(user);
          
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [status, router, session]);

  if (loading) {
    return <div>Chargement...</div>;
  }


  if (status === "authenticated") { // User authenticated .........
      return (
        <div className="container mx-auto py-10">
            
            <DataTable columns={columns} data={data} />
        </div>
  );
}
}
 