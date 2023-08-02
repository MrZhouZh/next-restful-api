type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type Meta = {
  id: string
  title: string
  date: string
  tags: string[]
}

type BlogPost = {
  id: string
  title: string
  date: string
}

type BlogPost2 = {
  meta: Meta,
  content: ReactElement<any, string | JSXElementConstructor<any>>
}
