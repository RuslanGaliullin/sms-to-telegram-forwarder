import axios from 'axios';
import BotService from '../BotService';

// Mock axios
jest.mock('axios');

// Mock react-native-config
jest.mock('react-native-config', () => ({
  TELEGRAM_BOT_TOKEN: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
  TELEGRAM_CHAT_ID: '-1001234567890',
}));

describe('BotService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('sendMessage', () => {
    it('should send message to Telegram successfully', async () => {
      const mockResponse = {
        data: {
          ok: true,
          result: {
            message_id: 123,
          },
        },
      };

      axios.post.mockResolvedValue(mockResponse);

      const testMessage = 'Test SMS message';
      await BotService.sendMessage(testMessage);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('https://api.telegram.org/bot'),
        {
          chat_id: '-1001234567890',
          text: testMessage,
          parse_mode: 'Markdown',
        },
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }),
      );
      expect(console.log).toHaveBeenCalledWith('Message sent to Telegram successfully');
    });

    it('should throw error when bot token is missing', async () => {
      const originalToken = BotService.BOT_TOKEN;
      BotService.BOT_TOKEN = '';

      await expect(BotService.sendMessage('test')).rejects.toThrow(
        'Telegram bot token or chat ID not configured',
      );

      BotService.BOT_TOKEN = originalToken;
    });

    it('should throw error when chat ID is missing', async () => {
      const originalChatId = BotService.CHAT_ID;
      BotService.CHAT_ID = '';

      await expect(BotService.sendMessage('test')).rejects.toThrow(
        'Telegram bot token or chat ID not configured',
      );

      BotService.CHAT_ID = originalChatId;
    });

    it('should handle API errors', async () => {
      const mockError = new Error('Network error');
      axios.post.mockRejectedValue(mockError);

      await expect(BotService.sendMessage('test')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith(
        'Failed to send message to Telegram:',
        'Network error',
      );
    });

    it('should throw error when API returns non-OK response', async () => {
      const mockResponse = {
        data: {
          ok: false,
          error_code: 400,
          description: 'Bad Request',
        },
      };

      axios.post.mockResolvedValue(mockResponse);

      await expect(BotService.sendMessage('test')).rejects.toThrow(
        'Telegram API returned non-OK response',
      );
    });
  });

  describe('testConnection', () => {
    it('should return true on successful connection', async () => {
      const mockResponse = {
        data: {
          ok: true,
        },
      };

      axios.post.mockResolvedValue(mockResponse);

      const result = await BotService.testConnection();

      expect(result).toBe(true);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          text: '🔧 Test message from SMS Forwarder',
        }),
        expect.any(Object),
      );
    });

    it('should return false on connection failure', async () => {
      axios.post.mockRejectedValue(new Error('Connection failed'));

      const result = await BotService.testConnection();

      expect(result).toBe(false);
    });
  });
});
