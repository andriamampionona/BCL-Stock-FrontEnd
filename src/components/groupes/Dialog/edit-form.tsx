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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { EditGroupSchema, ModifArticleInSchema } from '../../../../schemas';

import { useToast } from "@/components/ui/use-toast"
import { getGroupeByID, updateGroupe } from '../api/group-api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export default function EditGroupForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  
  const [loadingData, setLoadingData] = useState(true);

  const [categories, setCategories] = useState<any>();

  const { data: session, status } = useSession();
 
  const form = useForm<z.infer<typeof EditGroupSchema>>({
    resolver: zodResolver(EditGroupSchema),
    defaultValues: {
      groupName: '',
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
  const fetchGroupes = async () => {
      try {
        const a = await getGroupeByID(cardId); // Ensure await is used here
        setCategories(a); // Set the resolved value of the promise

        form.reset({
         groupName: a.groupName,
        });

      } catch (error) {
        console.error('Failed to fetch groupes:', error);
      }
      finally {
        setLoadingData(false);
      }
    };

    fetchGroupes(); // Call the async function inside useEffect
    
   

  

  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof EditGroupSchema>) => {
    try {
          // Submit the form data to your API here
    const updateing = await updateGroupe(cardId  , values);
    
    if (updateing.Message) {      
      toast({
          title: "Updating : successfull...",
          description: updateing.Message,
        })
    }
    else{
      
      
    }
    
    setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error...",
        description: error+ "",
        })
    }
  };

  if (loadingData) {
    return <div>Loading...</div>;
  }
    const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid gap-4 sm:px-0 px-4"
      >

    <FormField
      name="groupName"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Group Name</FormLabel>
            <FormControl>
                <Input {...field} id="groupName" type="text"  
                placeholder='' 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />





    <FormItem className='col-span-2 gap-3 space-x-9 md:col-span-1'>
            <FormControl>
                <Button 
                  type='reset'
                  variant={'outline'}
                  onClick={()=> setIsOpen(false)}

            >
              Cancelling...
            </Button>
              
            </FormControl>
            <FormControl>
            
                <Button 
                  type='submit' 
                  variant={'default'}
                >
                  Saving...
                </Button>
            </FormControl>
        </FormItem>
    
    
       
      </form>
    </Form>
  );
}
