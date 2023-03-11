import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, TextInput, Checkbox} from 'react-native-paper';
import NavigationService from './navigation/NavigationService';
import {Alert, ImageBackground} from 'react-native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as loginActions from '../store/actions/loginActions';
import {Image} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
const Carpark = () => {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  
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
  const lat = 1.28556;
  const long = 103.85691;
  const tokyoRegion = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.125,
    longitudeDelta: 0.0121,
  };
  const onChangePassword = e => {
    setpassword(e.target.value);
  };
  let background = require('../utils/images/logo.png');
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        // region={{
        //   latitude: lat,
        //   longitude: long,
        //   latitudeDelta: 0.125,
        //   longitudeDelta: 0.0121,
        // }}
        initialRegion={tokyoRegion}
      />
      <Marker
        key={1}
        coordinate={{latitude: 1.290621, longitude: 103.85691}}
        title={'hotel'}
        description="df"
      />
      <Marker coordinate={tokyoRegion} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '95%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Carpark;
