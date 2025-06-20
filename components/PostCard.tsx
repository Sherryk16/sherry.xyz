'use client'

import Tag from '@/components/Tag'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Define a custom post type to replace CoreContent<Blog>
export interface Post {
  slug: string
  title: string
  summary: string
  tags?: string[]
}

export interface PostCardProps {
  posts: Post[]
  showTags?: boolean
}

export default function PostCard({ posts, showTags = true }: PostCardProps) {
  return (
    <ul>
      {posts.map(({ slug, title, tags, summary }, index) => (
        <motion.li
          key={slug}
          className="py-2"
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`} legacyBehavior>
            <article className="cursor-pointer gap-3 space-y-2 bg-opacity-20 py-5 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div className="space-y-3 xl:col-span-4">
                <span className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${slug}`}>
                    <span className="hover:text-primary-400 text-primary-500 duration-300">
                      {title}
                    </span>
                  </Link>
                </span>
                {showTags && tags && (
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
                <div className="max-w-none">{summary}</div>
              </div>
            </article>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
