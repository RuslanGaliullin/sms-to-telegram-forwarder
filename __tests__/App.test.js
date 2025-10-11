import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, PermissionsAndroid } from 'react-native';
import App from '../src/App';
import SmsListener from '../src/sms/SmsListener';
import BotService from '../src/telegram/BotService';

// Mock dependencies
jest.mock('../src/sms/SmsListener');
jest.mock('../src/telegram/BotService');

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('react-native/Libraries/PermissionsAndroid/PermissionsAndroid', () => ({
  PERMISSIONS: {
    READ_SMS: 'android.permission.READ_SMS',
    RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
  requestMultiple: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it('should render correctly', () => {
    SmsListener.hasPermissions.mockResolvedValue(false);

    const { getByText } = render(<App />);

    expect(getByText('📱 SMS Forwarder')).toBeTruthy();
    expect(getByText('Forward SMS to Telegram')).toBeTruthy();
    expect(getByText(/Status:/)).toBeTruthy();
  });

  it('should display stopped status initially', async () => {
    SmsListener.hasPermissions.mockResolvedValue(false);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Status: Stopped')).toBeTruthy();
    });
  });

  it('should check permissions on mount', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);

    render(<App />);

    await waitFor(() => {
      expect(SmsListener.hasPermissions).toHaveBeenCalled();
    });
  });

  it('should display granted permissions', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText(/✅ Granted/)).toBeTruthy();
    });
  });

  it('should display not granted permissions', async () => {
    SmsListener.hasPermissions.mockResolvedValue(false);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText(/❌ Not Granted/)).toBeTruthy();
    });
  });

  it('should request permissions when Request Permissions button is pressed', async () => {
    SmsListener.hasPermissions.mockResolvedValue(false);
    PermissionsAndroid.requestMultiple.mockResolvedValue({
      'android.permission.READ_SMS': PermissionsAndroid.RESULTS.GRANTED,
      'android.permission.RECEIVE_SMS': PermissionsAndroid.RESULTS.GRANTED,
    });

    const { getByText } = render(<App />);

    await waitFor(() => {
      const button = getByText('Request Permissions');
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(PermissionsAndroid.requestMultiple).toHaveBeenCalledWith([
        'android.permission.READ_SMS',
        'android.permission.RECEIVE_SMS',
      ]);
    });
  });

  it('should start SMS listener when Start button is pressed', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);
    SmsListener.startListening.mockResolvedValue('Started');

    const { getByText } = render(<App />);

    await waitFor(() => {
      const button = getByText('Start');
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(SmsListener.startListening).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Started', 'SMS Forwarder is now running');
    });
  });

  it('should stop SMS listener when Stop button is pressed', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);
    SmsListener.startListening.mockResolvedValue('Started');
    SmsListener.stopListening.mockResolvedValue('Stopped');

    const { getByText } = render(<App />);

    // Start first
    await waitFor(() => {
      const startButton = getByText('Start');
      fireEvent.press(startButton);
    });

    // Then stop
    await waitFor(() => {
      const stopButton = getByText('Stop');
      fireEvent.press(stopButton);
    });

    await waitFor(() => {
      expect(SmsListener.stopListening).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Stopped', 'SMS Forwarder has been stopped');
    });
  });

  it('should test Telegram connection when button is pressed', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);
    BotService.testConnection.mockResolvedValue(true);

    const { getByText } = render(<App />);

    await waitFor(() => {
      const button = getByText('Test Telegram');
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(BotService.testConnection).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Telegram bot connection is working!');
    });
  });

  it('should handle error when testing Telegram connection fails', async () => {
    SmsListener.hasPermissions.mockResolvedValue(true);
    BotService.testConnection.mockResolvedValue(false);

    const { getByText } = render(<App />);

    await waitFor(() => {
      const button = getByText('Test Telegram');
      fireEvent.press(button);
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to connect to Telegram bot');
    });
  });
});
