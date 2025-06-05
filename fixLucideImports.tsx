import { Project } from 'ts-morph'

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
})

const validIcons = [
  'LuLoaderCircle',
  'LuAlertTriangle',
  'LuCheckCircle2',
  'LuFlag',
  'LuBook',
  'LuLineChart',
  'LuLoader2',
  'LuHelpCircle',
  // Add more VALID icon names here as per your UI
]

const fallbackIcon = 'LuHelpCircle'

project.getSourceFiles('**/*.tsx').forEach((file) => {
  let modified = false

  file.getImportDeclarations().forEach((importDecl) => {
    if (importDecl.getModuleSpecifierValue() === 'react-icons/lu') {
      const namedImports = importDecl.getNamedImports()
      namedImports.forEach((namedImport) => {
        const name = namedImport.getName()
        if (!validIcons.includes(name)) {
          console.log(`[FIXING] ${file.getBaseName()} — ${name} => ${fallbackIcon}`)
          namedImport.renameAlias(fallbackIcon)
          namedImport.remove()
          modified = true
        }
      })

      if (modified) {
        importDecl.addNamedImport(fallbackIcon)
      }
    }
  })

  if (modified) {
    file.saveSync()
  }
})

console.log('✅ All icon imports fixed.')
