import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import styles from '../styles/payment';
import NavigationService from './navigation/NavigationService';
import {Alert} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import GravioService from '../services/GravioService';
import * as parkingAction from '../store/actions/parkingActions';

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    userId: 'c532101c-b417-4aad-9dba-ff45c70e4dc3',
    amount: 0,
    des: 'Payment for parking cart at A carpark',
  });
  const [leftTime, setleftTime] = useState('0');
  const [doneParking, setdoneParking] = useState(false);
  const slot = useSelector(state => state.parkingReducer.slot);
  const dispatch = useDispatch();
  const intervalRef = useRef();
  const onForgot = () => {
    Alert('FOR');
  };

  const onLogin = () => {
    //Alert('LOGIN');
    console.log('Login');
    NavigationService.navigate('Home');
  };

  const charge = amount => {
    const chargeObject = {
      userId: paymentInfo.userId,
      amount: amount * 100,
      des: paymentInfo.des,
    };
    console.log('Charge: ' + paymentInfo.amount);
    GravioService.charge(chargeObject).then(res => {
      Alert.alert('You has payment: ' + amount + 'SGD');
      NavigationService.navigate('Home');
    });
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      getData();
    }, 990);
  };
  const getData = () => {
    console.log('doneParking', doneParking);
    if (doneParking) {
      return;
    }
    GravioService.getAllData()
      .then(res => {
        const datas = res.data;
        mapDatas(datas);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
    startInterval();
    const intervalId = intervalRef.current;
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (doneParking) {
      clearInterval(intervalRef.current);
    }
  }, [doneParking]);

  const getTimeCccupied = startTime => {
    let startTimes = startTime.split('.');
    let start = new Date(startTimes[0]).getTime();
    let end = new Date().getTime();
    let minutes = (end - start) / 1000 / 60;
    return Math.round(minutes);
  };

  const updateLefttime = leftime => {
    if (!leftime || leftime === '') {
      return;
    }

    let startTimes = leftime.split('.');
    let start = new Date(startTimes[0]).getTime();
    let end = new Date().getTime();
    if (end < start) {
      return '0m0s';
    }
    let second = (end - start) / 1000;
    let minutes = Math.floor(second / 60);
    let hours = Math.floor(minutes / 60);
    updatePayments(minutes);
    minutes = Math.round(minutes - 60 * hours);
    second = Math.round(second - 60 * minutes - 60 * hours * 60);

    if (hours > 0) {
      return hours + 'h ' + minutes + 'm' + second + 's';
    }

    return minutes + 'm' + second + 's';
  };

  const updatePayments = minuteTimes => {
    const total = (3 / 60) * minuteTimes;
    let num = Number(total); // The Number() only visualizes the type and is not needed
    let roundedString = num.toFixed(2);
    let rounded = Number(roundedString); // toFixed() returns a string (often suita

    setPaymentInfo({...paymentInfo, amount: rounded});
  };

  const mapDatas = newDatas => {
    newDatas.forEach((newData, index) => {
      if (newData.data === 0 && index === slot - 1) {
        setleftTime(updateLefttime(newData.startTime));
      }
    });
    // The state of the occupied slot has changed, so the payment process should be called.
    if (newDatas[slot - 1].data === 1) {
      setdoneParking(true);
      dispatch(parkingAction.parkingDone());
      charge(getAmount(newDatas[slot - 1].startTime));
    }
  };

  const getAmount = startTime => {
    if (!startTime || startTime === '') {
      return;
    }

    let startTimes = startTime.split('.');
    let start = new Date(startTimes[0]).getTime();
    let end = new Date().getTime();
    if (end < start) {
      return '0m0s';
    }
    let second = (end - start) / 1000;
    let minutes = Math.floor(second / 60);
    const total = (3 / 60) * minutes;
    let num = Number(total); // The Number() only visualizes the type and is not needed
    let roundedString = num.toFixed(2);
    return Number(roundedString); // toFixed() returns a string (often suita
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Raffles Hotel Carpark</Text>
        <Text style={styles.headerLot}>Parking time</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text
          style={{
            fontSize: 35,
            color: '#000',
            marginBottom: 60,
            marginTop: 20,
            fontWeight: 'bold',
          }}>
          Left Time
        </Text>
        <Text style={{fontSize: 25, color: '#000', justifyContent: 'center'}}>
          {leftTime}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text
            style={{
              fontSize: 25,
              color: '#000',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Total: {paymentInfo.amount}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000',
              justifyContent: 'flex-end',
              fontWeight: 'normal',
              marginTop: 20,
            }}>
            SGD
          </Text>
        </View>

        <ConfirmDialog />

        <Button
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 300, marginBottom: 50}}
          textColor="#000"
          onPress={onLogin}
          buttonColor="#ffffff">
          Back to Home
        </Button>
      </View>
    </View>
  );
};

export default Payment;
