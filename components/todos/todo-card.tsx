import { Todo } from "@/types/supabase"

export default function TodoCard({ todo }: { todo: Todo }) {
  return <div>{todo.name}</div>
}
