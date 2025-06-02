'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import IconsBundle from '@/components/social-icons'
import SectionContainer from '@/components/SectionContainer'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

// ---- Replacing Contentlayer-specific types ----
interface BlogPost {
  slug: string
  date: string
  title: string
  summary: string
  tags?: string[]
  thumbnail?: string
}

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: BlogPost[]
  title: string
  initialDisplayPosts?: BlogPost[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 py-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage ? (
          <Button className="cursor-auto disabled:opacity-50" disabled>
            Previous
          </Button>
        ) : (
          <Button asChild>
            <Link
              href={
                currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
              }
              rel="prev"
            >
              Previous
            </Link>
          </Button>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage ? (
          <Button className="cursor-auto disabled:opacity-50" disabled>
            Next
          </Button>
        ) : (
          <Button asChild>
            <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
              Next
            </Link>
          </Button>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const [pageViews, setPageViews] = useState<Record<string, number | undefined>>({})

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  useEffect(() => {
    posts.forEach((post) => {
      const { slug } = post
      if (slug) {
        setPageViews((prev) => (slug in prev ? prev : { ...prev, [slug]: undefined }))
        fetch(`/api/views/blogs?slug=${encodeURIComponent(slug)}`)
          .then((res) => res.json())
          .then((data) =>
            setPageViews((prev) => ({
              ...prev,
              [slug]: data.pageViewCount,
            }))
          )
          .catch((err) => console.error('Error fetching page views:', err))
      }
    })
  }, [posts])

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div>
      <SectionContainer>
        <div className="space-y-2 border-b-[0.5px] border-b-gray-200 pb-8 pt-6 dark:border-b-gray-700 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl md:text-6xl">
            {title}
          </h1>
        </div>
      </SectionContainer>

      <SectionContainer size="md" className="pt-5">
        <div className="relative my-4 w-full">
          <label>
            <span className="sr-only">Search articles</span>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-muted-foreground px-4 py-2 focus:border-primary focus:ring-primary dark:border-muted"
            />
          </label>
          <IconsBundle
            kind="search"
            iconType="icon"
            size={5}
            className="absolute right-3 top-3 text-muted-foreground"
          />
        </div>

        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, thumbnail } = post
            const isLoadingViewCount = pageViews[slug] === undefined

            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-5 xl:items-start xl:gap-4 xl:space-y-0">
                  <div className="xl:col-span-2">
                    <Link href={`/blog/${slug}`}>
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={thumbnail || ''}
                          alt={`${title} thumbnail`}
                          height="0"
                          width="0"
                          className="mb-4 h-fit w-full rounded-md"
                          unoptimized
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${slug}`} className="text-foreground">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap space-x-3">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none text-muted-foreground">{summary}</div>
                    <div>
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="flex gap-1 text-base font-medium leading-6 text-muted-foreground">
                          {isLoadingViewCount ? (
                            <span className="flex items-center gap-2">
                              <Skeleton className="h-6 w-12" />
                              <span> views</span>
                            </span>
                          ) : (
                            <span>{pageViews[slug]?.toLocaleString() || '...'} views</span>
                          )}
                          <span>・</span>
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </SectionContainer>
    </div>
  )
}
