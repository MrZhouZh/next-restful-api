import { getTodos } from "~/libs/fetchTodos"
import Todo from "./Todo"

export default async function TodoList() {
  const todos = await getTodos()
  const sortedTodos = todos.reverse()

  return (
    <>
      {sortedTodos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </>
  )
}
