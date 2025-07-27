'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-16">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Return Home
      </Link>
    </div>
  )
}
