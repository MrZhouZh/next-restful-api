import Link from 'next/link'
import Posts from './components/Posts'

export const revalidate = 10

export default function Home() {
  return (
    <main className="px-4 mx-auto">
      {/*
        effect refs: https://twitter.com/jh3yy/status/1686804318618349576
        codepen: https://codepen.io/jh3y/pen/WNYPEYr
      */}
      <p className='mt-12 mb-12 text-3xl text-center dark:text-white relative cursor-default'>
          <span aria-hidden={true}>H</span>
          <span aria-hidden={true}>e</span>
          <span aria-hidden={true}>l</span>
          <span aria-hidden={true}>l</span>
          <span aria-hidden={true}>o</span>
          &nbsp;
          <span aria-hidden={true}>a</span>
          <span aria-hidden={true}>n</span>
          <span aria-hidden={true}>d</span>
          &nbsp;
          <span aria-hidden={true}>W</span>
          <span aria-hidden={true}>e</span>
          <span aria-hidden={true}>l</span>
          <span aria-hidden={true}>c</span>
          <span aria-hidden={true}>o</span>
          <span aria-hidden={true}>m</span>
          <span aria-hidden={true}>e</span>
          &nbsp;
          <span>👏</span>
          &nbsp;
          <span className="sr-only">Hello and Welcome 👏 </span>
          <span aria-hidden={true}>I&apos;m</span>
          &nbsp;
          <span aria-hidden={true}><b>Z</b></span>
          <span aria-hidden={true}><b>e</b></span>
          <span aria-hidden={true}><b>k</b></span>
          <span aria-hidden={true}><b>e.</b></span>
          <span className="whitespace-nowrap sr-only">
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
