export const TODO_SERVER_URL =  `http://localhost:3000/api/todos`

export async function fetchTodo(id: string) {
  const res = await fetch(`${TODO_SERVER_URL}/${id}`)
  if (!res.ok) return undefined
  
  const todos: Todo = await res.json()

  return todos
}

export async function getTodos() {
  const res = await fetch(`${TODO_SERVER_URL}`)
  const todos: Todo[] = await res.json()

  return todos
}

export async function postTodo<T extends Partial<Todo>>({ userId, title }: T) {
  const res = await fetch(`${TODO_SERVER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId, title
    })
  })
  const updatedTodo: Todo | { message: string } = await res.json()
  
  return updatedTodo
}

export async function putTodo(todo: Todo) {
  const res = await fetch(`${TODO_SERVER_URL}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...todo, completed: !todo.completed
    })
  })
  const updatedTodo: Todo = await res.json()

  return updatedTodo
}

export async function deleteTodo(todo: Todo) {
  const res = await fetch(`${TODO_SERVER_URL}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: todo.id
    })
  })
  const deleteMessage: { message: string } = await res.json()

  return deleteMessage
}
