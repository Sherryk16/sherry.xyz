// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import GIF from '@/public/static/gifs/confused-travolta.gif'

export default function NotFound() {
  return (
    <div className="pt-32 text-center">
      <Image src={GIF} alt="Page Not Found" className="mx-auto" />
      <h1 className="text-4xl font-bold mt-8">Lost your way?</h1>
      <p className="text-lg mt-2">Don't worry, go back to homepage.</p>
      <Link href="/" className="mt-6 inline-block bg-gray-800 text-white py-2 px-4 rounded">
        Go Home
      </Link>
    </div>
  )
}
