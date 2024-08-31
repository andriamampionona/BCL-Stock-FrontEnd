"use client";
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/use-media-query';


import {
Card,
CardContent,
CardFooter,
CardDescription,
CardHeader,
CardTitle
} from '@/components/ui/card'



export default function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">
              
               {title ?  (
              <span>{title}</span>
            ) : <span>Article Updating...</span>
            } 

              
              </CardTitle>
           
            {description ?  (
              <CardDescription>{description}</CardDescription>
            ) : <CardDescription>Fill out this form and submit it to update this article.</CardDescription>
            } 
          </CardHeader>
          <CardContent className="grid gap-4">

          {children}

           </CardContent>

    </Card>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}