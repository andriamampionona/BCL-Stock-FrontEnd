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
import { zodResolver } from '@hookform/resolvers/zod';
// import {} from 'lucide-react';
import {  useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { EditGroupSchema, ModifArticleInSchema } from '../../../../schemas';

import { useToast } from "@/components/ui/use-toast"
import { addGroupe } from '../api/group-api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  nomArticle: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
});

export default function AddForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {

  const { data: session, status } = useSession();
 
  const bearerData  = session?.user?.bearer;

  const form = useForm<z.infer<typeof EditGroupSchema>>({
    resolver: zodResolver(EditGroupSchema),
    defaultValues: {
     groupName: '',
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    

  }, []);

  const onSubmit = async (values: z.infer<typeof EditGroupSchema>) => {
    try {
      
    const response = await addGroupe( values, bearerData);
    
    if (response.Message) {      
      toast({
          title: "Adding: successfull...",
          description: response.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "Adding : faild...",
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
   <div className="m-4">
     <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid gap-4 sm:px-0 px-4 "
      >

    <FormField
      name="groupName"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Group Name</FormLabel>
            <FormControl>
                <Input {...field} id="groupName" type="text"  
                placeholder="any group name" 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />





    <FormItem className='col-span-2 space-x-5 md:col-span-1'>
            <FormControl>
                <Button type='reset' onClick={()=> setIsOpen(false)} variant={'outline'}>Cancelling</Button>
            </FormControl>

            <FormControl>
                <Button type='submit' variant={'default'}>Saving...</Button>
            </FormControl>
        
    </FormItem>
    
    
       
      </form>
    </Form>
   </div>
  );
}
