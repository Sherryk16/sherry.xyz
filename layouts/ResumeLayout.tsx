/* eslint-disable */
import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ToC } from '@/components/ToC'

interface TOCItem {
  id: string
  text: string
  level: number
  children?: TOCItem[]
}

interface LayoutProps {
  toc: TOCItem[] // better than any
  children: ReactNode
}

export default function ResumeLayout({ children, toc }: LayoutProps) {
  // Map TOCItem[] to TOC[] structure expected by ToC component
  function mapTOCItems(items: TOCItem[]): any[] {
    return items.map((item) => ({
      value: item.text,
      depth: item.level,
      data: {},
      url: `#${item.id}`,
      children: item.children ? mapTOCItems(item.children) : [],
    }))
  }

  const mappedToc = mapTOCItems(toc)

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <div className="resume">
        <header className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Resume
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
            My professional career, experiences, and skills.
          </p>
        </header>
        <div className="border border-t border-gray-200 dark:border-gray-700" />
        <main className="mx-auto my-12 max-w-screen-xl gap-12 space-y-12 rounded-md bg-gray-100 p-3 md:flex md:space-y-0 md:p-8">
          <ToC toc={mappedToc} />
          {/* <TOCInline toc={toc} /> */}
          <div className="hidden border-l border-gray-300 md:block" />
          <div className="prose prose-slate grow table-auto border-collapse space-y-5 leading-6 text-gray-900">
            {children}
          </div>
        </main>
      </div>
    </SectionContainer>
  )
}
