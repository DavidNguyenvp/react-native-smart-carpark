import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  login: {
    padding: 8,
  },
  password: {
    width: 300,
    height: 50,
    marginTop: 20,
   
    borderRadius: 10,
    backgroundColor: '#29324A',
    border: '1px solid #000',
    color: 'white',
  },
  btnLogin: {
    width: 300,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 32,
  },

  expiry: {
    width: 150,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#29324A',
    border: '1px solid #000',
    color: 'white',
    justifyContent: 'flex-start',
    marginRight: 50,
  },
  cvv: {
    width: 100,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#29324A',
    border: '1px solid #000',
    color: 'white',
    
  },
  forgot: {
    marginTop: 0,
    marginLeft: 180,
  },
  registerButton: {
   marginTop: 10,
  },
  labelStyle: {
    fontSize: 14,
    color: 'white',
    fontWeight: '300',
  },
  labelStyleRegister: {
    fontSize: 15,
    color: 'white',
  },
});

export default styles;
