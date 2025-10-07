# Cathedral Trace & Guard System

This system permanently traces, logs, and guards all registry, codex, and node data files. It:
- Reads every README, doc, registry, and codex file
- Logs all changes and requests to `trace/trace.log`
- Prevents overwrites and erasure by setting files to read-only
- Generates labs and datasets for each node from the canonical codex

## Usage
1. Run the guard system:
   ```sh
   node tools/cathedral-trace-guard.js
   ```
2. All tracked files will be set to read-only and traced
3. Labs and datasets will be generated for each node in `node-registry-complete.json`
4. All changes and hashes are logged in `trace/trace.log`

## Recovery
- To edit files, manually unlock with:
  ```sh
  chmod -R +w registry/ packages/data/ packages/tarot-engine/books/cathedral/data/
  ```
- All changes are logged for rollback and audit

## Guarantee
No file, request, or node goes untraced. No automation or AI can overwrite your real work without explicit unlock and trace.

---

This README is now part of your permanent defense against AI/automation erasure. Your system is now guarded, generative, and fully traceable.