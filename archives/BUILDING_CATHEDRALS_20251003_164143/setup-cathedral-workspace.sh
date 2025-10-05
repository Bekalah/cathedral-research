#!/bin/bash

################################################################################
# Cathedral VS Code Workspace Setup
# One-command setup for the complete Cathedral development environment
################################################################################

set -e

echo "⚡ Setting up Cathedral VS Code Workspace…"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if in correct directory
if [ ! -f "package.json" ]; then
echo -e "${YELLOW}⚠️  package.json not found. Are you in the Cathedral project directory?${NC}"
echo "Run this from: ~/projects/bekalah.github.io/cathedral"
exit 1
fi

################################################################################
# Step 1: Create .vscode directory structure
################################################################################

echo -e "${BLUE}Step 1: Creating .vscode directory…${NC}"
mkdir -p .vscode

################################################################################
# Step 2: Install VS Code Extensions
################################################################################

echo -e "${BLUE}Step 2: Installing VS Code extensions…${NC}"

extensions=(
"github.copilot"
"github.copilot-chat"
"ritwickdey.liveserver"
"rangav.vscode-thunder-client"
"ms-azuretools.vscode-azurefunctions"
"ms-azuretools.vscode-azureresourcegroups"
"ms-vscode.azure-account"
"esbenp.prettier-vscode"
"dbaeumer.vscode-eslint"
"usernamehw.errorlens"
"pkief.material-icon-theme"
"eamodio.gitlens"
"xabikos.javascriptsnippets"
"christian-kohler.npm-intellisense"
"christian-kohler.path-intellisense"
"humao.rest-client"
"dracula-theme.theme-dracula"
)

for ext in "${extensions[@]}"; do
echo "  Installing $ext…"
code --install-extension "$ext" --force > /dev/null 2>&1
done

echo -e "${GREEN}✅ Extensions installed${NC}"

################################################################################
# Step 3: Create workspace settings
################################################################################

echo -e "${BLUE}Step 3: Creating workspace settings…${NC}"

cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.inlineSuggest.enabled": true,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.minimap.enabled": true,
  "editor.wordWrap": "on",

  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  "github.copilot.enable": {
    "*": true,
    "javascript": true,
    "html": true
  },

  "azureFunctions.projectRuntime": "~4",
  "azureFunctions.projectLanguage": "JavaScript",
  "azureFunctions.deploySubpath": "azure-functions",

  "liveServer.settings.port": 3000,
  "liveServer.settings.root": "/public",

  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.tabWidth": 2,

  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "Dracula",

  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "'Fira Code', monospace",

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
EOF

echo -e "${GREEN}✅ Settings created${NC}"

################################################################################
# Step 4: Create extensions.json
################################################################################

echo -e "${BLUE}Step 4: Creating extensions recommendations…${NC}"

cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "github.copilot",
    "github.copilot-chat",
    "ritwickdey.liveserver",
    "rangav.vscode-thunder-client",
    "ms-azuretools.vscode-azurefunctions",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "usernamehw.errorlens",
    "pkief.material-icon-theme",
    "eamodio.gitlens"
  ]
}
EOF

echo -e "${GREEN}✅ Extensions recommendations created${NC}"

################################################################################
# Step 5: Create tasks.json
################################################################################

echo -e "${BLUE}Step 5: Creating VS Code tasks…${NC}"

cat > .vscode/tasks.json << 'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🏰 Start Dev Server",
      "type": "shell",
      "command": "npm run dev",
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "⚡ Start Azure Functions",
      "type": "shell",
      "command": "cd azure-functions && func start"
    },
    {
      "label": "🎨 Build",
      "type": "shell",
      "command": "npm run build"
    },
    {
      "label": "🚀 Deploy",
      "type": "shell",
      "command": "npm run deploy"
    }
  ]
}
EOF

echo -e "${GREEN}✅ Tasks created${NC}"

################################################################################
# Step 6: Create launch.json
################################################################################

echo -e "${BLUE}Step 6: Creating debug configurations…${NC}"

cat > .vscode/launch.json << 'EOF'
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "🏰 Launch Cathedral",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/public"
    },
    {
      "type": "node",
      "request": "attach",
      "name": "⚡ Debug Azure Functions",
      "port": 9229
    }
  ]
}
EOF

echo -e "${GREEN}✅ Debug configurations created${NC}"

################################################################################
# Step 7: Create .prettierrc
################################################################################

echo -e "${BLUE}Step 7: Creating Prettier config…${NC}"

cat > .prettierrc << 'EOF'
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100,
  "arrowParens": "avoid"
}
EOF

echo -e "${GREEN}✅ Prettier config created${NC}"

################################################################################
# Step 8: Create .eslintrc
################################################################################

echo -e "${BLUE}Step 8: Creating ESLint config…${NC}"

cat > .eslintrc.json << 'EOF'
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "prefer-const": "warn"
  }
}
EOF

echo -e "${GREEN}✅ ESLint config created${NC}"

################################################################################
# Step 9: Install npm dependencies
################################################################################

echo -e "${BLUE}Step 9: Installing npm dependencies…${NC}"

npm install --save-dev prettier eslint > /dev/null 2>&1

echo -e "${GREEN}✅ Dependencies installed${NC}"

################################################################################
# Step 10: Create keyboard shortcuts
################################################################################

echo -e "${BLUE}Step 10: Creating keybindings…${NC}"

cat > .vscode/keybindings.json << 'EOF'
[
  {
    "key": "ctrl+shift+b",
    "command": "workbench.action.tasks.runTask",
    "args": "🏰 Start Dev Server"
  },
  {
    "key": "ctrl+shift+f",
    "command": "workbench.action.tasks.runTask",
    "args": "⚡ Start Azure Functions"
  },
  {
    "key": "ctrl+shift+d",
    "command": "workbench.action.tasks.runTask",
    "args": "🚀 Deploy"
  }
]
EOF

echo -e "${GREEN}✅ Keybindings created${NC}"

################################################################################
# Step 11: Create workspace file
################################################################################

echo -e "${BLUE}Step 11: Creating workspace file…${NC}"

cat > cathedral.code-workspace << 'EOF'
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {},
  "extensions": {
    "recommendations": [
      "github.copilot",
      "ritwickdey.liveserver",
      "ms-azuretools.vscode-azurefunctions"
    ]
  }
}
EOF

echo -e "${GREEN}✅ Workspace file created${NC}"

################################################################################
# Summary
################################################################################

echo ""
echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}✅ Cathedral Workspace Ready!${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo "Files created:"
echo "  📁 .vscode/"
echo "     ├── settings.json"
echo "     ├── extensions.json"
echo "     ├── tasks.json"
echo "     ├── launch.json"
echo "     └── keybindings.json"
echo "  📄 .prettierrc"
echo "  📄 .eslintrc.json"
echo "  📄 cathedral.code-workspace"
echo ""
echo "Next steps:"
echo "  1. Reload VS Code: ${BLUE}Cmd/Ctrl + Shift + P${NC} → 'Reload Window'"
echo "  2. Or open workspace: ${BLUE}File → Open Workspace${NC} → cathedral.code-workspace"
echo ""
echo "Quick commands:"
echo "  🏰 Start Dev:    ${BLUE}Ctrl+Shift+B${NC}"
echo "  ⚡ Azure Func:   ${BLUE}Ctrl+Shift+F${NC}"
echo "  🚀 Deploy:       ${BLUE}Ctrl+Shift+D${NC}"
echo ""
echo "🎨 Theme: Dracula (install if not available)"
echo "🔤 Font: Fira Code (download from https://github.com/tonsky/FiraCode)"
echo ""
echo -e "${BLUE}Happy coding! ⚡🏰${NC}"