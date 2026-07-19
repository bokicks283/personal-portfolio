# Project Documentation

This folder contains two kinds of documentation:

- `repo-reference/`: generated file-by-file docs that mirror the codebase.
- `architecture/`: hand-written docs that explain *why* the project is structured this way.
- `tooling/`: hand-written docs that track framework/version alignment decisions.
- `performance/`: performance workflow, metrics, and pass-by-pass optimization reports.

Start here:

- [Architecture Overview](./architecture/README.md)
- [Tooling Alignment (2026-03)](./tooling/stack-alignment-2026-03.md)
- [Performance Docs](./performance/README.md)
- [Generated Repo Reference](./repo-reference/README.md)

Regenerate the file-by-file docs with:

```powershell
pwsh ./scripts/generate-repo-reference.ps1
```
