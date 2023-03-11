import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = ({isLoading, text}) => {
  return (
    <Spinner
      visible={isLoading}
      textContent={text}
      textStyle={styles.spinnerTextStyle}
    />
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export {Loading};
