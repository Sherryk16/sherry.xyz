import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import SectionContainer from '@/components/SectionContainer'
import AuthorLayout from '@/layouts/AuthorLayout'
import Twemoji from '@/components/Twemoji'

export default async function AboutPage() {
  const mdxPath = path.join(process.cwd(), 'data', 'authors', 'default.mdx')
  const rawMDX = fs.readFileSync(mdxPath, 'utf-8')
  const { data, content } = matter(rawMDX)

  const author = {
    name: data.name,
    avatar: data.avatar,
    occupation: data.occupation,
    company: data.company,
    email: data.email,
    instagram: data.instagram,
    linkedin: data.linkedin,
    github: data.github,
    body: {
      code: content,
    },
  }

  return (
    <SectionContainer>
      <AuthorLayout content={author}>
        <article className="prose max-w-none dark:prose-invert">
          <MDXRemote source={author.body.code} components={{ Twemoji }} />
        </article>
      </AuthorLayout>
    </SectionContainer>
  )
}
