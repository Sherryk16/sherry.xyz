import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'

// Replace with your static metadata
export const metadata = genPageMetadata({ title: 'About' })

// Static author data instead of allAuthors from Contentlayer
const author = {
  name: 'Default Author',
  slug: 'default',
  avatar: '/images/avatar.jpg',
  occupation: 'Developer',
  company: 'Your Company',
  email: 'author@example.com',
  twitter: 'https://twitter.com/yourhandle',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourgithub',
  body: {
    code: `
      # About Me
      
      This is a sample about page written in MDX format.
      You can customize this content however you want.
    `,
  },
}

export default function Page() {
  // coreContent is gone, so pass author.body.code directly
  // You may want to parse MDX string if necessary, but pliny/mdx-components can handle code string directly.

  return (
    <SectionContainer>
      <AuthorLayout content={author}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </SectionContainer>
  )
}
