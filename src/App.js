import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import SmsListener from './sms/SmsListener';
import BotService from './telegram/BotService';

/**
 * Main App Component
 * Provides UI to start/stop SMS forwarding service
 */
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  /**
   * Check if SMS permissions are granted
   */
  const checkPermissions = async () => {
    try {
      const granted = await SmsListener.hasPermissions();
      setHasPermissions(granted);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  /**
   * Request SMS permissions from user
   */
  const requestPermissions = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Error', 'This app only works on Android');
      return false;
    }

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      const allGranted =
        granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED;

      setHasPermissions(allGranted);

      if (!allGranted) {
        Alert.alert(
          'Permissions Required',
          'SMS permissions are required for this app to work',
        );
      }

      return allGranted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  /**
   * Test Telegram bot connection
   */
  const testTelegramConnection = async () => {
    try {
      const success = await BotService.testConnection();
      if (success) {
        Alert.alert('Success', 'Telegram bot connection is working!');
      } else {
        Alert.alert('Error', 'Failed to connect to Telegram bot');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to test connection: ${error.message}`);
    }
  };

  /**
   * Start SMS listener
   */
  const handleStart = async () => {
    if (!hasPermissions) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    try {
      await SmsListener.startListening();
      setIsRunning(true);
      Alert.alert('Started', 'SMS Forwarder is now running');
    } catch (error) {
      Alert.alert('Error', `Failed to start: ${error.message}`);
    }
  };

  /**
   * Stop SMS listener
   */
  const handleStop = async () => {
    try {
      await SmsListener.stopListening();
      setIsRunning(false);
      Alert.alert('Stopped', 'SMS Forwarder has been stopped');
    } catch (error) {
      Alert.alert('Error', `Failed to stop: ${error.message}`);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📱 SMS Forwarder</Text>
          <Text style={styles.subtitle}>Forward SMS to Telegram</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, isRunning ? styles.statusActive : styles.statusInactive]} />
          <Text style={styles.statusText}>
            Status: {isRunning ? 'Running' : 'Stopped'}
          </Text>
        </View>

        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            SMS Permissions: {hasPermissions ? '✅ Granted' : '❌ Not Granted'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isRunning ? styles.buttonStop : styles.buttonStart]}
            onPress={isRunning ? handleStop : handleStart}
          >
            <Text style={styles.buttonText}>
              {isRunning ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          {!hasPermissions && (
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={requestPermissions}
            >
              <Text style={styles.buttonText}>Request Permissions</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={testTelegramConnection}
          >
            <Text style={styles.buttonText}>Test Telegram</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This app will forward all incoming SMS messages to your configured Telegram bot.
          </Text>
          <Text style={styles.infoText}>
            Make sure you have set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env file.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    elevation: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  permissionContainer: {
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  permissionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  buttonStart: {
    backgroundColor: '#4CAF50',
  },
  buttonStop: {
    backgroundColor: '#F44336',
  },
  buttonSecondary: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default App;

