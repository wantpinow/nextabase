import { createClient, fetchServerSession } from "@/lib/supabase-server"
import NewTododCard from "@/components/todos/new-card"
import TodoCard from "@/components/todos/todo-card"

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

  // get current user's todos and other users' todos
  const usersTodos = todos?.filter((todo) => todo.user_id === user.id) ?? []
  const othersTodos = todos?.filter((todo) => todo.user_id !== user.id) ?? []

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
      <section className="mb-4">
        <p className=" text-right">Your Todos</p>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <NewTododCard />
          {usersTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      </section>
    </div>
  )
}
