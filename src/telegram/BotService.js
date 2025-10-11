import axios from 'axios';
import Config from 'react-native-config';

/**
 * BotService - handles sending messages to Telegram bot
 * Uses Bot API to send formatted SMS messages
 */
class BotService {
  static BOT_TOKEN = Config.TELEGRAM_BOT_TOKEN;

  static CHAT_ID = Config.TELEGRAM_CHAT_ID;

  static API_URL = `https://api.telegram.org/bot${BotService.BOT_TOKEN}/sendMessage`;

  /**
   * Send message to Telegram chat
   * @param {string} text - Message text to send
   * @returns {Promise<void>}
   */
  static async sendMessage(text) {
    try {
      if (!BotService.BOT_TOKEN || !BotService.CHAT_ID) {
        throw new Error('Telegram bot token or chat ID not configured');
      }

      const response = await axios.post(
        BotService.API_URL,
        {
          chat_id: BotService.CHAT_ID,
          text,
          parse_mode: 'Markdown',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 seconds timeout
        },
      );

      if (response.data && response.data.ok) {
        console.log('Message sent to Telegram successfully');
      } else {
        throw new Error('Telegram API returned non-OK response');
      }
    } catch (error) {
      console.error('Failed to send message to Telegram:', error.message);
      throw error;
    }
  }

  /**
   * Test connection to Telegram bot
   * @returns {Promise<boolean>} True if connection successful
   */
  static async testConnection() {
    try {
      await BotService.sendMessage('🔧 Test message from SMS Forwarder');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default BotService;

