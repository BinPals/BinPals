import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const projectRoot = process.cwd()
const outDir = join(projectRoot, "out")
const docsDir = join(projectRoot, "docs")
const cnameFile = join(projectRoot, "CNAME")

if (!existsSync(outDir)) {
  console.error("Expected Next.js static export in 'out' directory. Did the build complete successfully?")
  process.exit(1)
}

rmSync(docsDir, { recursive: true, force: true })
mkdirSync(docsDir, { recursive: true })

cpSync(outDir, docsDir, { recursive: true })
writeFileSync(join(docsDir, ".nojekyll"), "")

if (existsSync(cnameFile)) {
  cpSync(cnameFile, join(docsDir, "CNAME"))
}
