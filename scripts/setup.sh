#!/bin/bash

# SMS to Telegram Forwarder - Setup Script
# This script helps set up the development environment

set -e

echo "🚀 SMS to Telegram Forwarder - Setup Script"
echo "==========================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 20.x from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Node.js version is $NODE_VERSION, but 20 or higher is recommended"
else
    echo "✅ Node.js $(node -v) is installed"
fi

# Check npm
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi
echo "✅ npm $(npm -v) is installed"

# Check Java
echo "☕ Checking Java..."
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed!"
    echo "Please install Java 17 from https://adoptium.net/"
    exit 1
fi
echo "✅ Java is installed"

# Check Android SDK
echo "🤖 Checking Android SDK..."
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME is not set!"
    echo "Please set ANDROID_HOME environment variable"
    echo "Example: export ANDROID_HOME=\$HOME/Library/Android/sdk"
else
    echo "✅ ANDROID_HOME is set to: $ANDROID_HOME"
fi

# Check adb
if ! command -v adb &> /dev/null; then
    echo "⚠️  adb is not found in PATH"
else
    echo "✅ adb is available"
fi

# Install dependencies
echo ""
echo "📥 Installing npm dependencies..."
npm install

# Check for .env file
echo ""
echo "🔧 Checking configuration..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo "⚠️  Please edit .env and add your Telegram credentials!"
else
    echo "✅ .env file exists"
fi

# Make gradlew executable
echo ""
echo "🔧 Setting up Android build tools..."
chmod +x android/gradlew
echo "✅ Made gradlew executable"

# Check for connected devices
echo ""
echo "📱 Checking for connected devices..."
if command -v adb &> /dev/null; then
    DEVICES=$(adb devices | grep -v "List" | grep "device" | wc -l)
    if [ "$DEVICES" -gt 0 ]; then
        echo "✅ Found $DEVICES connected device(s)"
        adb devices
    else
        echo "⚠️  No Android devices/emulators found"
        echo "Please connect a device or start an emulator"
    fi
fi

# Summary
echo ""
echo "==========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Telegram credentials"
echo "2. Connect an Android device or start an emulator"
echo "3. Run 'npm start' to start Metro bundler"
echo "4. Run 'npm run android' to install the app"
echo ""
echo "For more information, see README.md and SETUP_GUIDE.md"
echo ""

