import {StyleSheet} from 'react-native';

const reportsStyles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  categoryContainer: {
    height: 35,
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontFamily: 'FiraCode-Medium',
    fontSize: 15,
    includeFontPadding: false,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  toastContainer: {
    height: 500,
    width: '80%',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 10,
    borderTopWidth: 0.8,
  },
  buttonText: {},
  yearContainer: {
    padding: 3,
    borderRadius: 5,
    margin: 10,
  },
  selectedYearContainer: {
    paddingBottom: 10,
    borderBottomWidth: 0.8,
  },
  chartContainer: {
    marginTop: '12%',
    marginBottom: '12%',
  },
  dotContainer: {
    height: 8,
    width: 8,
    borderRadius: 40,
    marginRight: 3,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  calendarDay: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default reportsStyles;
