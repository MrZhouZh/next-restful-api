import Link from 'next/link';
import { notFound } from 'next/navigation'
import { getPostData, getSortedPostsData } from "~/libs/posts";
import getFormattedDate from "~/libs/getFormattedDate";

export default async function Post({ params }: { params: { postId: string }}) {
  const posts = getSortedPostsData()
  const { postId } = params

  if (!posts.find(post => post.id === postId)) notFound()
  
  const { title, date, contentHtml } = await getPostData(postId)
  const pubDate = getFormattedDate(date)

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert max-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }}></section>
        <p className="mt-3">
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  )
}
