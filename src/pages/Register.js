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
const Register = () => {
  const [userName, setuserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setpassword] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const onForgot = () => {
    Alert('FOR');
  };
  const onLogin = () => {
    if (userName === '') {
      Alert.alert('Please enter full name');
      return;
    }
    if (password === '') {
      Alert.alert('Please enter password');
      return;
    }
    NavigationService.navigate('Vehicle');
  };

  const onLoginActions = () => {
    NavigationService.navigate('Login');
  };

  const onChange = text => {
    setuserName(text);
  };

  const onChangeMobile = text => {
    setMobile(text);
  };

  const onChangePassword = e => {
    setpassword(e.target.value);
  };
  let background = require('../utils/images/logo.png');
  return (
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 32, color: '#fff', marginBottom: 20}}>
            Register
          </Text>

          <TextInput
            //label="Email"
            style={styles.password}
            value={userName}
            placeholder="Full Name"
            name="userName"
            mode="outlined"
            onChange={onChange}
            placeholderTextColor={'#c4c4c4'}
            textColor={'#ffffff'}
          />

          <TextInput
            //label="password"
            //keyboardType="default"
            style={styles.password}
            value={mobile}
            placeholder="Phone Number"
            textColor={'#ffffff'}
            name="mobile"
            multiline={false}
            placeholderTextColor={'#c4c4c4'}
            mode="outlined"
            keyboardType="phone-pad"
            onChange={onChangeMobile}
          />
          <TextInput
            //label="password"
            //keyboardType="default"
            style={styles.password}
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            textColor={'#ffffff'}
            name="passwords"
            multiline={false}
            placeholderTextColor={'#c4c4c4'}
            mode="outlined"
            onChange={onChangePassword}
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

          <Button
            mode="text"
            style={styles.registerButton}
            labelStyle={styles.labelStyleRegister}
            onPress={onLoginActions}>
            Already have an account? Login
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Register;
