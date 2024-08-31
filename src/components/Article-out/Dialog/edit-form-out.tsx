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
import {  EditArticleOuSchema } from '../../../../schemas';
import { ComboboxCategory } from './combobox-category';

import { useToast } from "@/components/ui/use-toast"
import { updateOutArticle } from './api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export default function EditForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [productData, setProductData] = useState<any>(null);

  const { data: session, status } = useSession();
 
  const form = useForm<z.infer<typeof EditArticleOuSchema>>({
    resolver: zodResolver(EditArticleOuSchema),
    defaultValues: {
      description: '',
      quantite: "",
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()

  const bearerData = session?.user?.bearer


  useEffect(() => {
    
  const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/article/out-modif/${cardId}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + bearerData,
            },
          }
        );
        setProductData(response.data);
         // Réinitialiser les valeurs du formulaire avec les données chargées
        form.reset({
          
          description: response.data?.description || '',
          quantite: response.data?.quantite || '',
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingData(false);
      }
    };

 

    fetchProductData();
 
  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof EditArticleOuSchema>) => {
    try {
          // Submit the form data to your API here
    const updateing = await updateOutArticle(cardId  , values, bearerData);
    
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
    return <div>Data Loading...</div>;
  }
    const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid grid-cols-2 gap-4 sm:px-0 px-4"
      >

    <FormField
      name="quantite"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>New  quantity</FormLabel>
            <FormControl>
                <Input {...field} id="quantite" type="number" max={productData.quantite + productData.stock}  min={1}
                placeholder=""
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
            <FormLabel>Unit Price</FormLabel>
            <FormControl>
                <Input {...field} id="description" type="text"  
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />



    <FormItem className='col-span-2 md:col-span-1'>
            <FormControl>
                <Button type='submit' variant={'outline'}>Saving...</Button>
            </FormControl>
        </FormItem>
    
    
       
      </form>
    </Form>
  );
}
