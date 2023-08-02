// import fs from 'node:fs'
// import path from 'node:path'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
// import { unified } from 'unified'
// import matter from 'gray-matter'
// import html from 'remark-html'
// import remarkParse from 'remark-parse'
// import remarkGfm from 'remark-gfm'
// import remarkRehype from 'remark-rehype'
// import rehypeStringify from 'rehype-stringify'
// import rehypePrettyCode from 'rehype-pretty-code'

import Video from '~/app/components/Video'
import CustomImage from '~/app/components/CustomImage'

type Filetree = {
  tree: [
    {
      path: string
    }
  ]
}

// const postsDir = path.join(process.cwd(), 'src', 'blogposts')

export async function getPostByName(fileName: string) {
  const res = await fetch(`https://raw.githubusercontent.com/MrZhouZh/test-blogposts/main/${fileName}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-Github-Api-Version': '2022-11-28',
    }
  })

  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === '404: Not Found') return undefined

  const { frontmatter, content } = await compileMDX<{
    title: string
    date: string
    tags: string[]
  }>({
    source: rawMDX,
    components: {
      CustomImage,
      Video,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap'
          }]
        ]
      }
    }
  })

  const id = fileName.replace(/.mdx$/, '')
  const blogPostObj: BlogPost2 = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content
  }

  return blogPostObj
}

export async function getPostsMeta()  {
  try {
  const res = await fetch(
    `https://api.github.com/repos/MrZhouZh/test-blogposts/git/trees/main?recursive=1`,
    // `https://api.github.com/repos/MrZhouZh/test-blogposts/git/trees/main`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }
  )

  if (!res.ok) return undefined

  const repoFiletree: Filetree = await res.json()
  const files = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))
  const posts: Meta[] = []

  for (const file of files) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post
      posts.push(meta)
    }
  }

  return posts.sort((a, b) => a.date < b.date ? 1 : -1)
  } catch(err) {
    console.log('getPostsMeta err', err)
  }
}

// export function getSortedPostsData() {
//   const fileNames = fs.readdirSync(postsDir)
//   let allPostsData: BlogPost[] = []
//   fileNames.forEach(filename => {
//     const fileName = String(filename)
//     const id = String(fileName).replace(/\.md$/, '')

//     const fullPath = path.join(postsDir, fileName)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')
    
//     const matterResult = matter(fileContents)
//     const BlogPost: BlogPost = {
//       id,
//       title: matterResult.data.title as string,
//       date: matterResult.data.date as string,
//     }
//     allPostsData.push(BlogPost)
//   })
//   return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
// }

// export async function getPostData(id: string) {
//   const fullPath = path.join(postsDir, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   const matterResult = matter(fileContents)

//   const processedContent = await unified()
//     .use(html)
//     .use(remarkParse)
//     .use(remarkGfm)
//     .use(remarkRehype)
//     .use(rehypeStringify)
//     // TODO: highlight code use rehype-pretty-code, but it has some problems.
//     // .use(rehypePrettyCode)
//     .process(matterResult.content)

//   const contentHtml = processedContent.toString()

//   const blogPostWithHTML: BlogPost & { contentHtml: string } = {
//     id,
//     title: matterResult.data.title,
//     date: matterResult.data.date,
//     contentHtml,
//   }

//   return blogPostWithHTML
// }
