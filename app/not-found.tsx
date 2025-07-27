// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import GIF from '@/public/static/gifs/confused-travolta.gif'

export default function NotFound() {
  return (
    <div className="pt-32 text-center">
      <Image src={GIF} alt="Page Not Found" className="mx-auto" />
      <h1 className="mt-8 text-4xl font-bold">Lost your way?</h1>
      <p className="mt-2 text-lg">Don't worry, go back to homepage.</p>
      <Link href="/" className="mt-6 inline-block rounded bg-gray-800 px-4 py-2 text-white">
        Go Home
      </Link>
    </div>
  )
}
