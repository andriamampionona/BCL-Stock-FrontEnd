import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import MobilNav from "@/components/mobil-nav";
import { CircleUser, LogOut, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { useSearchParams } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { ShearchSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { addArticle, updateSelectPeriod } from './Article-in/api/article-api';
import { ComboboxPeriod } from './Article-in/Dialog/combobox-period';
import { toast, useToast } from './ui/use-toast';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {

  const {toast} = useToast()
  
  const router = useRouter();
  const { data: session, status } = useSession(); // protection de la page

  const searchParams = useSearchParams();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const bearerData  = session?.user?.bearer;
  useEffect(() => {
    const queryContent = searchParams?.get('content');
    if (queryContent) {
      setSelectedContent(queryContent);
    } else {
      setSelectedContent('dashboard'); // Valeur par défaut si `content` n'est pas dans l'URL
    }
  }, [searchParams]);

  const handleLinkClick = (content: string) => {
    setSelectedContent(content);
    router.push(`?content=${content}`);
  };


    const form = useForm<z.infer<typeof ShearchSchema>>({
    resolver: zodResolver(ShearchSchema),
    defaultValues: {  
      periode: "",
    },

  });

  
const onSubmit = async (values: z.infer<typeof ShearchSchema>) => {
    try {
          // Submit the form data to your API here
    const response = await updateSelectPeriod(values, bearerData);
   
    } catch (error) {
      console.log(error);
    }
  };



   const handleLogout = async () => {
     try {
      // Envoyer une requête au backend pour gérer la déconnexion
      const response = await fetch(`${apiUrl}/deconnection`, { // Modifier avec votre URL API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerData}` // Utilisez le token si nécessaire
        },
      });

      if (!response.ok) {
       toast({
        title: "Error",
        variant: 'destructive',
        description : 'You are not disconnected'
       })
      }


      toast({
        title: "Disconnected",
        variant: 'default',
        description : 'You are disconnected.'
       })
      // Déconnecter l'utilisateur côté client
      await signOut({ redirect: true });
    
    } catch (error) {
     console.log(error)
    }

  };

  
  return (
    
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobilNav onLinkClick={handleLinkClick} activeContent={selectedContent}  />
          <div className="w-full flex-1">
            
              <Form {...form} >
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="relative flex items-start justify-start grid-cols-6 pb-4  gap-4 sm:px-2 px-4"
                    >
                    
                <FormItem className="flex flex-col space-y-2 mt-3 col-span-1  md:col-span-1">
                  <div className="w-full">
                    
                    
                    <ComboboxPeriod
                      selectedValue={form.watch('periode') || ''}
                      onValueChange={(newValue) => {
                        form.setValue('periode', newValue);
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>

                <FormItem className=" flex flex-col space-y-2 mt-3 col-span-1  md:col-span-1">
                 
                 <Button type='submit' variant={'outline'} >Ok</Button>
                </FormItem>
                      </form>
                </Form>
                          

       
       
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              onClick={() => {
                handleLogout();

              }}>

                Logout 
                
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
  )
}
