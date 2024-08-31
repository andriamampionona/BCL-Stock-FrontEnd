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
import { ModifArticleInSchema } from '../../../../schemas';
import { ComboboxCategory } from './combobox-category';
import { addArticle } from '../api/article-api';

import { useToast } from "@/components/ui/use-toast"
import { ComboboxPeriod } from './combobox-period';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function AddForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  
const [categories, setCategories] = useState<{ id: number, groupName: string }[]>([]);
const [periode, setPeriode] = useState<{ id: number, designation: string, dateDebut: string, dateFin: string  }[]>([]);

  const { data: session, status } = useSession();
 
  const bearerData = session?.user?.bearer


  const form = useForm<z.infer<typeof ModifArticleInSchema>>({
    resolver: zodResolver(ModifArticleInSchema),
    defaultValues: {
      nom: '',
      category: '',
      quantite: 1,
      pu:  1,
      periode:  "",
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/groupe`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + bearerData,
        },
      });
      console.log("Category", response.data)
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
   const fetchPeriod = async () => {
    try {
      const response = await axios.get(`${apiUrl}/periode`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + session?.user?.bearer,
        },
      });
      setPeriode(response.data);
      console.log("Periode",response.data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

    fetchCategories();
    fetchPeriod();

  }, []);

  const onSubmit = async (values: z.infer<typeof ModifArticleInSchema>) => {
    try {
          // Submit the form data to your API here
    const response = await addArticle( values,bearerData);
    
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid grid-cols-2 gap-4 sm:px-0 px-4"
      >


<FormField
      name="nom"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 w-[870px] sm:w-[500px]  md:col-span-1'>
            <FormLabel>Article Name</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="text"  
                placeholder="" 
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />
    <div className=""></div>
<FormItem className="flex flex-col space-y-2 mt-3 col-span-2 md:col-span-1">
  <FormLabel className="text-left">Periode</FormLabel>
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


<FormItem className="flex flex-col space-y-2 mt-3 col-span-2 md:col-span-1">
  <FormLabel className="text-left">Category</FormLabel>
  <div className="w-full">
    <ComboboxCategory
      selectedValue={form.watch('category') || ''}
      onValueChange={(newValue) => {
        form.setValue('category', newValue);
      }}
    />
  </div>
  <FormMessage />
</FormItem>



    <FormField

      name="pu"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Unit Price</FormLabel>
            <FormControl>
                <Input {...field} id="pu" type="number"  
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

  <FormField

      name="quantite"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
                <Input 
                  {...field} 
                  id="quantite" 
                  type="number"  
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  disabled = {isPending}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />

    <FormItem className='col-span-2 md:col-span-1'>
            <FormControl>
                <Button type='submit' variant={'default'}>Saving...</Button>
            </FormControl>
        </FormItem>
    
    
       
      </form>
    </Form>
  );
}
