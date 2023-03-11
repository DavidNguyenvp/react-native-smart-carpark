import React from 'react';
import {useSelector} from 'react-redux';
import {View, ImageBackground} from 'react-native';
import {Text, Button} from 'react-native-paper';
import styles from '../styles/payment';
import NavigationService from './navigation/NavigationService';
import LinearGradient from 'react-native-linear-gradient';

const PaymentDetail = () => {
  const paymentDetails = useSelector(
    state => state.parkingReducer.paymentDetails,
  );

  let visa = require('../utils/images/icon_visa.png');

  const onBack = () => {
    NavigationService.navigate('Home');
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Payment details</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.hotel}>Raffles Hotel Carpark</Text>
          <View style={styles.detailContainer}>
            <View style={styles.detailContainerContent}>
              <Text style={styles.detailText}>Date</Text>
              <Text style={styles.detailText}>Time Started</Text>
              <Text style={styles.detailText}>Time end</Text>
              <Text style={styles.detailText}>Duration</Text>
              <Text style={styles.detailFee}>Fee</Text>
              <Text style={styles.detailVehicle}>Vehicle</Text>
              <Text style={styles.detailText}>Booking ID</Text>
              <Text style={styles.detailText}>Bill no</Text>
            </View>
            <View style={styles.detailContainerValue}>
              <Text style={styles.detailTextValue}>{paymentDetails.date}</Text>
              <Text style={styles.detailTextValue}>
                {paymentDetails.timeStarted}
              </Text>
              <Text style={styles.detailTextValue}>
                {' '}
                {paymentDetails.timeFinished}
              </Text>
              <Text style={styles.detailTextValue}>
                {paymentDetails.duration}
              </Text>
              <View style={styles.detailTextValueFee}>
                <ImageBackground
                  style={styles.imgVisa}
                  key={`${visa}`}
                  source={visa}
                />
                <Text style={styles.detailValueFee}>{paymentDetails.fee}</Text>
              </View>
              <Text style={styles.valueVehicle}>{paymentDetails.vehicle}</Text>
              <Text style={styles.detailTextValue}>
                {paymentDetails.bookingId}
              </Text>
              <Text style={styles.detailTextValue}>
                {paymentDetails.billno}
              </Text>
            </View>
          </View>
        </View>

        <Button
          mode="text"
          style={styles.backButton}
          onPress={onBack}
          labelStyle={styles.btnLabelStyle}>
          Finish
        </Button>
      </View>
    </LinearGradient>
  );
};

export default PaymentDetail;
