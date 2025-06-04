// app/not-found.tsx
import Image from 'next/image'
import Link from 'next/link'
import GIF from '@/public/static/gifs/confused-travolta.gif'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 py-16 text-center">
      <Image src={GIF} alt="Page Not Found" width={300} height={200} priority />
      <h1 className="text-xl font-bold md:text-2xl">Lost your way?</h1>
      <Link
        href="/"
        className="inline-block rounded bg-black px-6 py-3 text-white hover:opacity-80"
      >
        Back to Home
      </Link>
    </main>
  )
}
