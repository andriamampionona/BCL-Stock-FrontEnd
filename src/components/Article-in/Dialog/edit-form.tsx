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
import { updateArticle } from '../api/article-api';

import { useToast } from "@/components/ui/use-toast"
import { ComboboxPeriod } from './combobox-period';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  nomArticle: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
});

export default function EditForm({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [productData, setProductData] = useState<any>(null);

const [categories, setCategories] = useState<{ id: number, groupName: string }[]>([]);

const [periode, setPeriode] = useState<{ id: number, designation: string, dateDebut: string, dateFin: string  }[]>([]);

const { data: session, status } = useSession();
 
  const form = useForm<z.infer<typeof ModifArticleInSchema>>({
    resolver: zodResolver(ModifArticleInSchema),
    defaultValues: {
      nom: '',
      category: '',
      quantite: 1,
      pu:  1,
      periode:  '',
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()

  
  const bearerData = session?.user?.bearer

/**
 *  headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + bearerData,
        },
 */
  useEffect(() => {
    
  const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/article/in-modif/${cardId}`, 
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
          nom: response.data.nom || '',
          category: response.data.category || '',
          pu: response.data.pu || '',
          quantite: response.data.quantite || '',
          periode: response.data.periode || '',
        });

      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoadingData(false);
      }
    };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/groupe` , {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + bearerData,
        },
      });
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
          "Authorization": "Bearer " + bearerData,
        },
      });
      setPeriode(response.data);
    } catch (error) {
      console.error('Error fetching periode:', error);
    }
  };

    fetchPeriod();
    fetchProductData();
    fetchCategories();

  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof ModifArticleInSchema>) => {
    try {
          // Submit the form data to your API here
    const updateing = await updateArticle(cardId  , values, bearerData);
    
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
    return <div>Chargement des données...</div>;
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
            <FormLabel>Article Name</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="text"  
                placeholder="............." 
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
                  min={productData.quantite}
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
