# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of SMS to Telegram Forwarder seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: [your-email@example.com]

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible

## Security Considerations

### SMS Permissions

This app requires sensitive SMS permissions. Users should be aware:

- The app can read all incoming SMS messages
- Messages are forwarded to a Telegram bot
- Ensure your Telegram bot token is kept secure
- Never share your `.env` file or commit it to version control

### Data Privacy

- SMS messages are transmitted directly to Telegram's servers
- No messages are stored locally except in system logs
- Messages are sent via HTTPS to ensure encryption in transit
- Consider data privacy laws in your jurisdiction before using this app

### Best Practices

1. **Keep credentials secure**: Never commit `.env` file to version control
2. **Use a dedicated bot**: Create a bot specifically for SMS forwarding
3. **Limit bot access**: Only share bot access with trusted parties
4. **Regular updates**: Keep the app and dependencies updated
5. **Review permissions**: Regularly review which apps have SMS access
6. **Private chat**: Use a private Telegram chat, not a public channel

## Known Security Limitations

1. **Plain text transmission**: While HTTPS is used, messages are not end-to-end encrypted beyond Telegram's encryption
2. **No message filtering**: All SMS are forwarded without content filtering
3. **Token exposure**: Bot token is stored in plain text in `.env` file (not encrypted at rest)
4. **No authentication**: Anyone with the bot token can send messages to the chat

## Recommendations for Production Use

If you're using this in a production environment:

1. Implement additional encryption for the `.env` file
2. Add message filtering to prevent forwarding sensitive content
3. Implement rate limiting to prevent abuse
4. Add authentication mechanisms for the bot
5. Regular security audits of the codebase
6. Monitor Telegram bot activity for suspicious behavior

## Compliance

Users are responsible for ensuring compliance with:

- Local SMS and telecommunications regulations
- Data privacy laws (GDPR, CCPA, etc.)
- Terms of service of their mobile carrier
- Telegram's Terms of Service

## Contact

For any security concerns, please email: [your-email@example.com]

---

Last updated: 2025-10-11

