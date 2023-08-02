import Link from 'next/link'
import Posts from './components/Posts'

export const revalidate = 10

export default function Home() {
  return (
    <main className="px-4 mx-auto">
      <p className='mt-12 mb-12 text-3xl text-center dark:text-white'>
        Hello and Welcome 👏
        <span className='whitespace-nowrap'>
          I&apos;m <span className='font-bold'>Zeke</span>.
        </span>
      </p>
      <section className="mt-6 mx-auto max-w-2xl text-2xl">
        <h2 className="text-4xl font-bold dark:text-white/90">Test Restful API</h2>
        <ul className="w-full">
          <li className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/todos/add`}>Add Todo</Link>
          </li>
          <li className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/todos`}>TodoList</Link>
          </li>
        </ul>
      </section>
      <Posts />
    </main>
  )
}
