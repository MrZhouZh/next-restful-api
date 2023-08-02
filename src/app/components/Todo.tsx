'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, MouseEvent, useState, useTransition } from "react"
import { FaTrash } from "react-icons/fa"
import { deleteTodo, putTodo } from "~/libs/fetchTodos"

export default function Todo(todo: Todo) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const isMutating = isFetching || isPending

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsFetching(true)

    await putTodo(todo)

    setIsFetching(false)

    alert('Change Success!')

    startTransition(() => {
      router.refresh()
    })
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true)
    const res = await deleteTodo(todo)
    setIsFetching(false)
    alert(res.message)
    
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <article className="my-4 flex justify-between items-center" style={{ opacity: isMutating ? 0.7 : 1 }}>
      <label className="text-2xl hover:undeline">
        <Link href={`/todos/edit/${todo.id}`}>{todo.title}</Link>
      </label>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          id="completed"
          name="completed"
          onChange={handleChange}
          disabled={isPending}
          className="min-w-[2rem] min-h-[2rem]"
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-3 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-red-400 hover:cursor-pointer hover:bg-red-300"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  )
}
