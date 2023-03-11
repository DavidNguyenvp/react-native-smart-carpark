import http from '../services/http';

class CarparkService {
  getAllData() {
    return http.get('/carpark');
  }

  createCarpark(data) {
    return http.post('carpark', data);
  }

  updateCarpark(id, data) {
    return http.put('carpark/' + id, data);
  }

  delete(id) {
    return http.delete('carpark/' + id);
  }
}

export default new CarparkService();
