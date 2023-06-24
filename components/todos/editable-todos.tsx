"use client"

import { useState } from "react"

import { Todo } from "@/types/supabase"
import EditTodo from "@/components/todos/edit"
import NewTodo from "@/components/todos/new"

export default function EditableTodos({
  todos: initialTodos,
}: {
  todos: Todo[]
}) {
  const [todos, setTodos] = useState(initialTodos)

  return (
    <section className="mb-4">
      <h1 className="mb-2 text-right text-xl font-semibold">Your Todos</h1>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <NewTodo setTodos={setTodos} />
        {todos.map((todo) => (
          <EditTodo key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </div>
    </section>
  )
}
