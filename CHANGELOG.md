# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-11

### Added
- Initial release of SMS to Telegram Forwarder
- Real-time SMS forwarding to Telegram bot
- Background service using HeadlessJS
- Runtime permissions handling for Android
- Beautiful Material Design UI
- Telegram connection testing
- Complete test suite with 80%+ coverage
- GitHub Actions CI/CD pipeline
- Automated APK builds
- Comprehensive documentation (README, SETUP_GUIDE, CONTRIBUTING)

### Features
- Forward all incoming SMS to Telegram
- Works in background even when app is closed
- Support for Android API 23+ (Android 6.0+)
- Configurable via environment variables
- Error handling and logging
- Permission management UI

### Technical
- React Native 0.76.1
- Kotlin native modules
- BroadcastReceiver for SMS interception
- HeadlessJsTaskService for background processing
- Jest unit tests with React Native Testing Library
- ESLint + Prettier code quality tools

[1.0.0]: https://github.com/yourusername/sms-to-tg-forwarder/releases/tag/v1.0.0

