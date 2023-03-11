import React from 'react';
import {View} from 'react-native';
import {Text, Button, TextInput, Checkbox} from 'react-native-paper';
import styles from '../styles/login';
import NavigationService from './navigation/NavigationService';
import {Alert, ImageBackground} from 'react-native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as loginActions from '../store/actions/loginActions';
import {Image} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import LinearGradient from 'react-native-linear-gradient';
const Login = () => {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const onForgot = () => {
    Alert('FOR');
  };
  const onRegister = () => {
    NavigationService.navigate('Register');
  };

  const onLogin = () => {
    if (userName === '') {
      Alert.alert('Please enter a username');
      return;
    }
    if (password === '') {
      Alert.alert('Please enter password');
      return;
    }
    //Alert('LOGIN');
    dispatch(loginActions.requestLogin(userName, password));
    NavigationService.navigate('Home');
  };

  const onChange = text => {
    setuserName(text);
  };

  const onChangePassword = e => {
    setpassword(e.target.value);
  };

  return (
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 35, color: '#fff', marginBottom: 20}}>
            Login
          </Text>

          <TextInput
            //label="Email"
            style={styles.password}
            value={userName}
            placeholder="Email or phone number"
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
            secureTextEntry={true}
            value={password}
            placeholder="Passwords"
            textColor={'#ffffff'}
            name="passwords"
            multiline={false}
            placeholderTextColor={'#c4c4c4'}
            mode="outlined"
            onChange={onChangePassword}
          />
          <Button
            mode="text"
            style={styles.forgot}
            labelStyle={styles.labelStyle}
            onPress={() => onForgot}>
            Forgot Password?
          </Button>
          {/* <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
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
            <Text style={{fontSize: 18, fontWeight: '400'}}>Login </Text>
          </Button>

          <Button
            mode="text"
            style={styles.registerButton}
            labelStyle={styles.labelStyleRegister}
            onPress={onRegister}>
            Don’t have an account? Register
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;
