import '@/css/globals.css'
import '@/css/tailwind.css'
import '@/css/twemoji.css'
import 'remark-github-blockquote-alert/alert.css'

import { Montserrat as FontSans } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from '@/components/providers/theme-providers'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Provider as JotaiProvider } from 'jotai'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import VercelAnalytics from '@/components/Analytics'
import { TailwindIndicator } from '@/components/TailwindIndicator'
import { auth } from '@/auth'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html
      lang={siteMetadata.language}
      className="overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-slate-700"
      suppressHydrationWarning
    >
      {/* Favicon using final.png */}
      <link rel="icon" type="image/png" href="/final.png" />

      {/* Optional apple and manifest metadata */}
      <link rel="apple-touch-icon" sizes="180x180" href="/final.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <VercelAnalytics />
          <JotaiProvider>
            <TooltipProvider delayDuration={500}>
              <div className="flex h-screen flex-col justify-between font-sans">{children}</div>
            </TooltipProvider>
            <Toaster />
          </JotaiProvider>
          <TailwindIndicator />
        </ThemeProviders>
      </body>
    </html>
  )
}
