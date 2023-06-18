"use client"

import { useEffect, useState } from "react"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/components/auth/auth-provider"
import TodoCard from "@/components/todos/card"

const formSchema = z.object({
  name: z.string().min(1, "Please enter a todo"),
  public: z.boolean(),
  complete: z.boolean(),
})

export default function EditTodo({
  todo,
  setTodos,
}: {
  todo: Todo
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { updateTodo } = useDatabase()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: todo.name,
      public: todo.public,
      complete: todo.complete,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return
    setLoading(true)

    // update todo
    const updatedTodo = await updateTodo({
      id: todo.id,
      name: values.name,
      isPublic: values.public,
      complete: values.complete,
    })

    // reset form
    if (updatedTodo) {
      setTodos((prevTodos) => [
        updatedTodo,
        ...prevTodos.filter((t) => t.id !== todo.id),
      ])
      setDialogOpen(false)
    }
    setLoading(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <TodoCard todo={todo} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-600px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Update Todo</DialogTitle>
              <DialogDescription>
                Update your todo with a new name, mark it as complete, or make
                it public.
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
            <FormField
              control={form.control}
              name="complete"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Complete</FormLabel>
                    <FormDescription>
                      Mark this todo as complete.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Public</FormLabel>
                    <FormDescription>
                      Allow others to see this todo.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                loading={loading}
                loadingText="Updating..."
                type="submit"
                className="w-full"
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
