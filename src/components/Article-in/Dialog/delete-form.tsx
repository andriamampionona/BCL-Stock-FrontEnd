'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { deleteArticle } from '../api/article-api';
import { useToast } from '@/components/ui/use-toast';
import { ComboboxCategory } from './combobox-category';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  cardId: z.number(),
});

export default function DeleteForm({
  cardId,
  setIsOpen,
}: {
  cardId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardId: cardId,
    },
  });

    
    const { data: session, status } = useSession();
 
  const bearerData = session?.user?.bearer


  const isLoading = form.formState.isSubmitting;

  const { toast } = useToast()

  const onSubmit = async () => {
    try {
      const response = await deleteArticle(cardId+"", bearerData);

      if (response.Message) {
         toast({
          title: "Deletng : successfull...",
          description: response.Message,
        })
      }
      else{
         toast({
          title: "Deletng : faild...",
          description: response.Erreur,
        })
      }
      setIsOpen(false);
    } catch (error) {
       toast({
          variant: 'destructive',
          title: "Deletng : faild...",
          description: "error.message",
        })
    }
    setIsOpen(false)
  };

  return (
     <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
         className="grid gap-4 sm:px-0 px-4"
      >

        
    <FormField
    
      name="cardId"
      control={form.control}
      render={({field}) => (

        <FormItem className='hidden col-span-2 md:col-span-1'>
            <FormControl>
                <Input {...field} id="cardId" type="number"
                disabled = {true}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )
      }
    />
<div className="flex  justify-between space-x-1 items-center py-4">
  <FormItem className='col-span-2 md:col-span-1'>
        <FormControl>
            
            <Button
            size="lg"
            type="reset"
            variant="outline"
            disabled={isLoading}
            className="w-full hidden sm:block"
            
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </FormControl>
      </FormItem>

       <FormItem className='col-span-2 md:col-span-1'>
        <FormControl>
            <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            
            className="w-full bg-red-500 hover:bg-red-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </FormControl>
      </FormItem>
    
</div>
    
    
       
      </form>
    </Form>
  );
}

