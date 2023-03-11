import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import styles from '../styles/register';
import NavigationService from './navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
const RegisterDone = () => {
  const onLogin = () => {
    NavigationService.navigate('Home');
  };

  return (
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 32, color: '#fff', marginBottom: 20}}>
            Account created
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 150,
            }}>
            You have successfully created an account.
          </Text>

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
            <Text style={{fontSize: 18, fontWeight: '400'}}>Go to home </Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterDone;
