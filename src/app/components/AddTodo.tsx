'use client'

import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState, useTransition } from "react"
import { postTodo } from "~/libs/fetchTodos"

const initState: Partial<Todo> = {
  userId: 1,
  title: ''
}

export default function AddTodo() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(initState)

  const isMutating = isFetching || isPending

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { userId, title } = data
    if (!userId || !title) {
      return
    }

    setIsFetching(true)
    const res = await postTodo({ userId, title })
    setIsFetching(false)
    setData(prev => ({
      ...prev,
      title: ''
    }))

    alert('Add Success!')

    startTransition(() => {
      if(pathname === '/todos/add') {
        router.push('/todos')
      } else {
        router.refresh()
      }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name

    setData(prev => ({
      ...prev,
      [name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center" style={{ opacity: isMutating ? 0.7 : 1 }}>
      <input
        type="text"
        id="title"
        name="title"
        value={data.title}
        onChange={handleChange}
        className="text-2xl p-1 rounded-lg flex-grow w-full"
        placeholder="New Todo"
        autoFocus
      />

      <button type="submit" className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400">
        Submit
      </button>
    </form>
  )
}
