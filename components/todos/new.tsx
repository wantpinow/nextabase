"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Todo } from "@/types/supabase"
import useDatabase from "@/hooks/supabase/use-database"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth/auth-provider"
import TodoCard from "@/components/todos/card"

const formSchema = z.object({
  name: z.string().min(1, "Please enter a todo"),
})

export default function NewTodo({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { insertTodo } = useDatabase()
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return
    setLoading(true)

    // add new todo
    const newTodo = await insertTodo({
      userId: user.id,
      name: values.name,
    })

    // reset form
    if (newTodo) {
      setTodos((prevTodos) => [newTodo, ...prevTodos])
      form.reset()
      setDialogOpen(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <TodoCard todo="New Todo" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-6"
          >
            <DialogHeader>
              <DialogTitle>New Todo</DialogTitle>
              <DialogDescription>
                Add a new todo to your list. This will only be visible to you.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Something to do..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                loading={loading}
                loadingText="Adding..."
                type="submit"
                className="w-full"
              >
                Add Todo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
