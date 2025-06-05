import { IconType } from 'react-icons/lib'
import {
  SiC,
  SiCplusplus,
  SiSharp,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiMdx,
  SiPython,
  SiTypescript,
  SiYaml,
} from 'react-icons/si'

export const languageIcons: { [key: string]: IconType } = {
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  python: SiPython,
  c: SiC,
  'c++': SiCplusplus,
  cs: SiSharp,
  typescript: SiTypescript,
  markdown: SiMarkdown,
  mdx: SiMdx,
  json: SiJson,
  yaml: SiYaml,
}

export const getLanguageIcon = (language: string): JSX.Element | null => {
  const Icon = languageIcons[language]
  return Icon ? <Icon /> : null
}
