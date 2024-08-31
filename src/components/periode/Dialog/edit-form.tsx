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
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ModifArticleInSchema, PERIODE } from '../../../../schemas';

import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getPeriodeByID, updatePeriode } from '../api/article-api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function EditFormPeriode({
  cardId,
  setIsOpen,
}: {
  cardId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [periodeData, setPeriodeData] = useState<any>(null);

const [categories, setCategories] = useState<{ id: number, groupName: string }[]>([]);

  const { data: session, status } = useSession();
 
  const form = useForm<z.infer<typeof PERIODE>>({
    resolver: zodResolver(PERIODE),
    defaultValues: {
      designation: '',
      dateDebut: new Date(),
      dateFin: new Date(), },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()

  
  const bearerData  = session?.user?.bearer;



  useEffect(() => {
    
  const fetchperiodeData = async () => {
      try {
        const response = await getPeriodeByID(cardId, bearerData)
       
        setPeriodeData(response);

        const dateDebut = response.dateDebut ? new Date(response.dateDebut) : '';
        const dateFin = response.dateFin ? new Date(response.dateFin) : '';


        form.reset({
          dateDebut: response.dateDebut || '',
          dateFin : response.dateFin || '',
          designation: response.designation || '',
         
        });


      } catch (error) {
        console.error('Error fetching Periode data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchperiodeData();

  }, [cardId]);

  
  const onSubmit = async (values: z.infer<typeof PERIODE>) => {
    try {
          // Submit the form data to your API here
    const updateing = await updatePeriode(cardId  , values, bearerData);
    
    if (updateing.Message) {      
      toast({
          title: "Updating...",
          description: updateing.Message,
        })
    }
    else{
      toast({
        variant: "destructive",
        title: "Updating Faild",
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
      name="designation"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Perode Designation</FormLabel>
            <FormControl>
                <Input {...field} id="nom" type="text"  
                placeholder="" 
                disabled = {isPending}
                
                />
                
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />


    <FormField
          control={form.control}
          name="dateDebut"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Begin Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2024-01-01")
                    }
                    
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {/* Your date of birth is used to calculate your age. */}
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />

    <FormField
          control={form.control}
          name="dateFin"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2024-01-01")
                    }
                    
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />

    <FormItem className='col-span-2 pt-8 md:col-span-1 '>
            <FormControl>
                <Button type='submit' size={'lg'} variant={'default'}>Saving...</Button>
            </FormControl>
        </FormItem>
    
  
      </form>
    </Form>
  );
}
