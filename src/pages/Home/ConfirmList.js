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

const ConfirmList = ({losts, OnClick, isShowModal, onClose}) => {
  const confirmTitle = 'Confirm slot';
  const confirmMessage = 'Please confirm that you parked in slot ';
  const renderItem = (item, index) => {
    const color = index / 2 === 0 ? '#c7c7c7' : '#fff';
    return (
      <TouchableHighlight onPress={() => OnClick(item)}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#333333',
              padding: 10,
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <Overlay visible={isShowModal} onClose={onClose} closeOnTouchOutside>
      <Text style={{fontSize: 18, color: '#000', marginBottom: 12}}>
        {confirmMessage}
      </Text>
      <FlatList
        style={{width: '100%', height: 50}}
        data={losts}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={item => item.id}
      />
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

export default ConfirmList;
