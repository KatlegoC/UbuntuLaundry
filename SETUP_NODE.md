# Node.js Installation Guide

Node.js is required to run this application. Here are the installation options:

## Option 1: Install via Homebrew (Recommended for macOS)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

## Option 2: Download from Official Website

1. Visit https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

## Option 3: Install via nvm (Node Version Manager)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.zshrc

# Install Node.js
nvm install --lts
nvm use --lts
```

## Verify Installation

After installation, verify it works:

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

## After Installing Node.js

Once Node.js is installed, return to the project directory and run:

```bash
cd "/Users/katlegotshabangu/Projects/Ubuntu Laundry"
npm install
cd server && npm install && cd ..
```

Then you can start the application as described in README.md.

