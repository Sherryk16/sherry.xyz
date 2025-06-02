import { slug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

// Static posts data — replace with your actual posts
const allBlogs = [
  {
    slug: 'my-first-post',
    title: 'My First Post',
    date: '2023-01-01',
    tags: ['tag-one', 'tag-two'],
    hidden: false,
    summary: 'Summary here',
    // other fields...
  },
  // add more posts...
]

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function allCoreContent(posts) {
  return posts
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)

  // Capitalize first letter + replace spaces with dashes except first char
  const title = tag[0].toUpperCase() + tag.slice(1).split(' ').join('-')

  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  return <ListLayout posts={filteredPosts} title={title} />
}
