// app/not-found.tsx
import Link from '@/components/Link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import GIF from '@/public/static/gifs/confused-travolta.gif'
import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '@/components/ui/button'
import SiteLogo from '@/components/SiteLogos'

import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Check Google Maps!' })

// ❌ No async, no auth
export default function NotFound() {
  return (
    <>
      <Header session={null} /> {/* optional: safely render without session */}
      <main className="mb-auto pt-32">
        <div className="mb-auto flex flex-col content-center space-y-10">
          <div className="mx-auto mt-5">
            <SiteLogo kind={'logo'} size={15} logoType="image" parentClassName={'mx-auto'} />
          </div>
          <Image src={GIF} alt="Page Not Found GIF Wink" className="mx-auto mt-16 " />
          <p className="mx-auto mb-4 text-xl font-bold leading-normal md:text-2xl">
            Lost your way?
          </p>
          <Button asChild className={cn(buttonVariants({ variant: 'secondary' }), 'mx-auto')}>
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
