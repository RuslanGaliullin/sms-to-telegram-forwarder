import { NativeModules } from 'react-native';

const { SmsReceiverModule } = NativeModules;

/**
 * SmsListener - wrapper around native SMS receiver module
 * Provides methods to start/stop listening for SMS messages
 */
class SmsListener {
  /**
   * Start listening for incoming SMS messages
   * @returns {Promise<string>} Success message
   */
  static async startListening() {
    try {
      const result = await SmsReceiverModule.startListening();
      console.log('SMS Listener started:', result);
      return result;
    } catch (error) {
      console.error('Failed to start SMS listener:', error);
      throw error;
    }
  }

  /**
   * Stop listening for incoming SMS messages
   * @returns {Promise<string>} Success message
   */
  static async stopListening() {
    try {
      const result = await SmsReceiverModule.stopListening();
      console.log('SMS Listener stopped:', result);
      return result;
    } catch (error) {
      console.error('Failed to stop SMS listener:', error);
      throw error;
    }
  }

  /**
   * Check if SMS permissions are granted
   * @returns {Promise<boolean>} True if permissions granted
   */
  static async hasPermissions() {
    try {
      const hasPermissions = await SmsReceiverModule.hasPermissions();
      return hasPermissions;
    } catch (error) {
      console.error('Failed to check SMS permissions:', error);
      return false;
    }
  }
}

export default SmsListener;
