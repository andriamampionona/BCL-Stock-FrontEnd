"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

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
  Boisson: { label: "Boisson", color: "hsl(var(--chart-1))" },
  Cuisine: { label: "Cuisine", color: "hsl(var(--chart-2))" },
  "Fourniture de bureau": { label: "Fourniture de bureau", color: "hsl(var(--chart-3))" },
  "Gaz et Gasoil": { label: "Gaz et Gasoil", color: "hsl(var(--chart-4))" },
  Légumme: { label: "Légumme", color: "hsl(var(--chart-5))" },
  "Materiel Chambre": { label: "Materiel Chambre", color: "hsl(var(--chart-1))" },
  "Materiel Cuissine": { label: "Materiel Cuissine", color: "hsl(var(--chart-2))" },
  "Materiel Reception": { label: "Materiel Reception", color: "hsl(var(--chart-3))" },
  "Materiel-Info": { label: "Materiel-Info", color: "hsl(var(--chart-4))" },
  Nettoyant: { label: "Nettoyant", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function AreaChartArticle() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const [data, setData] = React.useState<CHARTDATA []>([]);

  const router = useRouter();

  const { data: session, status } = useSession();

  

  const bearerData = session?.user?.bearer
 
  React.useEffect(() => {
   
    if (status === "unauthenticated") {
      router.push("/sing-in");
    } else if (status === "authenticated") {
     
    }
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

  
  const filteredData = data.filter((item) => {
    const date = new Date(item.period);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.keys(chartConfig).map((key) => (
                <linearGradient id={`fill${key}`} x1="0" y1="0" x2="0" y2="1" key={key}>
                  <stop
                    offset="5%"
                    stopColor={chartConfig[key].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[key].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill${key})`}
                stroke={chartConfig[key].color}
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
