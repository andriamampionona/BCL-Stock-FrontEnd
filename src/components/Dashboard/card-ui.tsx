"use client";
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { BadgeDollarSignIcon, BanIcon, EditIcon, ExpandIcon, HotelIcon, MoreHorizontal } from 'lucide-react';
import { CardData } from '../../../schemas';

export default function CardItem(props: CardData) {
  return (
    <div className="grid grid-col-3">
  
      <Card key={props.id} className="flex flex-col justify-between">
        {/* Card Content */}
        
        <CardHeader className='flex-row justify-between gap-4 item-center'>

             <div className="">
               <CardDescription className='text-lg'> {`${ props.label } ` } </CardDescription>

               <CardTitle>{ props.montant }</CardTitle>
              <p className='text-sm text-muted-foreground'> { `${props.nom} ` }</p>

            
             </div>
            
            <div className="">
              <BadgeDollarSignIcon></BadgeDollarSignIcon>
              
              </div>
                        
        
        </CardHeader>
        
      </Card>
  
</div>
  )
}
