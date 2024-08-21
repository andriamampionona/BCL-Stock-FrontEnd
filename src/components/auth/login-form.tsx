"use client";
import React, { useEffect, useState } from "react"

import {
Card,
CardContent,
CardFooter,
CardDescription,
CardHeader,
CardTitle
} from '@/components/ui/card'

import { 
    Form, FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
 } from "@/components/ui/form";

 import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { LoginSchema } from "../../../schemas";
import { Loader2, LoaderCircle } from "lucide-react";

import { getCsrfToken, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";



const LoginForm = () => {

 
    const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Appeler useRouter de manière inconditionnelle
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      callbackUrl: "/dashboard"
    });

    if (res?.error) {
      setError(res.error);
    } else if (res?.url && mounted) {  // Assurez-vous que le composant est monté avant la redirection
      router.push(res.url);
    }
  };

  
    const isPending = form.formState.isSubmitting

    return(
       
        <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            >
                <FormField
                name="email"
                control={form.control}
                render={({field}) => (
                
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} id="email" type="email"  
                            placeholder="m@example.com" 
                            disabled = {isPending}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    

                )
                }
                />

                 <FormField
                name="password"
                control={form.control}
                render={({field}) => (
                
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} id="password" type="password"  
                            placeholder="***********" 
                            disabled = {isPending}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    

                )
                }
                />
                 {error && <p className="text-red-500">{error}</p>} {/* Affichage de l'erreur */}
      
                    
                    <Button type="submit">
                        {
                            isPending? <LoaderCircle  className="w-5 h-5 animate-spin"/> : 'Login'
                        }
                    </Button>

            </form>
        </Form>
        
       
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter> */}
    </Card>
    )

}

export default LoginForm;