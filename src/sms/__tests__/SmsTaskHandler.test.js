import SmsTaskHandler from '../SmsTaskHandler';
import BotService from '../../telegram/BotService';

jest.mock('../../telegram/BotService');

describe('SmsTaskHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it('should process SMS and send to Telegram', async () => {
    const mockTaskData = {
      sender: '+1234567890',
      message: 'Test SMS message',
      timestamp: 1234567890000,
    };

    BotService.sendMessage.mockResolvedValue();

    await SmsTaskHandler(mockTaskData);

    expect(BotService.sendMessage).toHaveBeenCalledTimes(1);
    expect(BotService.sendMessage).toHaveBeenCalledWith(
      expect.stringContaining('+1234567890'),
    );
    expect(BotService.sendMessage).toHaveBeenCalledWith(
      expect.stringContaining('Test SMS message'),
    );
    expect(console.log).toHaveBeenCalledWith('Processing SMS in background:', mockTaskData);
    expect(console.log).toHaveBeenCalledWith('SMS successfully forwarded to Telegram');
  });

  it('should handle errors when sending to Telegram fails', async () => {
    const mockTaskData = {
      sender: '+1234567890',
      message: 'Test SMS message',
      timestamp: 1234567890000,
    };

    const mockError = new Error('Failed to send');
    BotService.sendMessage.mockRejectedValue(mockError);

    await SmsTaskHandler(mockTaskData);

    expect(console.error).toHaveBeenCalledWith(
      'Error processing SMS in background:',
      mockError,
    );
  });

  it('should format message correctly', async () => {
    const mockTaskData = {
      sender: '+9876543210',
      message: 'Another test message',
      timestamp: 1609459200000, // 2021-01-01 00:00:00 UTC
    };

    BotService.sendMessage.mockResolvedValue();

    await SmsTaskHandler(mockTaskData);

    const callArg = BotService.sendMessage.mock.calls[0][0];
    expect(callArg).toContain('📱 *New SMS Received*');
    expect(callArg).toContain('👤 From: +9876543210');
    expect(callArg).toContain('📝 Message: Another test message');
    expect(callArg).toContain('🕒 Time:');
  });
});

