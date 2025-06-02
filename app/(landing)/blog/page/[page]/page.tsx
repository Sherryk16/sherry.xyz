import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

// Sample static posts array — replace with your real data
const allBlogs = [
  {
    slug: 'my-first-post',
    title: 'My First Post',
    date: '2023-01-01',
    hidden: false,
    summary: 'Summary of my first post',
    // add other fields as needed
  },
  // Add more posts here
]

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function allCoreContent(posts) {
  return posts
}

export const metadata = genPageMetadata({ title: 'Blog' })

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.filter((p) => !p.hidden).length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs.filter((p) => !p.hidden)))
  const pageNumber = parseInt(params.page, 10) || 1

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <div className="divide-y divide-accent-foreground dark:divide-accent">
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </div>
  )
}
