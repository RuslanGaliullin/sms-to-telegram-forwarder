# Quick Start Guide

Get SMS to Telegram Forwarder running in 5 minutes! ⚡

## Prerequisites

- Node.js 20+
- Android Studio or Android device with USB debugging
- Telegram account

## Installation

### 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/sms-to-tg-forwarder.git
cd sms-to-tg-forwarder

# Install dependencies
npm install
```

### 2. Configure Telegram (2 minutes)

**Create a bot:**
1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Follow instructions
4. Copy the bot token

**Get your chat ID:**
1. Send a message to your bot
2. Open: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
3. Find your `chat.id`

**Create .env file:**
```bash
cp .env.example .env
```

Edit `.env`:
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### 3. Run the App (1 minute)

```bash
# Terminal 1: Start Metro
npm start

# Terminal 2: Run on Android
npm run android
```

## First Use

1. **Grant Permissions**: Tap "Request Permissions"
2. **Test**: Tap "Test Telegram" (you should receive a message)
3. **Start**: Tap "Start" button
4. **Test SMS**: Send yourself a test SMS

That's it! Your SMS will now be forwarded to Telegram. 🎉

## Quick Commands

```bash
# Run the app
npm run android

# Run tests
npm test

# Check code quality
npm run lint

# Build APK
npm run build:android
```

## Troubleshooting

### Can't run the app?
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### Permissions not working?
Settings → Apps → SMS Forwarder → Permissions → Grant all

### Telegram not connecting?
- Check `.env` credentials
- Test with: `npm run test -- BotService`

## Next Steps

- Read full [README.md](README.md)
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for details
- Browse [FAQ.md](FAQ.md) for common questions

## Need Help?

Open an issue: https://github.com/yourusername/sms-to-tg-forwarder/issues

Happy forwarding! 🚀

