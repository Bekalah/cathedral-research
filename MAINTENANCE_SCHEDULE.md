# Cathedral Research - Maintenance Schedule

## VS Code Cache Cleaning

VS Code can get into persistent cache corruption states that cause freezing and phantom errors. This has been an ongoing issue for this workspace.

### Quick Fix Script
Run this immediately when VS Code starts acting up:
```bash
./scripts/clean-vscode-cache.sh
```

### Regular Maintenance Schedule
**Run the cache cleaner:**
- ✅ Every Monday morning (weekly maintenance)
- ✅ Whenever you see 200+ phantom TypeScript errors
- ✅ When VS Code starts freezing on workspace open
- ✅ After major dependency updates
- ✅ Before important work sessions

### Warning Signs That Cache Cleaning is Needed:
- VS Code showing errors for files that don't exist
- TypeScript reporting 200+ errors when command line shows <50
- VS Code freezing on workspace open
- Phantom file references to deleted paths
- Language server stuck in loops

### Emergency Reset (Nuclear Option):
If the script doesn't work:
```bash
# Kill everything
sudo pkill -9 "Visual Studio Code"
sudo pkill -9 "Code Helper"

# Clear all VS Code data (WARNING: resets all settings)
rm -rf ~/Library/Application\ Support/Code
rm -rf ~/Library/Caches/com.microsoft.VSCode*
rm -rf ~/Library/Saved\ Application\ State/com.microsoft.VSCode*

# Reinstall VS Code extensions after this
```

### Automation Ideas:
- Add to calendar: "Weekly VS Code Cache Cleaning"
- Create alias: `alias vscode-clean="./scripts/clean-vscode-cache.sh"`
- Run before major demos/presentations