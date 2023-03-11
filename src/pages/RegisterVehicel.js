import React from 'react';
import {View} from 'react-native';
import {Text, Button, TextInput, Checkbox} from 'react-native-paper';
import styles from '../styles/register';
import NavigationService from './navigation/NavigationService';
import {Alert, ImageBackground} from 'react-native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as loginActions from '../store/actions/loginActions';
import {Image} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import LinearGradient from 'react-native-linear-gradient';
const RegisterVehicel = () => {
  const [vehicle, setVehicle] = useState('');

  const dispatch = useDispatch();
  const onForgot = () => {
    Alert('FOR');
  };
  const onLogin = () => {
    if (setVehicle === '') {
      Alert.alert('Please enter Vehicle Number');
      return;
    }

    //Alert('LOGIN');
    NavigationService.navigate('RegisterCard');
  };

  const onLoginActions = () => {
    NavigationService.navigate('Login');
  };

  const onChange = text => {
    setVehicle(text);
  };

  return (
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 32, color: '#fff', marginBottom: 20}}>
            Register vehicle(s)
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            Enter the vehicle number which will be used for verification
            purposes.
          </Text>
          <TextInput
            //label="Email"
            style={styles.password}
            value={vehicle}
            placeholder="Vehicle number"
            name="vehicle"
            mode="outlined"
            onChange={onChange}
            placeholderTextColor={'#c4c4c4'}
            textColor={'#ffffff'}
          />

          <Button
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 300,
              height: 50,
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}
            textColor="#000"
            onPress={onLogin}
            buttonColor="#ffffff">
            <Text style={{fontSize: 18, fontWeight: '400'}}>Next </Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterVehicel;
