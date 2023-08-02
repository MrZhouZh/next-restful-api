import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import html from 'remark-html'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
// import rehypePrettyCode from 'rehype-pretty-code'

const postsDir = path.join(process.cwd(), 'src', 'blogposts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir)
  let allPostsData: BlogPost[] = []
  fileNames.forEach(filename => {
    const fileName = String(filename)
    const id = String(fileName).replace(/\.md$/, '')

    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const matterResult = matter(fileContents)
    const BlogPost: BlogPost = {
      id,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
    }
    allPostsData.push(BlogPost)
  })
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(html)
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    // TODO: highlight code use rehype-pretty-code, but it has some problems.
    // .use(rehypePrettyCode)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  }

  return blogPostWithHTML
}
