import React, { useEffect, useState } from 'react'
import CardItem from './card-ui'
import { getTotalArticle, getTotalArticleOut } from './api';
import { CardData } from '../../../schemas';
import { PeriodChart } from './charts/quatity-per-period';
import { AreaChartArticle } from './charts/area-chart-per-article';
import { StockIndicatorChart } from './charts/Stock-chart';
import { ScrollArea } from '../ui/scroll-area';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';




export default function HomePage() {

    const [montant, setMotant] = useState('')
    const [montantOut, setMotantOut] = useState('')

  const { data: session, status } = useSession();

  const bearerData = session?.user?.bearer;

  const router = useRouter();

  useEffect(()=>{
            
  console.log(bearerData);


    if (status === "loading") return; // Ne rien faire si le statut est "loading"
    
    if (status === "unauthenticated") {
      router.replace("/sing-in");  // Redirection vers la page de connexion
    } else {
     
     const fetchData = async () => {
        
            const montant = await  getTotalArticle(bearerData);
            const montantout = await  getTotalArticleOut(bearerData);

            setMotant(montant)
            setMotantOut(montantout)
        };
      fetchData();

    
    }
       

    }, [])
  return (
   
        <ScrollArea className=' pr-5'>

    <div className='flex flex-col m-0 gap-4'>

      
        <div className="flex-row flex justify-between gap-4 item-center">
            <p>Dashboard</p>
            


        </div>
        <div className="flex-row flex justify-between gap-4 item-center">
            <CardItem id={"1"} label='Total In' montant={`Ar ${montant}`} nom='10% from today' />
            <CardItem id={"2"} label='Total Out' montant={`Ar ${montantOut}`} nom='11% from today' />
        </div>
        
        {/* Cart and ... */}
        <div className="flex-row flex justify-start gap-4 item-center">

          <PeriodChart  />
          {/* <StockIndicatorChart /> */}
        </div>

        {/* <AreaChartArticle /> */}

    </div>
</ScrollArea>

  )
}
