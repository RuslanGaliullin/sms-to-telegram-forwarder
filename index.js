/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import SmsTaskHandler from './src/sms/SmsTaskHandler';

// Register the headless task for background SMS processing
AppRegistry.registerHeadlessTask('SmsTask', () => SmsTaskHandler);

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
