# Frequently Asked Questions (FAQ)

## General Questions

### What is SMS to Telegram Forwarder?

SMS to Telegram Forwarder is an Android app that automatically forwards all incoming SMS messages to a Telegram bot. It works in the background and doesn't require the app to be open.

### Is this app free?

Yes, this is an open-source project released under the MIT License. It's completely free to use and modify.

### What Android versions are supported?

The app supports Android 6.0 (API 23) and above.

### Does it work on iOS?

No, this is an Android-only app. iOS does not allow third-party apps to access SMS messages due to platform restrictions.

## Setup Questions

### How do I get a Telegram bot token?

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the token provided by BotFather

### How do I find my Telegram chat ID?

**For personal chat:**
1. Send a message to your bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find the `chat.id` value in the JSON response

**For group chat:**
1. Add your bot to the group
2. Send a message in the group
3. Visit the same URL as above
4. The group chat ID will be negative (e.g., `-1001234567890`)

### Where do I put my bot token and chat ID?

Create a `.env` file in the project root:
```env
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Usage Questions

### Does the app need to be open to forward SMS?

No! The app uses Android's BroadcastReceiver and HeadlessJS task to work in the background, even when the app is closed.

### Will it forward old SMS messages?

No, it only forwards new incoming SMS messages received after you start the service.

### Can I filter which SMS to forward?

The current version forwards all SMS. You can modify the code in `src/sms/SmsTaskHandler.js` to add filtering logic based on sender or content.

### Does it delete SMS from my phone?

No, the app only reads SMS messages. Your original SMS remain in your phone's messaging app.

### Can I forward to multiple Telegram chats?

The current version supports one chat. You can modify `src/telegram/BotService.js` to send to multiple chats by calling `sendMessage` multiple times with different chat IDs.

## Troubleshooting

### SMS messages are not being forwarded

**Check these items:**
1. SMS permissions are granted (Settings → Apps → SMS Forwarder → Permissions)
2. The app shows "Running" status
3. Your `.env` file has correct credentials
4. Test Telegram connection using "Test Telegram" button
5. Check logcat: `adb logcat | grep SMS`

### "Test Telegram" button shows error

**Common causes:**
1. Incorrect bot token
2. Incorrect chat ID
3. Bot was blocked or deleted
4. No internet connection
5. Firewall blocking Telegram API

**Solutions:**
- Verify credentials in `.env` file
- Test manually with curl:
  ```bash
  curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
    -d "chat_id=<CHAT_ID>&text=test"
  ```

### App crashes on startup

1. Clear app data: Settings → Apps → SMS Forwarder → Storage → Clear Data
2. Reinstall the app: `npm run android`
3. Check logcat for errors: `adb logcat *:E`

### Permissions not being requested

1. Manually grant permissions: Settings → Apps → SMS Forwarder → Permissions
2. Check Android version (must be 6.0+)
3. Ensure `AndroidManifest.xml` has the required permissions

### Build errors

**"Could not find gradle wrapper":**
```bash
cd android
chmod +x gradlew
```

**"SDK location not found":**
Set `ANDROID_HOME` environment variable:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

**"Execution failed for task ':app:mergeDebugResources'":**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Privacy & Security

### Is my data secure?

- Messages are sent via HTTPS to Telegram
- No messages are stored in the app
- Bot token should be kept private
- Only you have access to your Telegram bot

### Can others see my SMS?

Only people who have access to your Telegram bot can see the forwarded messages. Keep your bot token private!

### Is this legal?

This depends on your jurisdiction. You're responsible for ensuring compliance with local laws regarding SMS forwarding and data privacy.

### Does this violate Telegram's Terms of Service?

Using Telegram Bot API is allowed. However, ensure you don't violate spam or abuse policies.

## Development

### Can I contribute to this project?

Yes! Check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How do I add new features?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

### Where can I report bugs?

Please open an issue on [GitHub Issues](https://github.com/yourusername/sms-to-tg-forwarder/issues).

### Can I use this code in my own project?

Yes! This project is licensed under MIT License. You're free to use, modify, and distribute it.

## Performance

### Does it drain battery?

The app is designed to be lightweight and should have minimal battery impact. It only activates when an SMS is received.

### How much data does it use?

Very little. Each SMS forwarded uses approximately 1-2 KB of data (just the HTTP request to Telegram).

### Will it slow down my phone?

No, the app is lightweight and uses minimal resources.

## Advanced

### Can I customize the message format?

Yes! Edit `src/sms/SmsTaskHandler.js` to change the message template.

### Can I add message encryption?

Yes, you can modify `src/telegram/BotService.js` to encrypt messages before sending.

### Can I use a different messaging service instead of Telegram?

Yes, replace the implementation in `src/telegram/BotService.js` with your preferred service's API.

### How do I enable debug logging?

Check Android logcat:
```bash
adb logcat | grep -E "SMS|Telegram"
```

## Still Have Questions?

- Check the [README.md](README.md)
- Review the [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Open an issue on [GitHub](https://github.com/yourusername/sms-to-tg-forwarder/issues)

---

Last updated: 2025-10-11

