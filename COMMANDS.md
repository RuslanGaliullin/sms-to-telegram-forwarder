# Useful Commands

A collection of useful commands for development and debugging.

## Development

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android device/emulator
npm run android

# Run with specific device
npm run android -- --deviceId=<device_id>

# Reset Metro cache
npm start -- --reset-cache
```

### Building

```bash
# Build debug APK
npm run build:android

# Build release APK (after configuring signing)
cd android && ./gradlew assembleRelease

# Clean build
cd android && ./gradlew clean && cd ..
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- SmsListener.test.js

# Update test snapshots
npm test -- -u
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting errors
npm run lint:fix

# Format with Prettier
npx prettier --write "src/**/*.js"

# Check formatting
npx prettier --check "src/**/*.js"
```

## Android Debugging

### ADB Commands

```bash
# List connected devices
adb devices

# View logcat
adb logcat

# Filter logcat for SMS
adb logcat | grep SMS

# Filter for errors
adb logcat *:E

# Clear logcat
adb logcat -c

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Uninstall app
adb uninstall com.smsforwarding

# Take screenshot
adb shell screencap /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Record screen
adb shell screenrecord /sdcard/demo.mp4
adb pull /sdcard/demo.mp4
```

### App Management

```bash
# Start app
adb shell am start -n com.smsforwarding/.MainActivity

# Stop app
adb shell am force-stop com.smsforwarding

# Clear app data
adb shell pm clear com.smsforwarding

# Check app info
adb shell dumpsys package com.smsforwarding

# Check permissions
adb shell dumpsys package com.smsforwarding | grep permission

# Grant permission
adb shell pm grant com.smsforwarding android.permission.RECEIVE_SMS
adb shell pm grant com.smsforwarding android.permission.READ_SMS
```

### Testing SMS

```bash
# Send test SMS via emulator console
# First, connect to emulator console:
telnet localhost 5554  # Port number from adb devices (emulator-5554)

# Then send SMS:
sms send +1234567890 "Test message"

# Or use adb (Android 7+):
adb shell service call isms 5 s16 "+1234567890" s16 "null" s16 "Test SMS"
```

### Performance Profiling

```bash
# CPU profiling
adb shell am profile start com.smsforwarding /sdcard/profile.trace
# ... use the app ...
adb shell am profile stop com.smsforwarding
adb pull /sdcard/profile.trace

# Memory info
adb shell dumpsys meminfo com.smsforwarding

# Battery stats
adb shell dumpsys batterystats com.smsforwarding

# Network stats
adb shell dumpsys netstats | grep com.smsforwarding
```

## Git Commands

```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Update from main
git checkout main
git pull
git checkout feature/my-feature
git rebase main

# Squash commits
git rebase -i HEAD~3  # Last 3 commits
```

## Gradle Commands

```bash
cd android

# List tasks
./gradlew tasks

# Build debug
./gradlew assembleDebug

# Build release
./gradlew assembleRelease

# Clean
./gradlew clean

# Check dependencies
./gradlew dependencies

# Update Gradle wrapper
./gradlew wrapper --gradle-version 8.8
```

## NPM Commands

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# List installed packages
npm list --depth=0

# Check package info
npm info react-native
```

## CI/CD

```bash
# Simulate CI locally
npm ci
npm run lint
npm test -- --ci --coverage
cd android && ./gradlew assembleDebug
```

## Telegram API Testing

```bash
# Test bot token
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"

# Send test message
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"<CHAT_ID>","text":"Test message"}'

# Get updates
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates"

# Get chat info
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getChat?chat_id=<CHAT_ID>"
```

## Debugging React Native

```bash
# Enable debug menu on device
adb shell input keyevent 82

# Reload app
adb shell input keyevent R R

# Enable hot reload
# In debug menu, select "Enable Hot Reloading"

# Open React DevTools
npx react-devtools

# Debug JavaScript
# Chrome DevTools will open automatically when you shake the device
```

## File Management

```bash
# Find large files
find . -type f -size +10M

# Count lines of code
find src -name '*.js' | xargs wc -l

# Find TODO comments
grep -r "TODO" src/

# Search for specific text
grep -r "SmsListener" src/
```

## Environment

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check Java version
java -version

# Check Android SDK path
echo $ANDROID_HOME

# Check available emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_33
```

## Cleanup

```bash
# Clean all build artifacts
rm -rf android/app/build
rm -rf android/build
rm -rf node_modules
npm install

# Clean Metro cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-*

# Clean watchman
watchman watch-del-all

# Full clean reinstall
rm -rf node_modules android/app/build android/build
npm install
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

## Quick Shortcuts

Create these aliases in your `~/.bashrc` or `~/.zshrc`:

```bash
alias rn-start='npm start'
alias rn-android='npm run android'
alias rn-clean='rm -rf node_modules && npm install && cd android && ./gradlew clean && cd ..'
alias rn-test='npm test'
alias rn-lint='npm run lint:fix'
alias adb-log='adb logcat | grep SMS'
alias adb-clear='adb logcat -c'
```

## Documentation

```bash
# Generate JSDoc
npm install -g jsdoc
jsdoc -c jsdoc.json

# Generate dependency graph
npm install -g madge
madge --image graph.png src/

# Check bundle size
npm install -g source-map-explorer
source-map-explorer android/app/build/outputs/bundle.js
```

---

💡 **Tip**: Bookmark this file for quick reference during development!

