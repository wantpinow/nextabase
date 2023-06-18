import supabase from "@/lib/supabase-browser"
import { useToast } from "@/components/ui/use-toast"

export default function useDatabase() {
  const { toast } = useToast()

  // select all todos
  const selectAllTodos = async (doToast: boolean = true) => {
    const { data, error } = await supabase.from("todo").select("*")
    if (error) {
      if (doToast) {
        toast({
          title: "Error (could not get todos)",
          description: error.message,
          variant: "destructive",
        })
      }
      return null
    }
    return data
  }

  // add a new todo
  const insertTodo = async (
    {
      userId,
      name,
    }: {
      userId: string
      name: string
    },
    doToast: boolean = true
  ) => {
    const { data, error } = await supabase
      .from("todo")
      .insert({ user_id: userId, name })
      .select("*")
      .single()
    if (error) {
      if (doToast) {
        toast({
          title: "Error (could not add todo)",
          description: error.message,
          variant: "destructive",
        })
      }
      return null
    }
    return data
  }

  // update a todo
  const updateTodo = async (
    {
      id,
      name,
      isPublic,
      complete,
    }: {
      id: string
      name: string
      isPublic: boolean
      complete: boolean
    },
    doToast: boolean = true
  ) => {
    const { data, error } = await supabase
      .from("todo")
      .update({ name, public: isPublic, complete })
      .eq("id", id)
      .select("*")
      .single()
    if (error) {
      if (doToast) {
        toast({
          title: "Error (could not update todo)",
          description: error.message,
          variant: "destructive",
        })
      }
      return null
    }
    return data
  }

  return {
    selectAllTodos,
    insertTodo,
    updateTodo,
  }
}
