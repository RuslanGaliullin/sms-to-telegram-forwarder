import { NativeModules } from 'react-native';
import SmsListener from '../SmsListener';

// Mock the native module
jest.mock('react-native', () => ({
  NativeModules: {
    SmsReceiverModule: {
      startListening: jest.fn(),
      stopListening: jest.fn(),
      hasPermissions: jest.fn(),
    },
  },
}));

describe('SmsListener', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('startListening', () => {
    it('should call native module startListening', async () => {
      const mockResult = 'SMS Listener started';
      NativeModules.SmsReceiverModule.startListening.mockResolvedValue(mockResult);

      const result = await SmsListener.startListening();

      expect(NativeModules.SmsReceiverModule.startListening).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockResult);
      expect(console.log).toHaveBeenCalledWith('SMS Listener started:', mockResult);
    });

    it('should handle errors when starting listener', async () => {
      const mockError = new Error('Failed to start');
      NativeModules.SmsReceiverModule.startListening.mockRejectedValue(mockError);

      await expect(SmsListener.startListening()).rejects.toThrow('Failed to start');
      expect(console.error).toHaveBeenCalledWith('Failed to start SMS listener:', mockError);
    });
  });

  describe('stopListening', () => {
    it('should call native module stopListening', async () => {
      const mockResult = 'SMS Listener stopped';
      NativeModules.SmsReceiverModule.stopListening.mockResolvedValue(mockResult);

      const result = await SmsListener.stopListening();

      expect(NativeModules.SmsReceiverModule.stopListening).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockResult);
      expect(console.log).toHaveBeenCalledWith('SMS Listener stopped:', mockResult);
    });

    it('should handle errors when stopping listener', async () => {
      const mockError = new Error('Failed to stop');
      NativeModules.SmsReceiverModule.stopListening.mockRejectedValue(mockError);

      await expect(SmsListener.stopListening()).rejects.toThrow('Failed to stop');
      expect(console.error).toHaveBeenCalledWith('Failed to stop SMS listener:', mockError);
    });
  });

  describe('hasPermissions', () => {
    it('should return true when permissions are granted', async () => {
      NativeModules.SmsReceiverModule.hasPermissions.mockResolvedValue(true);

      const result = await SmsListener.hasPermissions();

      expect(NativeModules.SmsReceiverModule.hasPermissions).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false when permissions are not granted', async () => {
      NativeModules.SmsReceiverModule.hasPermissions.mockResolvedValue(false);

      const result = await SmsListener.hasPermissions();

      expect(result).toBe(false);
    });

    it('should return false on error', async () => {
      NativeModules.SmsReceiverModule.hasPermissions.mockRejectedValue(
        new Error('Permission check failed'),
      );

      const result = await SmsListener.hasPermissions();

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
