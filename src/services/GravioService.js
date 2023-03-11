import http from '../services/http';

class GravioService {
  getAllData() {
    return http.get('/datas');
  }

  findSensor(sensorId) {
    return http.get('/datas/' + sensorId);
  }

  charge(chargeObject) {
    return http.post('stripe/charge', chargeObject);
  }
}

export default new GravioService();
