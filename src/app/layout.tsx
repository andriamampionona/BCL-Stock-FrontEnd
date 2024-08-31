import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/toaster"

import { TooltipProvider } from '@radix-ui/react-tooltip';  // Assurez-vous que vous importez depuis le bon module
import { ScrollArea } from "@/components/ui/scroll-area";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BCL Stock manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className}  suppressHydrationWarning>
          
           
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Provider> 
          <TooltipProvider>
              <ScrollArea className='h-full'>

                {children}

              </ScrollArea>
              <Toaster />
          </TooltipProvider>
        </Provider>
        

          </ThemeProvider>

      </body>
    </html>
  );
}
