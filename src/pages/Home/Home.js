/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {View, ImageBackground} from 'react-native';
import {Text, Button} from 'react-native-paper';
import styles from '../../styles/home';
import {useDispatch} from 'react-redux';
import * as loginActions from '../../store/actions/loginActions';
import {TouchableCo} from '../../components/TouchableCo';
import CPModal from '../../components/Modal';
import gravioService from '../../services/GravioService';
import NavigationService from '../navigation/NavigationService';
import ConfirmDialog from '../../components/ConfirmDialog';
import * as parkingAction from '../../store/actions/parkingActions';
import getNumber from '../../utils/common';
import {Loading} from '../../components/Loading';
import useBLE from '../../hooks/useBLE';
import {NativeEventEmitter, NativeModules} from 'react-native';
import ConfirmList from './ConfirmList';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = () => {
  let background = require('../../utils/images/gradient_green.png');
  let background1 = require('../../utils/images/gradient_yellow.png');
  //const occupiedSlot = useSelector(state => state.parkingReducer.slot);
  const confirmTitle = 'Confirm slot';
  const confirmMessage = 'Please confirm that you parked in slot ';
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const [disableTouch, setdisableTouch] = useState(false);
  const [slotChanged, setslotChanged] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [loadText, setLoadText] = useState('Scanning');
  const [isConfirm, setIsConfirm] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const intervalRef = useRef();
  const [paymentInfo, setPaymentInfo] = useState({
    userId: 'c532101c-b417-4aad-9dba-ff45c70e4dc3',
    amount: 0,
    des: 'Payment for parking cart at A carpark',
  });
  const [leftTime, setleftTime] = useState('0');
  const [data, setdata] = useState([
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
  ]);
  const [paymentDetails, setPaymentDetails] = useState({
    date: '8 Jan 2023',
    timeStarted: '',
    timeFinished: '',
    duration: '',
    fee: 0,
    vehicle: '',
    bookingId: '',
    billno: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [doneParking, setdoneParking] = useState(false);

  const parkedSlot = useSelector(state => state.parkingReducer.slot);

  //!-- Permission
  const {
    requestPermissions,
    scanForPeripherals,
    sensorList,
    isScanning,
    scanStoped,
    handleSend,
    connectToDevice,
  } = useBLE();

  useEffect(() => {
    if (parkedSlot !== -1) {
      console.log('slot parking1', parkedSlot);
      setTimeout(() => {
        handleConfirm(parkedSlot);
      }, 10);

      return;
    } else {
      requestPermissions(isGranted => {
        if (isGranted) {
          console.log('slot parking2', parkedSlot);
          setIsloading(true);
          scanForPeripherals();
        }
      });
    }
  }, []);

  const onPress = index => {
    //NavigationService.navigate('PaymentDetail');
  };

  const checkChangeState = newData => {
    newData.some((item, index) => {
      return item.data != data[index].data;
    });
  };

  const findSlotChanged = newData => {
    //Alert.alert(occupiedSlot + ' has changed')
    //console.log('occupiedSlot', slotChanged);

    // user Parked
    //console.log(newData[0].data, slotChanged);
    if (slotChanged !== 0) {
      newData.map((item, index) => {
        // check if parking done
        if (item.data !== data[index].data && item.data === 1) {
          dispatch(parkingAction.parkingDone());
          //NavigationService.navigate('PaymentDetail');
        }
      });
    } else if (parkedSlot === -1) {
      newData.map((item, index) => {
        if (item.data === 0 && item.isConfirmed === false) {
          setslotChanged(() => index + 1);
          setShowConfirm(() => true);
          setLoadText('Scanning')
          requestPermissions(isGranted => {
            if (isGranted) {
              setIsloading(true);
              scanForPeripherals();
            }
          });
        }
      });
    }
  };

  const handleConfirm = slot => {
    if (slot < 1) return;
    setShowConfirm(false);
    setslotChanged(slot);
    dispatch(parkingAction.setSlotparking(slot));
    setIsConfirm(true);
    gravioService
      .findSensor(data[slot - 1].sensorId)
      .then(res => {
        const datas = res.data;
        mapDatas(datas);
      })
      .catch(error => console.log(error));
  };
  const handleHideConfirm = () => {
    setShowConfirm(false);
  };
  const mapDatas = newDatas => {
    const datas = [...data];
    datas.map((item, index) => {
      const newData = newDatas[index];
      item.data = newData.data;
      item.sensorId = newData.sensorId;
      item.leftTime = newData.leftTime;
      item.startTime = newData.startTime;
      item.isConfirmed = newData.isConfirmed;
      if (newData.data === 0) {
        item.image = background1;
      } else {
        item.image = background;
      }
      return item;
    });
    setdata(datas);
    // dispatch(parkingAction.updateCarparkState(datas));
  };

  // const startInterval = () => {
  //   intervalRef.current = setInterval(() => {
  //     getData();
  //   }, 990);
  // };
  const getData = () => {
    gravioService
      .getAllData()
      .then(res => {
        const datas = res.data;
        //findSlotChanged(datas);
        mapDatas(datas);
        // setIsActive(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    //console.log('finding slots');
    findSlotChanged(data);
    if (isConfirm) {
      mapDatasChecking(data);
    }
  }, [data]);

  useEffect(() => {
    getData();
    // startInterval();
    // const intervalId = intervalRef.current;
    // return () => clearInterval(intervalId);
    const timer = setInterval(() => {
      getData();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (doneParking) {
  //     clearInterval(intervalRef.current);
  //   }
  // }, [doneParking]);
  const logout = () => {
    //Alert.alert('logout');
    dispatch(loginActions.logOut());
    NavigationService.navigate('Login');
  };

  const scanToConfirm = () => {
    scanForPeripherals();
    //setIsShowConfirm(true);
  };

  //! time checking
  const updateLefttime = leftime => {
    if (!leftime || leftime === '') {
      return;
    }

    // + 8  hour
    const plusHour = 8 * 60 * 60 * 1000;

    let startTimes = leftime.split('.');
    let start = new Date(startTimes[0]).getTime() + plusHour;
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

  const getHoursMinutes = startTime => {
    if (!startTime || startTime === '') {
      return '0:00';
    }
    let time = startTime.split('.')[0];
    let start = new Date(time);
    const hours = start.getHours();
    const minutes = start.getMinutes();
    return hours + ':' + minutes;
  };

  const getEndTime = () => {
    let end = new Date();
    const hours = end.getHours();
    const minutes = end.getMinutes();
    return hours + ':' + minutes;
  };

  const getDate = startTime => {
    if (!startTime || startTime === '') {
      return '9-1-2023';
    }
    let time = startTime.split('.')[0];
    let start = new Date(time);
    const year = start.getFullYear();
    const month = start.getMonth() + 1;
    const date = start.getDate();
    return date + '/' + month + '/' + year;
  };

  const updatePayments = minuteTimes => {
    const total = (3 / 60) * minuteTimes;
    let num = Number(total); // The Number() only visualizes the type and is not needed
    let roundedString = num.toFixed(2);
    let rounded = Number(roundedString); // toFixed() returns a string (often suita

    setPaymentInfo({...paymentInfo, amount: rounded});
  };

  const updatePaymentDetails = endData => {
    //console.log("updatePaymentDetails", endData)
    let details = {
      date: getDate(endData.startTime),
      timeStarted: getHoursMinutes(endData.startTime),
      timeFinished: getEndTime(),
      duration: leftTime,
      fee: paymentInfo.amount + ' SGD',
      vehicle: 'SMU1912E',
      bookingId: getNumber(),
      billno: getNumber(),
    };
    setPaymentDetails(() => details);
    dispatch(parkingAction.paymentDone(details));
  };

  const mapDatasChecking = newDatas => {
    if (doneParking || slotChanged < 1) {
      return;
    }
    //Alert.alert(slotChanged + ' is');
    newDatas.forEach((newData, index) => {
      if (newData.data === 0 && index === slotChanged - 1) {
        setleftTime(updateLefttime(newData.startTime));
      }
    });
    // The state of the occupied slot has changed, so the payment process should be called.
    const occuipedSlot = newDatas[slotChanged - 1];
    if (occuipedSlot.data === 1 && occuipedSlot.isConfirmed === true) {
      setdoneParking(() => true);

      dispatch(parkingAction.parkingDone());
      charge(getAmount(newDatas[slotChanged - 1].startTime));
      updatePaymentDetails(newDatas[slotChanged - 1]);
    }
  };

  const charge = amount => {
    const chargeObject = {
      userId: paymentInfo.userId,
      amount: amount * 100,
      des: paymentInfo.des,
    };
    setIsloading(true);
    setLoadText('Payment');
    gravioService.charge(chargeObject).then(res => {
      // Alert.alert('You has payment: ' + amount + 'SGD');
      setdoneParking(() => false);
      setslotChanged(() => 0);
      dispatch(parkingAction.setSlotparking(-1));
      NavigationService.navigate('PaymentDetails');
      setleftTime(0);
      setIsConfirm(false);
      setPaymentInfo(prev => ({...prev, amount: 0}));
      setIsloading(false);
    });
  };

  const getAmount = startTime => {
    if (!startTime || startTime === '') {
      return;
    }

    let startTimes = startTime.split('.');
    let start = new Date(startTimes[0]).getTime();
    let end = new Date().getTime();
    if (end < start) {
      return 0;
    }
    let second = (end - start) / 1000;
    let minutes = Math.floor(second / 60);
    const total = (3 / 60) * minutes;
    let num = Number(total); // The Number() only visualizes the type and is not needed
    let roundedString = num.toFixed(2);
    return Number(roundedString); // toFixed() returns a string (often suita
  };

  //! Confirm Handle

  // show confirm
  useEffect(() => {
    // don't show if had confirmed
    if (isConfirm || parkedSlot !== -1) {
      return;
    }
    if (sensorList.length > 0 && !isScanning) {
      console.log(sensorList);
      setIsShowConfirm(true);
      setIsloading(false);
    }

    if (scanStoped) {
      setIsloading(false);
    } else {
      setIsloading(true);
    }
  }, [sensorList, isScanning, scanStoped]);
  const onCloseConfirm = () => {
    setIsShowConfirm(false);
  };

  const handleConfirmed = slot => {
    onCloseConfirm();
    setIsloading(true);
    setLoadText('Confirming...');
    connectToDevice(slot, isConnected => {
      if (isConnected) {
        handleSend('CP12345', isSent => {
          setIsloading(false);
          switch(slot.name) {
            case 'ET100-0001':
              return handleConfirmData(data[0])
            case 'ET100-0002':
                return handleConfirmData(data[1])
            case 'ET100-0003':
                return handleConfirmData(data[2])
            default :
                return  handleConfirm(slotChanged);
          }
         
        });
      } else {
        setIsloading(false);
      }
    });
  };

  const handleConfirmData = slot => {
        if (checkWrongConfirm(slot)) {
          alert("Please confirm correct slot.");
        } else {
          handleConfirm(slot);
        }
  }

  const checkWrongConfirm = data => {
      if (data.data === 1 || data.isConfirmed == true) {
        return true
      }
      return false;
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isloading} text={loadText} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Raffles Hotel Carpark</Text>
        {/* <Text style={styles.headerLot}>CARPARK LOT AVAILABILITY</Text> */}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              marginBottom: 0,
              marginTop: 2,
              fontWeight: 'bold',
            }}>
            Time: {leftTime}
          </Text>
          {/* <Text style={{fontSize: 15, color: '#fff', justifyContent: 'center'}}>

          </Text> */}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text
              style={{
                fontSize: 15,
                color: '#fff',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginLeft: 20,
                marginTop: 1,
              }}>
              Total: {paymentInfo.amount} SGD
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                justifyContent: 'flex-end',
                fontWeight: 'normal',
                marginTop: 0,
              }}
            />
          </View>
        </View>
        <Button
          mode="text"
          style={styles.logout}
          labelStyle={styles.labelStyle}
          onPress={logout}>
          Logout
        </Button>
        <Button
          mode="text"
          style={styles.scan}
          labelStyle={styles.labelStyle}
          onPress={scanToConfirm}>
          scan to confirm
        </Button>
      </View>
      <View style={styles.wrapContainer}>
        <View style={styles.slotContainer}>
          <TouchableCo
            style={parkedSlot === 1 ? styles.slotPark : styles.slot}
            disabled={disableTouch}
            onPress={() => onPress(0)}>
            <ImageBackground
              style={styles.slot}
              key={`${background}`}
              source={data[0].image}>
              <Text style={styles.slotText}>1</Text>
            </ImageBackground>
          </TouchableCo>
          <TouchableCo
            style={parkedSlot === 3 ? styles.slotPark : styles.slot}
            disabled={disableTouch}
            onPress={() => onPress(2)}>
            <ImageBackground
              style={styles.slot}
              key={`${background}`}
              source={data[2].image}>
              <Text style={styles.slotText}>3</Text>
            </ImageBackground>
          </TouchableCo>
          <TouchableCo
            style={parkedSlot === 5 ? styles.slotPark : styles.slot}
            disabled={disableTouch}
            onPress={() => onPress(4)}>
            <ImageBackground
              style={styles.slot}
              key={`${background}`}
              source={data[4].image}>
              <Text style={styles.slotText}>5</Text>
            </ImageBackground>
          </TouchableCo>
        </View>
        <View style={styles.slotContainerRight}>
          <TouchableCo
            style={parkedSlot === 2 ? styles.slotPark : styles.slot}
            disabled={disableTouch}
            onPress={() => onPress(1)}>
            <ImageBackground
              style={styles.slot}
              key={`${background1}`}
              source={data[1].image}>
              <Text style={styles.slotText}>2</Text>
            </ImageBackground>
          </TouchableCo>

          <TouchableCo
            style={parkedSlot === 4 ? styles.slotPark : styles.slot}
            disabled={disableTouch}
            onPress={() => onPress(3)}>
            <ImageBackground
              style={styles.slot}
              key={`${background1}`}
              source={data[3].image}>
              <Text style={styles.slotText}>4</Text>
            </ImageBackground>
          </TouchableCo>
        </View>
      </View>
      {disableTouch && <CPModal />}
      {/* <ConfirmDialog
        handleConfirm={handleConfirm}
        hideDialog={handleHideConfirm}
        slot={slotChanged}
        isvisible={showConfirm}
        message={confirmMessage + slotChanged}
        title={confirmTitle}
      /> */}
      <ConfirmList
        losts={sensorList}
        onClose={onCloseConfirm}
        OnClick={handleConfirmed}
        isShowModal={isShowConfirm}
      />
    </View>
  );
};

export default Home;
