import http from './http';

class UserService {
  login(user) {
    return http.post('auth/login', user);
  }
}

export default new UserService();
