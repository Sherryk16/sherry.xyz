import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

// Example static posts array - replace with your real posts data or import it
const allBlogs = [
  {
    slug: 'my-first-post',
    title: 'My First Post',
    date: '2023-01-01',
    hidden: false,
    summary: 'Summary of my first post',
    // Add other post fields as needed
  },
  // add more posts here
]

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function allCoreContent(posts) {
  // This can be used to map or transform posts if needed, otherwise just return posts
  return posts
}

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs.filter((p) => !p.hidden)))
  const pageNumber = 1
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
