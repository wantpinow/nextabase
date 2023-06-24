import { Todo } from "@/types/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "../ui/icons"

export default function TodoCard({ todo }: { todo: Todo | string }) {
  return (
    <Card className="cursor-pointer bg-muted transition-all duration-300 hover:opacity-75">
      <CardHeader>
        <div className="flex items-center">
          {typeof todo !== "string" ? (
            todo.complete ? (
              <Icons.check className="mr-2 h-4 w-4" />
            ) : (
              <Icons.x className="mr-2 h-4 w-4" />
            )
          ) : null}
          <CardTitle>{typeof todo === "string" ? todo : todo.name}</CardTitle>
        </div>
      </CardHeader>
      {typeof todo !== "string" ? (
        <CardContent>
          <p>{todo.user_id}</p>
        </CardContent>
      ) : null}
    </Card>
  )
}
