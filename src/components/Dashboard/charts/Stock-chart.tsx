"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import { getDataStockForChart } from "@/components/Article-in/api/article-api"
import { STOCK_DATA } from "../../../../schemas"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession } from "next-auth/react"
const chartData = [{ month: "january", quantity: 1260, stock: 570 }]





const chartConfig = {
  qte: {
    label: "Quantity",
    color: "hsl(var(--chart-1))",
  },
  stock: {
    label: "Stock",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StockIndicatorChart() {
  
  const [data, setData] = useState<STOCK_DATA[]>([])
  const totalVisitors = chartData[0].quantity + chartData[0].stock
  const { data: session, status } = useSession();

  const bearerData = session?.user?.bearer;

  const fetchData = async () => {
    const data1 = await getDataStockForChart(bearerData);
    setData(data1);

  }

  useEffect(()=>{

    fetchData();

  }, [])
  return (
    <Card className="flex w-1/2 flex-col h-1/3">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock viewer</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <ScrollArea >
      <CardContent className="flex flex-col  items-center pb-0">
        
        <ChartContainer
          config={chartConfig}
          className="mx-auto  aspect-square border-spacing-1 bg-slate-300 h-1/4  w-1/4 max-w-[250px]"
        >
          
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-sm font-semibold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="quantity"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-quantity)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="stock"
              fill="var(--color-stock)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-25 max-w-[50px]"
        >
          
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-sm font-semibold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="quantity"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-quantity)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="stock"
              fill="var(--color-stock)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>

      </CardContent>
      
      </ScrollArea>
      <CardFooter className="flex-col gap-2 text-sm">
       
      </CardFooter>
    </Card>
  )
}
