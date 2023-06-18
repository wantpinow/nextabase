import { createClient, fetchServerSession } from "@/lib/supabase-server"
import TodoCard from "@/components/todos/card"
import EditTodo from "@/components/todos/edit"
import EditableTodos from "@/components/todos/editable-todos"
import NewTodo from "@/components/todos/new"
import StaticTodos from "@/components/todos/static-todos"

export default async function DashboardPage() {
  // get current user
  const session = await fetchServerSession()
  const user = session?.user
  if (!user) return null

  // fetch all todos
  const supabase = createClient()
  const { data: todos, error: todosError } = await supabase
    .from("todo")
    .select("*")

  // get all todos for current user
  const userTodos = todos?.filter((todo) => todo.user_id === user.id) ?? []

  // get all todos for other users
  const otherTodos = todos?.filter((todo) => todo.user_id !== user.id) ?? []

  return (
    <div>
      <section className="prose mb-4 dark:prose-invert">
        <h1>Todo Lists</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          repudiandae eum consequatur deleniti ea, tempore placeat non minus
          dignissimos commodi! Excepturi illum commodi dignissimos aut,
          consectetur facere cupiditate ipsum voluptas!
        </p>
      </section>
      <EditableTodos todos={userTodos} />

      {otherTodos.length > 0 ? <StaticTodos todos={otherTodos} /> : null}
    </div>
  )
}
