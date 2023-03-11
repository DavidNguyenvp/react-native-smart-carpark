/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
//import App from './src/pages/navigation/NavigationStack';
import App from './src/EmptyPoint';
//import App from './App';

AppRegistry.registerComponent(appName, () => App);
