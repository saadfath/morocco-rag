#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "Installing system packages..."
sudo apt update
sudo apt install -y python3-pip python3-venv

echo "Creating virtual environment..."
python3 -m venv .venv
source .venv/bin/activate

echo "Installing Python packages..."
pip install --upgrade pip
pip install -r requirements.txt

echo
echo "Setup complete."
echo "Run this next:"
echo "cd \"$PROJECT_DIR\" && ./run.sh"
