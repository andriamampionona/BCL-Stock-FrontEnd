"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type CHARTDATA = {
    period: string,
    Boisson: number,
    Cuisine: number,
    "Fourniture de bureau": number,
    "Gaz et Gasoil": number,
    "Légumme": number,
    "Materiel Chambre": number,
    "Materiel Cuissine": number,
    "Materiel Reception": number,
    "Materiel-Info": number,
    "Nettoyant": number
}


const chartConfig = {
  Boisson: {
    label: "Boisson",
    color: "hsl(var(--chart-1))",
  },
  Cuisine: {
    label: "Cuisine",
    color: "hsl(var(--chart-2))",
  },
  "Fourniture de bureau": {
    label: "F/ture.bureau",
    color: "hsl(var(--chart-3))",
  },
  
  "Materiel Chambre": {
    label: "Mat.Chambre",
    color: "hsl(var(--chart-4))",
  },
  "Materiel Cuissine": {
    label: "Mat.Cuissine",
    color: "hsl(var(--chart-5))",
  },

  "Gaz et Gasoil": {
    label: "Gaz et Gasoil",
    color: "hsl(var(--chart-1))",
  },
  "Légumme": {
    label: "Légumme",
    color: "hsl(var(--chart-2))",
  },
  "Materiel Reception": {
    label: "Mat.Reception",
    color: "hsl(var(--chart-3))",
  },
  "Materiel-Info": {
    label: "Mat-Info",
    color: "hsl(var(--chart-4))",
  },
  "Nettoyant": {
    label: "Nettoyant",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;


export function PeriodChart() {

  const [data, setData] = useState<CHARTDATA []>([]);
  const { data: session, status } = useSession();

  const bearerData = session?.user?.bearer


    useEffect(() => {
   

    const fetchData = async () => {
        try {

        const res = await fetch(apiUrl + "/article/transformed-data", {
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
      };
      fetchData();

  }, []);


  return (
    <Card className="w-full h-full">
      <CardHeader>
        
        <CardDescription  className="text-lg">Mount per period</CardDescription>
       
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key as keyof typeof chartConfig].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
