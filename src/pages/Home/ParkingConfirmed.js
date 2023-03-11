/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/react-in-jsx-scope
import Overlay from 'react-native-modal-overlay';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ParkingConfirmed = ({losts, OnClick, isShowModal, onClose}) => {
  const confirmTitle = 'Confirm slot';
  const confirmMessage = 'Please confirm that you parked in slot ';
  
  return (
    <Overlay visible={isShowModal} onClose={onClose} closeOnTouchOutside>
      <LinearGradient colors={['#29324A', '#171927']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontSize: 35, color: '#fff', marginBottom: 20}}>
            Login
          </Text>

          <TextInput
            //label="Email"
            style={styles.password}
            value={userName}
            placeholder="Email or phone number"
            name="userName"
            mode="outlined"
            onChange={onChange}
            placeholderTextColor={'#c4c4c4'}
            textColor={'#ffffff'}
          />

          <TextInput
            //label="password"
            //keyboardType="default"
            style={styles.password}
            secureTextEntry={true}
            value={password}
            placeholder="Passwords"
            textColor={'#ffffff'}
            name="passwords"
            multiline={false}
            placeholderTextColor={'#c4c4c4'}
            mode="outlined"
            onChange={onChangePassword}
          />
          <Button
            mode="text"
            style={styles.forgot}
            labelStyle={styles.labelStyle}
            onPress={() => onForgot}>
            Forgot Password?
          </Button>
          {/* <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
          <Button
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 300,
              height: 50,
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}
            textColor="#000"
            onPress={onLogin}
            buttonColor="#ffffff">
            <Text style={{fontSize: 18, fontWeight: '400'}}>Login </Text>
          </Button>

          <Button
            mode="text"
            style={styles.registerButton}
            labelStyle={styles.labelStyleRegister}
            onPress={onRegister}>
            Don’t have an account? Register
          </Button>
        </View>
      </View>
    </LinearGradient>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default ParkingConfirmed;
