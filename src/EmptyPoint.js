/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';

import {
  PaperThemeDefault,
  PaperThemeDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from './config/theme-config';
import Navigator from './pages/navigation';
import configureStore from './store';

const {persistor, store} = configureStore();

const RootNavigation = () => {
  const isDark = useSelector(state => state.themeReducer.isDark);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
    </PaperProvider>
  );
};

const EntryPoint = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
       
      </PersistGate> */}
       <RootNavigation />
    </Provider>
  );
};

export default EntryPoint;
