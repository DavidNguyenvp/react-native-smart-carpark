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
const RegisterCard = () => {
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');

  const dispatch = useDispatch();
  const onForgot = () => {
    Alert('FOR');
  };
  const onLogin = () => {
    if (name === '') {
      Alert.alert('Please enter name on card');
      return;
    }
    if (card === '') {
      Alert.alert('Please enter card number');
      return;
    }
    if (expiry === '') {
      Alert.alert('Please enter expiry date');
      return;
    }
    if (cvv === '') {
      Alert.alert('Please enter CVV number');
      return;
    }

    //Alert('LOGIN');
    NavigationService.navigate('RegisterDone');
  };

  const onLoginActions = () => {
    NavigationService.navigate('Login');
  };

  const onChange = text => {
    setName(text);
  };
  const onChangeCard = text => {
    setCard(text);
  };
  const onChangeExpiry = text => {
    setExpiry(text);
  };
  const onChangeCVV = text => {
    setCVV(text);
  };

  return (
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 32, color: '#fff', marginBottom: 20}}>
            Add new card
          </Text>

          <TextInput
            //label="Email"
            style={styles.password}
            value={name}
            placeholder="Name on card"
            name="vehicle"
            mode="outlined"
            onChange={onChange}
            placeholderTextColor={'#c4c4c4'}
            textColor={'#ffffff'}
          />
          <TextInput
            keyboardType="phone-pad"
            style={styles.password}
            value={card}
            maxLength={16}
            placeholder="Card number"
            name="vehicle"
            mode="outlined"
            onChange={onChangeCard}
            placeholderTextColor={'#c4c4c4'}
            textColor={'#ffffff'}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <TextInput
              keyboardType="phone-pad"
              style={styles.expiry}
              value={expiry}
              placeholder="Expiry"
              name="vehicle"
              mode="outlined"
              onChange={onChangeExpiry}
              placeholderTextColor={'#c4c4c4'}
              textColor={'#ffffff'}
            />
            <TextInput
              //label="Email"
              style={styles.cvv}
              value={cvv}
              placeholder="cvv"
              maxLength={4}
              name="vehicle"
              mode="outlined"
              onChange={onChangeCVV}
              placeholderTextColor={'#c4c4c4'}
              keyboardType="phone-pad"
              textColor={'#ffffff'}
            />
          </View>

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
            <Text style={{fontSize: 18, fontWeight: '400'}}>Add Card </Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterCard;
