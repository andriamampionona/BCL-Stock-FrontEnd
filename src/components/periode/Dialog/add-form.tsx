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
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { PERIODE } from '../../../../schemas';

import { useToast } from "@/components/ui/use-toast"
import { addperiode } from '../api/article-api';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from "@/lib/utils"

import { format } from "date-fns"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export default function AddPeriodeForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loadingData, setLoadingData] = useState(true);
  const [productData, setProductData] = useState<any>(null);

const [Periode, setPeriode] = useState<{ id: number, groupName: string }[]>([]);

  const { data: session, status } = useSession();
 
  const form = useForm<z.infer<typeof PERIODE>>({
    resolver: zodResolver(PERIODE),
    defaultValues: {
      designation: '',
      dateDebut: new Date(),
      dateFin: new Date(),
    },

  });

  const isLoading = form.formState.isSubmitting;

   const { toast } = useToast()


  useEffect(() => {
    
  const fetchPeriode = async () => {
    try {
      const response = await axios.get(`${apiUrl}/periode`, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer " + session?.user?.bearer,
        },
      });
      setPeriode(response.data);
    } catch (error) {
      console.error('Error fetching Periode:', error);
    }
  };

    fetchPeriode();

  }, []);

  const onSubmit = async (values: z.infer<typeof PERIODE>) => {
    try {
          // Submit the form data to your API here
    const response = await addperiode( values);
    
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
         className="grid grid-cols-1 gap-4 sm:px-0 px-4"
      >

  <FormField
      name="designation"
      control={form.control}
      render={({field}) => (

        <FormItem className='col-span-2 md:col-span-1'>
            <FormLabel>Perod Title</FormLabel>
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

<div className="grid grid-cols-2 mt-4 gap-4 sm:px-0 px-4">
    <FormField
          control={form.control}
          name="dateDebut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                    initialFocus
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
            <FormItem className="flex flex-col">
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
                    disabled={(date) =>  date < new Date("2024-01-01")
                    }
                    initialFocus
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

</div>
    


    <FormItem className='col-span-2 md:col-span-1'>
            <FormControl>
                <Button type='submit' variant={'default'}>Saving...</Button>
            </FormControl>
        </FormItem>
    
    
       
      </form>
    </Form>
  );
}
