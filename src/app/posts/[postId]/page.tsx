import Link from 'next/link';
import { notFound } from 'next/navigation'
import { getPostByName, getPostsMeta } from "~/libs/posts";
import getFormattedDate from "~/libs/getFormattedDate";
import 'highlight.js/styles/github-dark-dimmed.css'

export const revalidate = 86400

type Props = {
  params: {
    postId: string
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMeta()

  if (!posts) return []

  return posts.map(post => ({ postId: post.id }))
}

export async function generateMetadata({ params: { postId }}: Props) {
  const post = await getPostByName(`${postId}.mdx`)

  if (!post) return { title: `Post Not Found`}

  return {
    title: post.meta.title,
  }
}

export default async function Post({ params: { postId } }: Props) {
  // const posts = getSortedPostsData()
  const posts = await getPostByName(`${postId}.mdx`)
  if (!posts) notFound()

  const { meta, content } = posts
  const pubDate = getFormattedDate(meta.date)

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
  ))

  return (
    <main className="px-6 mx-auto prose prose-xl prose-slate dark:prose-invert max-auto">
      <h1 className="text-3xl mt-4 mb-0">{meta.title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mt-3">
        <Link href="/">← Back to home</Link>
      </p>
    </main>
  )
}
