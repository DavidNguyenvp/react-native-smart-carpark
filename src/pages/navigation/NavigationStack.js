import * as React from 'react';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {navigationRef} from './NavigationService';

import {StatusBar} from 'react-native';
import Home from '../Home/Home';
import Login from '../Login';
import PaymentDetail from '../PaymentDetail';
import Register from '../Register';
import RegisterVehicel from '../RegisterVehicel';
import RegisterCard from '../RegisterCard';
import RegisterDone from '../RegisterDone';
import Carpark from '../Carpark';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const homeOptions = {
  title: 'Embrio Carpark',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerShown: false,
};
const AuthNavigator = () => {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetail}
        options={{
          headerShown: false,
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen name="Carpark" component={Carpark} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Vehicle" component={RegisterVehicel} />
      <Stack.Screen name="RegisterCard" component={RegisterCard} />
      <Stack.Screen
        name="RegisterDone"
        component={RegisterDone}
        ptions={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={homeOptions} />
    {/* <Stack.Screen name="Carpark" component={Carpark} options={homeOptions} /> */}
  </LoggedInStack.Navigator>
);

const App = props => {
  const {theme} = props;
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator
        headerMode="none"
        options={homeOptions}
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={LoggedInNavigator}
              options={homeOptions}
            />
            <Stack.Screen
              name="PaymentDetails"
              component={PaymentDetail}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
              }}
            />
            <Stack.Screen
              name="Carpark"
              component={PaymentDetail}
              options={{
                headerShown: false,
                animationTypeForReplace: 'push',
              }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Vehicle" component={RegisterVehicel} />
            <Stack.Screen name="RegisterCard" component={RegisterCard} />
            <Stack.Screen
              name="RegisterDone"
              component={RegisterDone}
              ptions={{
                headerShown: false,
                animationTypeForReplace: 'push',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
