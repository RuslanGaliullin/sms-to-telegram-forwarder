# Setup Guide - SMS to Telegram Forwarder

This guide will walk you through setting up the SMS to Telegram Forwarder from scratch.

## Prerequisites Installation

### 1. Install Node.js

**macOS (using Homebrew):**
```bash
brew install node@20
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
Download and install from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should be v20.x.x or higher
npm --version   # Should be v10.x.x or higher
```

### 2. Install Java Development Kit (JDK)

**macOS:**
```bash
brew install --cask temurin@17
```

**Ubuntu/Debian:**
```bash
sudo apt install openjdk-17-jdk
```

**Windows:**
Download from [Adoptium](https://adoptium.net/)

Verify installation:
```bash
java -version  # Should show version 17
```

### 3. Install Android Studio

1. Download from [developer.android.com](https://developer.android.com/studio)
2. Install and run Android Studio
3. Go to Settings → Appearance & Behavior → System Settings → Android SDK
4. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Command-line Tools
   - Android SDK Platform-Tools

### 4. Configure Environment Variables

**macOS/Linux** - Add to `~/.bashrc` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk  # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows** - Add to System Environment Variables:
```
ANDROID_HOME=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
```

Reload your shell and verify:
```bash
adb --version
```

## Creating Your Telegram Bot

### Step 1: Create Bot with BotFather

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Choose a name for your bot (e.g., "My SMS Forwarder")
4. Choose a username (must end with 'bot', e.g., "my_sms_forwarder_bot")
5. Copy the **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

**Method 1 - Using a Bot:**
1. Search for `@userinfobot` in Telegram
2. Send any message
3. It will reply with your Chat ID

**Method 2 - Using API:**
1. Send a message to your bot
2. Visit in browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for `"chat":{"id":YOUR_CHAT_ID}`

**For Group Chats:**
1. Add your bot to the group
2. Send a message in the group
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the group chat ID (will be negative, like `-1001234567890`)

## Project Setup

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/sms-to-tg-forwarder.git
cd sms-to-tg-forwarder
npm install
```

### 2. Configure Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
```

### 3. Prepare Android Device/Emulator

**Physical Device:**
1. Enable Developer Options:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"
3. Connect via USB
4. Verify: `adb devices`

**Emulator:**
1. Open Android Studio
2. Tools → Device Manager
3. Create Virtual Device
4. Choose Pixel 5 or similar
5. Download and select Android 13 (API 33) or higher
6. Start the emulator
7. Verify: `adb devices`

### 4. Run the Application

**Terminal 1 - Start Metro:**
```bash
npm start
```

**Terminal 2 - Run on Android:**
```bash
npm run android
```

The app should install and open on your device/emulator.

## First Run

1. **Grant Permissions:**
   - When the app opens, tap "Request Permissions"
   - Grant "SMS" permissions when prompted

2. **Test Telegram Connection:**
   - Tap "Test Telegram" button
   - You should receive a test message in your Telegram chat
   - If successful, you'll see "Telegram bot connection is working!"

3. **Start Forwarding:**
   - Tap "Start" button
   - Status should change to "Running"

4. **Test SMS Forwarding:**
   - Send a test SMS to your device
   - Check your Telegram chat for the forwarded message

## Troubleshooting

### App won't install
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Permissions not working
- Go to Android Settings → Apps → SMS Forwarder → Permissions
- Manually grant SMS permissions

### Telegram messages not sending
- Check `.env` file credentials
- Test with curl:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"<YOUR_CHAT_ID>","text":"Test"}'
```

### SMS not being received
- Check logcat: `adb logcat | grep SMS`
- Verify BroadcastReceiver is registered:
```bash
adb shell dumpsys package com.smsforwarding | grep -A 5 "Receiver"
```

## Building Release APK

1. Generate upload key:
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure signing in `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

3. Build:
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Next Steps

- Set up GitHub Actions (already configured in `.github/workflows/ci.yml`)
- Customize the app UI in `src/App.js`
- Add additional features in `src/sms/` and `src/telegram/`
- Write tests for new features

## Support

If you encounter any issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/sms-to-tg-forwarder/issues)
3. Create a new issue with detailed information

Happy forwarding! 🚀

