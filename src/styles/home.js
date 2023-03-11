import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272F46',
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5B300',
  },
  headerLot: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#F5B300',
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  scan: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#171927',
  },
  slotContainer: {
    flexDirection: 'column',
    paddingRight: 10,
    marginTop: 10,
  },
  slotContainerRight: {
    flexDirection: 'column',
    paddingLeft: 10,
    marginTop: 10,
  },
  slot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    margin: 10,

    borderWidth: 1,
    borderColor: '#fff',
  },
  slotPark: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    margin: 10,

    borderWidth: 8,
    borderColor: '#FF0000',
  },
  slotText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
