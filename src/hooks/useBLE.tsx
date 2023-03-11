
import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import BleManager from 'react-native-ble-manager';
import DeviceInfo from 'react-native-device-info';
import { SetStateAction, useEffect, useState } from 'react';

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  connectToDevice: () => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: any;
  allDevices: any;
  heartRate: number;
} 

const UUID = '0000FFF0-0000-1000-8000-00805f9b34fb';
const SERVICE = '0000FFF2-0000-1000-8000-00805f9b34fb';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function useBLE() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStoped, setScanStoped] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const peripherals = new Map();
  const [sensorList, setSensorList] = useState<any>([]);

  useEffect(() => {
    BleManager.start({showAlert: true});
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDiscoverPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    return (() => {
      console.log('unmount');
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
    })
  }, [])

  const scanForPeripherals = () => {
    console.log('Scanning...', isScanning);
    setSensorList([])
    if (!isScanning) {
      BleManager.scan([], 10, false).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
        setScanStoped(false)
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  const handleDiscoverPeripheral = (peripheral: any) => {
    
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    } else if (peripheral.name.includes('ET100')) {
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      const list = Array.from(peripherals.values())
      setSensorList(list);
    }
    
  }


  const handleUpdateValueForCharacteristic = (data: any) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
    setScanStoped(true);
  }
  
  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const handleSend = async (sendData: string, cb: VoidCallback) => {
    const data = stringToASCII(sendData)
  
    BleManager.getConnectedPeripherals([]).then(async results => {
      setIsShowDialog(false);
      if (results.length == 0) {
        alert('No connected peripherals');
        return;
      }
      try {
        const service = await BleManager.retrieveServices(results[0].id);
        console.log("sendData", data)
    
        setTimeout(() => {
          console.log("sendData", service.id)
          BleManager.write(
            service.id,
            UUID,
            SERVICE,
            data
          )
            .then(() => {
             cb(true)
              console.log("Success in sending data to: ")
            })
            .catch(error => {
             
              console.log("got error: ");
              alert(JSON.stringify(error));
              cb(false)
            });
        }, 900);
      } catch (error) {
        console.log("got error: " + JSON.stringify(error));
      
      }
    });
  };

  const connectToDevice = async (peripheral: any, cb: VoidCallback) => {
    console.log('testPeripheral',peripheral);
    BleManager.stopScan()
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setSensorList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);
          // alert('Connected to ' + peripheral.name)

        cb(true)
        }).catch((error) => {
          cb(false)
          console.log('Connection error', error);
        });
      }
    }

  }

  const  stringToASCII =  (str) => {
    let hex: number[] = [];
    for (let i = 0; i < str.length; i++) {
      hex.push(str.charCodeAt(i))
    }
    console.log(hex)
    return hex;
  }

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    handleSend,
    sensorList,
    isShowDialog,
    isScanning,
    scanStoped
  }

}

export default useBLE;

