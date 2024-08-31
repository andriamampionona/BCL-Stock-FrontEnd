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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { OutArticleInSchema } from '../../../../schemas';
import { createOutArticle, updateArticle } from '../api/article-api';

import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function OutForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [productData, setProductData] = useState<any>(null);

  const { data: session, status } = useSession();
 
  const bearerData = session?.user?.bearer
  const form = useForm<z.infer<typeof OutArticleInSchema>>({
    resolver: zodResolver(OutArticleInSchema),
    defaultValues: {
      description: "",
      quantite: "",
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    
  const fetchProductOutData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/article/in-out/${cardId}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " +bearerData,
            },
          }
        );
        setProductData(response.data);

      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProductOutData();

  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof OutArticleInSchema>) => {
    try {
          // Submit the form data to your API here
    const updateing = await createOutArticle(cardId  , values,bearerData);
    
    if (updateing.Message) {      
      toast({
          title: "Out : successfull...",
          description: updateing.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "OUT : faild...",
        description: updateing.Erreur,
        })
      
    }
    
    setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingData) {
    return <div>Data  Loading ....</div>;
  }
    const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid gap-4 sm:px-0 px-4"
      >

    <FormField
      name="quantite"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>New quantity</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="number" min={1} max={productData.stock}  
                placeholder="1" 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />




    <FormField

      name="description"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Description</FormLabel>
            <FormControl>
                <Input {...field} id="description" placeholder='same description...' type="text"
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

    
        <FormItem className='col-span-2 flex flex-auto gap-6 items-end md:col-span-1'>
            <FormControl>
                <Button type='reset' onClick={()=>{setIsOpen(false)}} variant={'outline'}>Cancel...</Button>
            </FormControl>

            <FormControl>
                <Button type='submit' variant={'secondary'}>Saving...</Button>
            </FormControl>

        </FormItem>  
        
      
       
      </form>
    </Form>
  );
}
