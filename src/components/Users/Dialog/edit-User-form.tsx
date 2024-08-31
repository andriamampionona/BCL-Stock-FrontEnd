'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ModifArticleInSchema, USERS_EDIT } from '../../../../schemas';

import { useToast } from "@/components/ui/use-toast"
import { getUserByID, updateUser } from '../api/users-api';
import { ComboboxRole } from './combobox-role';
import { Switch } from '@/components/ui/switch';
import { tree } from 'next/dist/build/templates/app-page';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export default function EditUserForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [userDAta, setUserDAta] = useState<any>(null);


  const { data: session, status } = useSession();

  const bearerData  = session?.user?.bearer;
  
 
  const form = useForm<z.infer<typeof USERS_EDIT>>({
    resolver: zodResolver( USERS_EDIT),
    defaultValues: {
     actif: true,
     email: "",
     nom:"",
     mdp:"",
     role:""
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    
  const fetchuserDAta = async () => {
      try {
        const response = await getUserByID(cardId, bearerData);

        setUserDAta(response);

        form.reset({
          nom: response.nom || '',
          role: response.role || '',
          mdp: "",
          email: response.email,
        });

      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoadingData(false);
      }
    };


    fetchuserDAta();

  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof USERS_EDIT>) => {
    try {
          // Submit the form data to your API here
    const updateing = await updateUser(cardId  , values, bearerData);
    
    if (updateing.Message) {      
      toast({
          title: "Updating : successfull...",
          description: updateing.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "Updating : faild...",
        description: updateing.Erreur,
        })
      
    }
    
    setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingData) {
    return <div>Loading data ...</div>;
  }
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
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="text"  
                placeholder="bcl" 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

<FormItem className="flex flex-col space-y-2 mt-3 col-span-2 md:col-span-1">
  <FormLabel className="text-left">Role</FormLabel>
  <div className="w-full">
    <ComboboxRole
      selectedValue={form.watch('role') || ''}
      onValueChange={(newValue) => {
        form.setValue('role', newValue);
      }}
    />
  </div>
  <FormMessage />
</FormItem>



    <FormField
      name="email"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>E-Mail</FormLabel>
            <FormControl>
                <Input {...field} id="email" type="email"  
                min={0}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
            <FormLabel>New Password</FormLabel>
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


 <FormField

              
              control={form.control}
              name="actif"
              render={({ field }) => (
                <FormItem className="min-w-96 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                     Is User Active ?
                    </FormLabel>
                    <FormDescription>
                      An active user have access in this app, sign in, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
<div className=""></div>


        <FormItem className='col-span-2 space-x-4 md:col-span-1'>
            <FormControl>
                <Button type='reset'
                 onClick={()=>setIsOpen(false)}
                 variant={'outline'}>Cancel...</Button>
            </FormControl>
            <FormControl>
                <Button type='submit' variant={'default'}>Saving...</Button>
            </FormControl>
        </FormItem> 
      </form>
    </Form>
  );
}
