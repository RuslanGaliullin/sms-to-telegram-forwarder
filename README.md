# SMS to Telegram Forwarder

![CI](https://github.com/RuslanGaliullin/sms-to-telegram-forwarder/workflows/CI/badge.svg)
[![Build Status](https://img.shields.io/github/actions/workflow/status/RuslanGaliullin/sms-to-telegram-forwarder/ci.yml?branch=main)](https://github.com/RuslanGaliullin/sms-to-telegram-forwarder/actions)

A React Native Android application that automatically forwards all incoming SMS messages to a specified Telegram bot. The app works in the background and uses a Headless JS task to ensure SMS are forwarded even when the app is closed.

## ✨ Features

- 📱 **Real-time SMS forwarding** - Automatically forwards all incoming SMS
- 🤖 **Telegram integration** - Sends messages directly to your Telegram bot
- 🔒 **Background operation** - Works even when app is closed
- ⚡ **Minimal and efficient** - Lightweight with no unnecessary dependencies
- 🧪 **Fully tested** - 80%+ code coverage with Jest
- 🚀 **CI/CD ready** - GitHub Actions workflow for automated testing and builds

## 📋 Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Android Studio** or Android SDK (API 24+ / Android 7.0+)
- **Java Development Kit** (JDK) 17
- **Telegram Bot Token** ([Create bot via @BotFather](https://t.me/botfather))
- **Telegram Chat ID** ([Get your chat ID](https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates))

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sms-to-tg-forwarder.git
cd sms-to-tg-forwarder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
```

#### How to get Telegram credentials:

1. **Bot Token**: 
   - Open Telegram and search for [@BotFather](https://t.me/botfather)
   - Send `/newbot` command
   - Follow instructions to create your bot
   - Copy the bot token provided

2. **Chat ID**:
   - Send a message to your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find `"chat":{"id":YOUR_CHAT_ID}` in the response
   - Use this ID in your `.env` file

### 4. Run the application

```bash
# Start Metro bundler
npm start

# In another terminal, run on Android device/emulator
npm run android
```

## 📱 Usage

1. **Grant Permissions**: When you first open the app, tap "Request Permissions" to grant SMS permissions
2. **Test Connection**: Tap "Test Telegram" to verify your bot configuration
3. **Start Forwarding**: Tap "Start" to begin forwarding SMS messages
4. **Background Operation**: The app will continue forwarding SMS even when closed

## 🏗️ Project Structure

```
sms-to-tg-forwarder/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD
├── android/                       # Native Android project
│   ├── app/
│   │   └── src/main/java/com/smsforwarding/
│   │       ├── MainActivity.kt
│   │       ├── MainApplication.kt
│   │       ├── SmsReceiver.kt     # BroadcastReceiver for SMS
│   │       ├── SmsTaskService.kt  # HeadlessJS service
│   │       ├── SmsReceiverModule.kt
│   │       └── SmsReceiverPackage.kt
│   └── ...
├── src/
│   ├── App.js                     # Main UI component
│   ├── sms/
│   │   ├── SmsListener.js         # Native module wrapper
│   │   ├── SmsTaskHandler.js      # Background task handler
│   │   └── __tests__/
│   └── telegram/
│       ├── BotService.js          # Telegram API integration
│       └── __tests__/
├── __tests__/                     # Global tests
│   └── App.test.js
├── .eslintrc.js                   # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── babel.config.js                # Babel configuration
├── jest.config.js                 # Jest configuration
├── package.json
└── README.md
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The project maintains 80%+ code coverage. Coverage reports are automatically uploaded to Codecov in CI.

## 🔧 Development

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### Building

```bash
# Build debug APK
npm run build:android

# APK will be located at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## 🚀 CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- **Lint**: ESLint checks on every push/PR
- **Test**: Jest unit tests with coverage reporting
- **Build**: Automated Android debug APK builds
- **Artifacts**: Built APK is uploaded as a downloadable artifact

### Workflow triggers:

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## 📦 Dependencies

### Production
- `react-native` - Core framework
- `axios` - HTTP client for Telegram API
- `react-native-config` - Environment variables management
- `react-native-permissions` - Runtime permissions handling
- `react-native-background-fetch` - Background task scheduling

### Development
- `jest` - Testing framework
- `@testing-library/react-native` - React Native testing utilities
- `eslint` - Code linting (Airbnb config)
- `prettier` - Code formatting

## 🔒 Permissions

The app requires the following Android permissions:

- `READ_SMS` - To read SMS messages
- `RECEIVE_SMS` - To receive incoming SMS
- `INTERNET` - To send data to Telegram
- `FOREGROUND_SERVICE` - For background operation
- `RECEIVE_BOOT_COMPLETED` - To start on device boot

## 🐛 Troubleshooting

### SMS not being forwarded

1. Check that SMS permissions are granted in Android settings
2. Verify `.env` file contains correct Telegram credentials
3. Test Telegram connection using "Test Telegram" button
4. Check Android logcat for errors: `adb logcat | grep SMS`

### Build errors

```bash
# Clean build cache
cd android
./gradlew clean

# Rebuild
cd ..
npm run android
```

### Metro bundler issues

```bash
# Reset Metro cache
npm start -- --reset-cache
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

## ⚠️ Disclaimer

This app is for educational and personal use only. Please ensure you comply with local laws and regulations regarding SMS forwarding and data privacy.

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Telegram Bot API for easy integration
- Open source community for various libraries used

---

Made with ❤️ for the React Native community

