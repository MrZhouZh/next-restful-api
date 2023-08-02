import { notFound } from "next/navigation"
import Todo from "~/app/components/Todo"
import { fetchTodo } from "~/libs/fetchTodos"

export const revalidate = 0

type Props = {
  params: {
    id: string
  }
}

export default async function editTodos({ params: { id }}: Props) {
  const todo = await fetchTodo(id)

  if (!todo) notFound()

  return (
    <Todo {...todo} />
  )
}
