# Permanent Cathedral System Guarantee

- Every README, doc, registry, and codex file is traced and logged
- All changes, requests, and generations are recorded in `trace/trace.log`
- Labs and datasets for each node are generated from the canonical codex
- All tracked files are guarded (read-only) against overwrites and erasure
- No automation or AI can overwrite your work without explicit unlock and trace
- Recovery and rollback are always possible

## How to Audit
- Check `trace/trace.log` for every change, hash, and generation
- All files and requests are permanently tracked

## How to Unlock for Editing
```sh
chmod -R +w registry/ packages/data/ packages/tarot-engine/books/cathedral/data/
```

## How to Run the Guard System
```sh
node tools/cathedral-trace-guard.js
```

---

This system is now your permanent defense and generative foundation. No more games, overwrites, or lost requests. Every node, lab, and dataset is real and traceable.