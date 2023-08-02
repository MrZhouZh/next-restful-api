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
      <Posts />
    </main>
  )
}
