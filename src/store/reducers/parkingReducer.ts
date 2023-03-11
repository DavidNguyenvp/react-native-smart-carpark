/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../../lib/createReducer';
import * as types from '../actions/types';

let background = require('../../utils/images/gradient_green.png');

const initialState = {
  slot: -1,
  isParking: false,
  carparkState: [
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
    {data: 1, image: background, leftTime: '', sensorId: ''},
  ],
  paymentDetails: {
    date: '2017',
    timeStarted: '2017',
    timeFinished: '2017',
    duration: '0',
    fee: 0,
    vehicle: '',
    bookingId: '',
    billno: '',
  },
};

export const parkingReducer = createReducer(initialState, {
  [types.PARKING_REQUEST](state, action) {
    return {...state, slot: action.slot, isParking: true};
  },
  [types.PARKING_FINISH](state, action) {
    return {...state, slot: -1, isParking: false};
  },
  [types.CARPARK_STATE](state, action) {
    return {...state, carparkState: action.carparkState};
  },
  [types.PAYMENT_STATE](state, action) {
    return {...state, paymentDetails: action.paymentDetails};
  },
});
