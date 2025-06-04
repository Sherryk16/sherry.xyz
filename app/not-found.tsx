import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

import GIF from '@/public/static/gifs/confused-travolta.gif'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-white px-4 py-16 text-center">
      <Image src={GIF} alt="Lost?" width={300} height={200} className="h-auto w-[300px]" />
      <h1 className="text-xl font-bold leading-normal md:text-2xl">Lost your way?</h1>
      <Link
        href="/"
        className="rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-80"
      >
        Back to Home
      </Link>
    </div>
  )
}
