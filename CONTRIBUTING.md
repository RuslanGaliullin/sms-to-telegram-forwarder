# Contributing to SMS to Telegram Forwarder

First off, thank you for considering contributing to SMS to Telegram Forwarder! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, React Native version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes (`npm test`)
5. Make sure your code lints (`npm run lint`)
6. Issue that pull request!

## Development Process

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sms-to-tg-forwarder.git
   cd sms-to-tg-forwarder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Write/update tests

5. **Run tests**
   ```bash
   npm test
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git commit -m "Add some feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

8. **Create a Pull Request**

## Code Style

- We use ESLint with Airbnb config
- We use Prettier for code formatting
- Run `npm run lint:fix` to auto-fix issues

## Testing

- Write unit tests for new features
- Maintain code coverage above 80%
- Run `npm test` before submitting PR

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

## Project Structure

Please familiarize yourself with the project structure before contributing:

```
src/
├── App.js              # Main application component
├── sms/                # SMS-related modules
│   ├── SmsListener.js
│   └── SmsTaskHandler.js
└── telegram/           # Telegram-related modules
    └── BotService.js
```

## Questions?

Feel free to open an issue with the `question` label if you have any questions!

Thank you for contributing! 🚀

