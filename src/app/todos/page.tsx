import AddTodo from "~/app/components/AddTodo";
import TodoList from "~/app/components/TodoList";

export const runtime = "edge"
// export const dynamic = "force-dynamic"

export default function Todos() {
  return (
    <>
      <AddTodo />
      <TodoList />
    </>
  )
}
