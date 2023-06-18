import { Todo } from "@/types/supabase"
import TodoCard from "@/components/todos/card"

export default function StaticTodos({ todos }: { todos: Todo[] }) {
  return (
    <section className="mb-4">
      <h1 className="text-right text-xl font-semibold mb-2">Others' Todos</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  )
}
