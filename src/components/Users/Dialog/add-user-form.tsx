'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
// import { Loader2 } from 'lucide-react';
import {  useForm } from 'react-hook-form';
import * as z from 'zod';
// import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ModifArticleInSchema, USERS, USERS_EDIT } from '../../../../schemas';
// import { ComboboxCategory } from './combobox-role';
import {  addUser } from '../api/users-api';

import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function AddUserForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [productData, setProductData] = useState<any>(null);

  const { data: session, status } = useSession();

  const bearerData  = session?.user?.bearer;
 
  const form = useForm<z.infer<typeof USERS>>({
    resolver: zodResolver(USERS),
    defaultValues: {
      nom: '',
      email: '',
      mdp:  "",
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    
  
  }, []);

  const onSubmit = async (values: z.infer<typeof USERS>) => {
    try {
          // Submit the form data to your API here
    const response = await addUser(values, bearerData);
    
    if (response.Message) {      
      toast({
          title: "Adding...",
          description: response.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "FILD...",
        description: response.Erreur,
        })
      
    }
    
    setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


    const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid grid-cols-2 gap-4 sm:px-0 px-4"
      >

    <FormField
      name="nom"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>User Name</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="text"  
                placeholder="Bcl user" 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

    <FormField

      name="email"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>User Email </FormLabel>
            <FormControl>
                <Input {...field} id="email" type="email"  
                
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

  <FormField

      name="mdp"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input 
                  {...field} 
                  id="mdp" 
                  type="password"  
                  disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />
<div className=""></div>
<div className=""></div>
       
       
    <FormItem className='flex flex-row items-end justify-between '>
          
            <FormControl>
                <Button type='reset' onClick={()=>{setIsOpen(false)}} variant={'outline'}>Cancel</Button>
            </FormControl>
        
          <FormControl>
                <Button type='submit' variant={'default'}>Saving...</Button>
            </FormControl>
        </FormItem>
    
    
      </form>
    </Form>
  );
}
