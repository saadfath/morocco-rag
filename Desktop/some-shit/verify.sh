#!/bin/bash

# SACIMAK Project Verification Script

echo "🔍 SACIMAK - Project Verification"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

verify_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (MISSING)"
        return 1
    fi
}

verify_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (MISSING)"
        return 1
    fi
}

echo "📂 Checking Directory Structure..."
verify_dir "src/components"
verify_dir "src/store"
verify_dir "src/pages"
verify_dir "public/models"
echo ""

echo "📝 Checking Core Files..."
verify_file "src/App.jsx"
verify_file "src/main.jsx"
verify_file "src/index.css"
verify_file "package.json"
verify_file "tailwind.config.js"
verify_file "postcss.config.js"
echo ""

echo "🧩 Checking Components..."
verify_file "src/components/BagViewer.jsx"
verify_file "src/components/Customizer.jsx"
verify_file "src/components/OrderForm.jsx"
verify_file "src/components/Dashboard.jsx"
verify_file "src/components/Navbar.jsx"
echo ""

echo "📄 Checking Pages..."
verify_file "src/pages/Home.jsx"
verify_file "src/pages/DashboardPage.jsx"
echo ""

echo "🗄️ Checking Store..."
verify_file "src/store/useOrderStore.js"
echo ""

echo "📚 Checking Documentation..."
verify_file "README.md"
verify_file "MEMORY.md"
verify_file "PROGRESS.md"
verify_file "BUILD_COMPLETE.md"
echo ""

echo "🔨 Checking Build..."
if [ -d "dist" ]; then
    echo -e "${GREEN}✓${NC} Production build exists (dist/)"
else
    echo -e "${RED}✗${NC} No production build found (run: npm run build)"
fi
echo ""

echo "📦 Checking Dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${RED}✗${NC} Dependencies not installed (run: npm install)"
fi
echo ""

echo "=================================="
echo "✅ Verification Complete!"
echo ""
echo "🚀 To start the dev server, run:"
echo "   ./start.sh"
echo "   or: npm run dev"
echo ""
