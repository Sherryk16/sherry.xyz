import 'css/prism.css'
import 'katex/dist/katex.css'
import '@/css/resume.css'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

import SectionContainer from '@/components/SectionContainer'

import ResumeLayout from '@/layouts/ResumeLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

// Static resume data - replace with your actual resume info
const allResumes = [
  {
    slug: 'default',
    toc: [], // Replace with actual TOC array if available
    body: {
      code: `
# Resume

This is my resume content in MDX format.
      
- Experience
- Skills
- Education
      `,
    },
  },
]

export default function Page() {
  const resume = allResumes.find((p) => p.slug === 'default')

  if (!resume) {
    return <p>Resume not found.</p>
  }

  return (
    <SectionContainer>
      <ResumeLayout toc={resume.toc}>
        <MDXLayoutRenderer code={resume.body.code} components={components} toc={resume.toc} />
      </ResumeLayout>
    </SectionContainer>
  )
}
