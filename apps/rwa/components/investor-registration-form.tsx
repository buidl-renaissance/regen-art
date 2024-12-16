"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { toast } from "@libs/shadcn-ui/hooks/use-toast"
import { Button, Box, Typography } from '@mui/material';

import { useWallet } from '@gods.work/ui';
import { registerInvestor } from '@gods.work/web3';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  // email: z.string().email({
  //   message: "Please enter a valid email address.",
  // }),
  // password: z.string().min(8, {
  //   message: "Password must be at least 8 characters.",
  // }),
  // confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
})

export function InvestorRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { isConnected, connectWallet, userAddress } = useWallet();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // email: "",
      // password: "",
      // confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true)
      // In a real application, you would send this data to your API here
      console.log(values)

      setIsLoading(true);
      setError('');
      setSuccess(false);

      try {
        await registerInvestor({
          name: values.name
        });
        setSuccess(true);
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Please wait for admin verification.",
        })
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Registration Failed",
          description: err.message,
        })
      } finally {
        setIsLoading(false);
      }

      // setTimeout(() => {
      //   setIsLoading(false)
      //   router.push('/login')
      // }, 2000)
  }

  if (!isConnected) {
    return (
      <div>
        <Box>
          <Typography variant="body1" gutterBottom>
            Get started by connecting your wallet.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={connectWallet}
          sx={{ mb: 2 }}
          disabled={isConnected}
        >
          {isConnected ? `Connected: ${userAddress}` : 'Connect Wallet'}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Your password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Please confirm your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  )
}

