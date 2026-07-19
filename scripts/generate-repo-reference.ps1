param(
  [string]$RepoRoot = (Get-Location).Path,
  [string]$OutDir = "docs/repo-reference"
)

$repoRootPath = (Resolve-Path -LiteralPath $RepoRoot).Path
$outRoot = Join-Path $repoRootPath $OutDir
if (Test-Path -LiteralPath $outRoot) {
  Get-ChildItem -LiteralPath $outRoot -Force | Remove-Item -Recurse -Force
} else {
  New-Item -ItemType Directory -Force -Path $outRoot | Out-Null
}

function Normalize-RelPath {
  param([string]$AbsolutePath)
  $rel = $AbsolutePath.Substring($repoRootPath.Length).TrimStart('\\')
  return ($rel -replace "\\", "/")
}

function Layer-Name {
  param([string]$RelPath)
  if ($RelPath -eq "src/main.tsx") { return "App entrypoint" }
  if ($RelPath.StartsWith("src/app/")) { return "App layer (bootstrap, global providers, global styles)" }
  if ($RelPath.StartsWith("src/features/")) { return "Feature layer (domain/page-specific UI and behavior)" }
  if ($RelPath.StartsWith("src/shared/")) { return "Shared layer (reusable components, hooks, libraries)" }
  if ($RelPath.StartsWith("src/content/")) { return "Content/model layer (typed content objects)" }
  if ($RelPath.StartsWith("src/assets/")) { return "Asset layer (static media)" }
  if ($RelPath.StartsWith("docs/")) { return "Documentation layer" }
  if ($RelPath.StartsWith("public/")) { return "Static public assets" }
  if ($RelPath.StartsWith("scripts/")) { return "Automation/tooling scripts" }
  return "Tooling/configuration"
}

function File-Kind {
  param([string]$RelPath, [string]$Content)
  if ($RelPath.EndsWith(".tsx")) { return "React component module (TypeScript + JSX)" }
  if ($RelPath -match "/use[A-Z].*\\.ts$") { return "Custom React hook" }
  if ($RelPath.EndsWith("styles.css")) { return "Global stylesheet (Tailwind + custom CSS)" }
  if ($RelPath.EndsWith(".css")) { return "Stylesheet" }
  if ($RelPath.EndsWith(".svg")) { return "SVG asset" }
  if ($RelPath.EndsWith("index.ts")) { return "Barrel export module" }
  if ($RelPath.EndsWith("package.json")) { return "NPM package manifest" }
  if ($RelPath.EndsWith("package-lock.json")) { return "NPM lockfile" }
  if ($RelPath.StartsWith("tsconfig")) { return "TypeScript compiler configuration" }
  if ($RelPath.EndsWith("vite.config.ts")) { return "Vite build/dev configuration" }
  if ($RelPath.EndsWith("eslint.config.js")) { return "ESLint configuration" }
  if ($RelPath.EndsWith("postcss.config.js")) { return "PostCSS configuration" }
  if ($RelPath.EndsWith("index.html")) { return "HTML shell for Vite app" }
  if ($RelPath.EndsWith(".md")) { return "Markdown documentation" }
  if ($RelPath.EndsWith(".ts")) { return "TypeScript module" }
  if ($RelPath.EndsWith(".js")) { return "JavaScript module" }
  return "Repository file"
}

function Add-Link {
  param(
    [hashtable]$Links,
    [string]$Url,
    [string]$Label
  )
  if (-not $Links.ContainsKey($Url)) {
    $Links[$Url] = $Label
  }
}

function Escape-InlineCode {
  param([string]$Text)
  return $Text -replace '`', '``'
}

$allSourceFiles = Get-ChildItem -Path $repoRootPath -Recurse -File | Where-Object {
  $full = $_.FullName
  if ($full -match '\\(node_modules|dist|\.git)\\') { return $false }
  if ($full -match '\\docs\\repo-reference\\') { return $false }
  if ($full.EndsWith(".tsbuildinfo")) { return $false }
  return $true
} | Sort-Object FullName

$documentedRelPaths = New-Object System.Collections.Generic.List[string]

foreach ($file in $allSourceFiles) {
  $relPath = Normalize-RelPath -AbsolutePath $file.FullName
  $content = Get-Content -LiteralPath $file.FullName -Raw
  $extension = [System.IO.Path]::GetExtension($relPath).ToLowerInvariant()
  $isCodeLike = $extension -in @(".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs")
  $lineCount = if ([string]::IsNullOrEmpty($content)) { 0 } else { ([regex]::Matches($content, "`n").Count + 1) }

  $imports = [regex]::Matches($content, '(?m)^\s*import\s+.*$') | ForEach-Object { $_.Value.Trim() }
  $exports = [regex]::Matches($content, '(?m)^\s*export\s+.*$') | ForEach-Object { $_.Value.Trim() }

  $syntax = New-Object System.Collections.Generic.List[string]
  $patterns = New-Object System.Collections.Generic.List[string]
  $risks = New-Object System.Collections.Generic.List[string]
  $links = @{}

  if ($isCodeLike) {
    Add-Link -Links $links -Url "https://react.dev/" -Label "React docs home"
    Add-Link -Links $links -Url "https://www.typescriptlang.org/docs/" -Label "TypeScript docs home"

    if ($content -match '(?m)^\s*import\s+') {
      $syntax.Add("Uses ES module import syntax (import ... from ...) to declare dependencies.")
    }
    if ($content -match '(?m)^\s*export\s+') {
      $syntax.Add("Uses ES module export syntax to expose a public API from this file.")
    }
    if ($content -match '(?m)^\s*type\s+\w+') {
      $syntax.Add("Defines TypeScript type aliases to model data and function contracts.")
      Add-Link -Links $links -Url "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html" -Label "TypeScript Everyday Types"
    }
    if ($content -match '\|') {
      $syntax.Add("Uses union types (A | B) to constrain values to safe, explicit options.")
      Add-Link -Links $links -Url "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types" -Label "TypeScript Union Types"
    }
    if ($content -match '\?:') {
      $syntax.Add("Uses optional properties (prop?:) so callers can omit non-required values.")
    }
    if ($content -match '\?\.') {
      $syntax.Add("Uses optional chaining (obj?.x) to avoid runtime errors on null/undefined.")
    }
    if ($content -match '\?\?') {
      $syntax.Add("Uses nullish coalescing (a ?? b) for fallback defaults only when values are nullish.")
    }
    if ($content -match '\sas\s') {
      $syntax.Add("Contains TypeScript type assertions (as ...) to narrow values when runtime checks are implicit.")
      Add-Link -Links $links -Url "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions" -Label "TypeScript Type Assertions"
    }

    if ($content -match 'useState\(') {
      $patterns.Add("Local UI state with useState.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/useState" -Label "React useState"
    }
    if ($content -match 'useEffect\(') {
      $patterns.Add("Effect pattern with useEffect for side-effects, subscriptions, and cleanup.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/useEffect" -Label "React useEffect"
    }
    if ($content -match 'useMemo\(') {
      $patterns.Add("Memoization with useMemo to avoid unnecessary recalculation.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/useMemo" -Label "React useMemo"
    }
    if ($content -match 'useCallback\(') {
      $patterns.Add("Stable function references with useCallback.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/useCallback" -Label "React useCallback"
    }
    if ($content -match 'useRef\(') {
      $patterns.Add("Mutable refs with useRef for DOM handles and non-reactive values.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/useRef" -Label "React useRef"
    }
    if ($content -match 'createContext\(' -or $content -match 'useContext\(') {
      $patterns.Add("Provider/Context pattern for cross-tree state sharing without prop drilling.")
      Add-Link -Links $links -Url "https://react.dev/learn/passing-data-deeply-with-context" -Label "React Context guide"
      Add-Link -Links $links -Url "https://react.dev/reference/react/createContext" -Label "React createContext"
      Add-Link -Links $links -Url "https://react.dev/reference/react/useContext" -Label "React useContext"
    }
    if ($content -match 'forwardRef\(' -or $content -match 'useImperativeHandle\(') {
      $patterns.Add("Imperative handle pattern for exposing explicit component controls to parents.")
      Add-Link -Links $links -Url "https://react.dev/reference/react/forwardRef" -Label "React forwardRef"
      Add-Link -Links $links -Url "https://react.dev/reference/react/useImperativeHandle" -Label "React useImperativeHandle"
    }
    if ($content -match 'IntersectionObserver') {
      $patterns.Add("Viewport observation pattern with IntersectionObserver.")
      Add-Link -Links $links -Url "https://developer.mozilla.org/docs/Web/API/IntersectionObserver" -Label "MDN IntersectionObserver"
    }
    if ($content -match 'MutationObserver') {
      $patterns.Add("DOM mutation observation for dynamic UI synchronization.")
      Add-Link -Links $links -Url "https://developer.mozilla.org/docs/Web/API/MutationObserver" -Label "MDN MutationObserver"
    }
    if ($content -match 'ResizeObserver') {
      $patterns.Add("Layout observation with ResizeObserver.")
      Add-Link -Links $links -Url "https://developer.mozilla.org/docs/Web/API/ResizeObserver" -Label "MDN ResizeObserver"
    }
  }

  if ($relPath -match '/use[A-Z].*\.ts$') {
    $patterns.Add("Custom Hook abstraction (use...) to package reusable stateful behavior.")
    Add-Link -Links $links -Url "https://react.dev/learn/reusing-logic-with-custom-hooks" -Label "React custom hooks"
  }
  if ($relPath.EndsWith("/index.ts")) {
    $patterns.Add("Barrel export pattern: this file re-exports modules to simplify imports.")
  }
  if ($relPath.StartsWith("src/features/")) {
    $patterns.Add("Feature-based modularization: code grouped by domain/use-case instead of file type only.")
    Add-Link -Links $links -Url "https://fsd.how/docs/get-started/overview/" -Label "Feature-Sliced Design overview"
  }
  if ($relPath.StartsWith("src/shared/")) {
    $patterns.Add("Shared module boundary for reusable, feature-agnostic code.")
    Add-Link -Links $links -Url "https://fsd.how/docs/get-started/overview/" -Label "Feature-Sliced Design layers"
  }
  if ($relPath.StartsWith("src/app/providers/")) {
    $patterns.Add("Provider composition at app boundary: global services are injected near the root.")
    Add-Link -Links $links -Url "https://react.dev/learn/passing-data-deeply-with-context" -Label "React Provider pattern"
  }

  if ($relPath -eq "vite.config.ts") {
    Add-Link -Links $links -Url "https://vite.dev/config/" -Label "Vite config"
    Add-Link -Links $links -Url "https://vite.dev/config/shared-options.html#resolve-alias" -Label "Vite resolve.alias"
  }
  if ($relPath -eq "tsconfig.json" -or $relPath -eq "tsconfig.node.json") {
    Add-Link -Links $links -Url "https://www.typescriptlang.org/tsconfig" -Label "TSConfig reference"
  }
  if ($relPath -eq "package.json") {
    Add-Link -Links $links -Url "https://docs.npmjs.com/cli/v11/configuring-npm/package-json" -Label "npm package.json reference"
    Add-Link -Links $links -Url "https://vite.dev/guide/" -Label "Vite guide (Node support notes)"
    Add-Link -Links $links -Url "https://nodejs.org/en/about/previous-releases" -Label "Node release lines / LTS"
  }
  if ($relPath -eq "eslint.config.js") {
    Add-Link -Links $links -Url "https://eslint.org/docs/latest/use/configure/configuration-files" -Label "ESLint flat config"
  }
  if ($relPath.EndsWith("styles.css") -or $relPath -eq "postcss.config.js") {
    Add-Link -Links $links -Url "https://tailwindcss.com/docs/installation/using-vite" -Label "Tailwind with Vite"
    Add-Link -Links $links -Url "https://tailwindcss.com/docs/theme" -Label "Tailwind theme variables (@theme)"
    Add-Link -Links $links -Url "https://tailwindcss.com/docs/adding-custom-styles" -Label "Tailwind custom styles (@layer, @utility)"
  }
  if ($relPath -eq "src/main.tsx") {
    Add-Link -Links $links -Url "https://react.dev/reference/react-dom/client/createRoot" -Label "React createRoot"
    Add-Link -Links $links -Url "https://react.dev/reference/react/StrictMode" -Label "React StrictMode"
  }

  if ($isCodeLike) {
    if ($content -match 'window\.' -or $content -match 'document\.') {
      $risks.Add("This file touches browser globals (window/document). Keep SSR guards if this code ever runs outside the browser.")
    }
    if ($content -match 'localStorage') {
      $risks.Add("Uses localStorage; wrap in try/catch when writing and guard in non-browser contexts.")
    }
    if ($content -match 'MutationObserver' -and $content -match 'subtree:\s*true') {
      $risks.Add("MutationObserver with subtree can be expensive on large DOM trees; keep callbacks lightweight.")
    }
  }

  $purpose = ""
  if ($relPath -eq "src/main.tsx") {
    $purpose = "Application entrypoint that mounts React into #root and imports global styles."
  } elseif ($relPath -eq "src/app/App.tsx") {
    $purpose = "Top-level app composition component that selects the feature root to render."
  } elseif ($relPath.StartsWith("src/app/providers/")) {
    $purpose = "Provider-level module responsible for global cross-cutting concerns (theme, scroll behavior, shared context)."
  } elseif ($relPath.StartsWith("src/features/portfolio/")) {
    $purpose = "Portfolio feature module: page sections, navigation, and feature-specific composition logic."
  } elseif ($relPath.StartsWith("src/shared/components/")) {
    $purpose = "Reusable UI component intended to be consumed by multiple features."
  } elseif ($relPath.StartsWith("src/shared/hooks/")) {
    $purpose = "Reusable custom hook encapsulating browser or UI behavior behind a stable API."
  } elseif ($relPath.StartsWith("src/shared/lib/")) {
    $purpose = "Utility module with framework-agnostic or low-level logic shared by hooks/components."
  } elseif ($relPath.StartsWith("src/content/")) {
    $purpose = "Typed content/data source separated from rendering logic."
  } elseif ($relPath.EndsWith("styles.css")) {
    $purpose = "Global Tailwind + CSS token/theme definitions and reusable utility/component classes."
  } elseif ($relPath.EndsWith(".svg")) {
    $purpose = "Static vector asset used by UI components."
  } elseif ($relPath.EndsWith(".md")) {
    $purpose = "Project documentation file intended for developers/maintainers."
    Add-Link -Links $links -Url "https://www.markdownguide.org/basic-syntax/" -Label "Markdown guide"
  } else {
    $purpose = "Project file supporting app runtime, tooling, or documentation."
  }

  if ($syntax.Count -eq 0) {
    $syntax.Add("No notable language-specific syntax patterns detected beyond standard file content.")
  }
  if ($patterns.Count -eq 0) {
    $patterns.Add("No special architectural pattern detected; this file is mainly declarative/supporting content.")
  }
  if ($risks.Count -eq 0) {
    $risks.Add("Low-risk file. Main concern is keeping imports/exports and naming consistent with the project structure.")
  }

  $importsBlock = if ($imports.Count -eq 0) {
    "- None."
  } else {
    ($imports | Select-Object -First 20 | ForEach-Object { "- ``$(Escape-InlineCode $_)``" }) -join "`n"
  }

  $exportsBlock = if ($exports.Count -eq 0) {
    "- None."
  } else {
    ($exports | Select-Object -First 20 | ForEach-Object { "- ``$(Escape-InlineCode $_)``" }) -join "`n"
  }

  $syntaxBlock = ($syntax | Select-Object -Unique | ForEach-Object { "- $_" }) -join "`n"
  $patternsBlock = ($patterns | Select-Object -Unique | ForEach-Object { "- $_" }) -join "`n"
  $risksBlock = ($risks | Select-Object -Unique | ForEach-Object { "- $_" }) -join "`n"

  $linkBlock = if ($links.Count -eq 0) {
    "- None."
  } else {
    ($links.GetEnumerator() | Sort-Object Value | ForEach-Object { "- [$($_.Value)]($($_.Key))" }) -join "`n"
  }

  $kind = File-Kind -RelPath $relPath -Content $content
  $layer = Layer-Name -RelPath $relPath

  $md = @"
# $relPath

## Purpose
$purpose

## File Snapshot
- Kind: $kind
- Architecture layer: $layer
- Approximate length: $lineCount lines

## Imports Explained
$importsBlock

## Public API (Exports)
$exportsBlock

## Syntax Walkthrough (Beginner Friendly)
$syntaxBlock

## Design Patterns In This File
$patternsBlock

## Runtime Notes and Editing Risks
$risksBlock

## Learning Links (Official Docs)
$linkBlock

## Practical Editing Checklist
- Keep imports aligned with the app -> features -> shared boundary rule.
- Prefer typed interfaces/aliases for public function/component contracts.
- Re-run npm run typecheck, npm run lint, and npm run build after meaningful edits.
- If this file changes behavior visible to users, verify it in both desktop and mobile viewport sizes.
"@

  $docPath = Join-Path $outRoot ($relPath + ".md")
  $docDir = Split-Path -Parent $docPath
  New-Item -ItemType Directory -Force -Path $docDir | Out-Null
  Set-Content -LiteralPath $docPath -Value $md -Encoding utf8

  $documentedRelPaths.Add($relPath)
}

$indexPath = Join-Path $outRoot "README.md"
$sortedRelPaths = $documentedRelPaths | Sort-Object
$linksMarkdown = ($sortedRelPaths | ForEach-Object {
  $docRel = ($_ + ".md") -replace "\\", "/"
  "- [$($_)](./$docRel)"
}) -join "`n"

$index = @"
# Repository Reference Docs

This folder is generated documentation that mirrors the repository structure.
Each source file has a companion Markdown file here.

## Scope
- Excludes: .git, node_modules, dist, and this generated folder itself.
- Coverage count: $($sortedRelPaths.Count) files.

## How To Regenerate
Run:

~~~powershell
pwsh ./scripts/generate-repo-reference.ps1
~~~

## Documented Files
$linksMarkdown
"@

Set-Content -LiteralPath $indexPath -Value $index -Encoding utf8

Write-Host "Generated $($sortedRelPaths.Count) docs in $OutDir"
