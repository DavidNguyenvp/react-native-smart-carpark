
/*
 * Reducer actions related with login
 */
import * as types from './types';

export function setSlotparking(value: number) {
  console.log("setSlotparking: "+ value)
  return {
    type: types.PARKING_REQUEST,
    slot: value,
  };
}

export function parkingDone() {
  return {
    type: types.PARKING_FINISH,
  };
}

export function updateCarparkState(data: any) {
  return {
    type: types.CARPARK_STATE,
    carparkState: data,
  };
}

export function paymentDone(data: { date: string; timeStarted: string; timeFinished: string; duration: string; fee: string; vehicle: string; bookingId: number; billno: number; }) {
  return {
    type: types.PAYMENT_STATE,
    paymentDetails: data,
  };
}