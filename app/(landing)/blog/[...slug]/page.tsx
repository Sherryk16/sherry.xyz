import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBare from '@/layouts/PostBannerUpdated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { ReportView } from './view'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBare,
}

// Example static blog posts data (replace with your real data)
const allBlogs = [
  {
    slug: 'my-first-post',
    title: 'My First Post',
    date: '2023-01-01',
    lastmod: '2023-01-05',
    summary: 'Summary of my first post',
    authors: ['default'],
    layout: 'PostLayout',
    body: {
      code: `
# Hello world!

This is my first post, written in MDX.
`,
    },
    toc: [],
    structuredData: {},
    images: [],
  },
]

// Example static authors data
const allAuthors = [
  {
    slug: 'default',
    name: 'Your Name',
    // add any other author info you want here
  },
]

function coreContent(post) {
  // Just return the post as-is for now
  return post
}

function allCoreContent(posts) {
  return posts
}

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateMetadata({ params }) {
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  if (!post) return

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((authorSlug) => {
    return coreContent(allAuthors.find((a) => a.slug === authorSlug))
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((a) => a.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/') }))
}

export default async function Page({ params }) {
  const slug = decodeURI(params.slug.join('/'))

  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug)
  if (!post) return notFound()

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((authorSlug) => {
    return coreContent(allAuthors.find((a) => a.slug === authorSlug))
  })

  const mainContent = coreContent(post)

  const jsonLd = post.structuredData || {}
  jsonLd['author'] = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }))

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReportView slug={slug} />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={prev}
        prev={next}
        toc={post.toc}
      >
        <MDXLayoutRenderer code={post.body.code} components={{}} toc={post.toc} />
      </Layout>
    </>
  )
}
