import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171927',
  },
  hotel: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    flex: 0,
  },
  cardContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  detailContainerContent: {
    flexDirection: 'column',
  },
  detailContainerValue: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  detailText: {
    color: '#a1a1a1',
    fontSize: 14,
    paddingBottom: 15,
  },
  detailFee: {
    color: '#a1a1a1',
    fontSize: 14,
    paddingBottom: 30,
    paddingTop: 15,
    fontWeight: 'bold',
  },
  detailVehicle: {
    color: '#a1a1a1',
    fontSize: 14,
    paddingBottom: 25,
  },
  detailTextValue: {
    color: '#000',
    fontSize: 14,
    paddingBottom: 15,
  },
  detailTextValueFee: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  detailValueFee: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  valueVehicle: {
    color: '#000',
    fontSize: 14,
    paddingBottom: 20,
    paddingTop: 10,
  },

  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '100%',
    position: 'absolute',
    top: 100,
    left: 0,
  },

  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerLot: {
    fontSize: 32,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#d800ff',
  },

  imgVisa: {width: 50, height: 50},
  backButton: {
    width: 100,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: 80,
    left: 50,
    right: 0,
    justifyContent: 'center',
  },

  btnLabelStyle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
