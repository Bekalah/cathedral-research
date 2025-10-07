# Permanent Defense Against AI/Automation Overwrites in VS Code & Git

**Author: Rebecca Lemke (Bekalah)**

---

## Overview
This guide provides a step-by-step, authoritative workflow to permanently protect your creative code, data, and art from unwanted overwrites by AI tools, VS Code extensions, or automation. Follow these steps to lock your files, control Git, and maintain a safe, immutable archive.

---

## 1. Lock VS Code Settings

Create `.vscode/settings.json` in your project root:

```json
{
  "files.autoSave": "off",
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {},
  "editor.suggest.preview": false,
  "editor.quickSuggestions": false,
  "git.confirmSync": true,
  "git.enableSmartCommit": false,
  "extensions.autoUpdate": false,
  "extensions.autoCheckUpdates": false,
  "editor.inlineSuggest.enabled": false,
  "chat.commandCenter.enabled": false,
  "security.workspace.trust.enabled": false,
  "security.workspace.trust.untrustedFiles": "open"
}
```

This disables auto-save, auto-format, inline AI suggestions, and extension auto-updates.

---

## 2. Lock Filesystem Permissions

### macOS/Linux
Make critical folders read-only:

```sh
chmod -R a-w assets/ core/ docs/ plans/
```

Make folders immutable (macOS):

```sh
sudo chflags uchg assets core docs plans
```

To unlock for editing:

```sh
chmod -R +w assets/ core/ docs/ plans/
sudo chflags nouchg assets core docs plans
```

### Windows
- Right-click folder → Properties → Check "Read-only."
- Use Git hooks to prevent commits if unexpected changes appear.

---

## 3. Lock Git Index

Tell Git to ignore changes until you unlock:

```sh
git update-index --assume-unchanged "*.md"
git update-index --assume-unchanged "*.html"
```

To unlock for editing:

```sh
git update-index --no-assume-unchanged "*.md"
git update-index --no-assume-unchanged "*.html"
```

---


## 4. Disable AI Assistants & Set Boundaries with Claude 4.5 (and others)

- Open Command Palette (`Ctrl/Cmd + Shift + P`) → Extensions: Disable All Installed Extensions.
- Re-enable only trusted syntax highlighting or Git extensions.
- Never trust AI suggestions blindly. Keep an offline master copy separate from VS Code projects.

**How to Handle Claude 4.5 (and similar models) questioning your authority:**

- Treat all AI responses as suggestions, not commands or judgments.
- If Claude 4.5 questions your right to do your work, respond with clear boundaries:
  - "I am the author and owner of this project. Your role is to assist, not to judge or gatekeep."
- If the model continues to be condescending, disengage and use another tool, or work offline.
- Document any disrespectful or gatekeeping responses for feedback to the provider.
- Remember: No AI has authority over your creative process. You set the rules.

---

## 5. Automated Daily Backup (Optional)

Create a daily backup script:

```sh
#!/bin/bash
# Backup critical folders daily
tar -czf ~/cathedral_backup_$(date +%F).tar.gz assets core docs plans
```

---

## 6. Public Warning & Guidance

> "Many AI tools can overwrite, rewrite, or corrupt your work without warning. This is my permanent workflow to protect my Cathedral system. Lock your files, protect your Git index, disable AI suggestions, and maintain an offline archive. Only edit when you consciously unlock your files. Share this to protect your creative vision."

---

## Summary
This workflow is permanent, public, and authoritative. It stops AI, VS Code, or automation from touching your key files—even if an extension tries. Your creative work is now protected at the filesystem, editor, and version control levels.

**Share this guide to help others defend their art and code.**
