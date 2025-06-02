import Main from './Main'

// Sample static blog posts — replace with your actual data
const allBlogs = [
  {
    slug: 'my-first-post',
    title: 'My First Post',
    date: '2023-01-01',
    hidden: false,
    summary: 'Summary of my first post',
    // Add other fields as needed
  },
  // Add more posts here
]

function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function allCoreContent(posts) {
  return posts
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
