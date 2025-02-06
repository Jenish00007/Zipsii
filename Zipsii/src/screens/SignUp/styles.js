import { Dimensions, StyleSheet } from 'react-native'
import { scale, verticalScale } from '../../utils/scaling'
import { colors } from '../../utils/colors'

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },

  // Header
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  
  subHeading: {
    fontSize: 16,
    color: '#666',
    width: '85%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 4
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  
  // main
  main: {
    backgroundColor: colors.backgroudGray,
    height: '80%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: verticalScale(5),
  },
  bodyContainerBackground: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },

  mainTop: {
    height: '20%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainMid: {
    // height: '55%',
    width: '100%',
    justifyContent: 'center',
    padding: 10
  },
  mainBot: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
    
    
  },
  botBtnContainer: {
    width: '100%',
    marginTop: 70,
    justifyContent: 'center',
    padding: 10,
    
  },
  signUpButton:{
    backgroundColor: '#01AC66',
    borderRadius: 8,
    marginTop: 20,
  },
  checkboxContainer: {
    fontSize: 14,
  color: '#666666',
  marginTop: 10,
  textAlign: 'left',
  paddingHorizontal: 10, // Add horizontal padding (left and right)
  paddingVertical: 5, // Add vertical padding (top and bottom)
  },
  mixedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -20
  },
  orText: {
    fontSize: 14,
    marginBottom: -5,
    textAlign: 'center', // Centers the text
    marginTop: 10,
    padding: 20
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  socialButton: {
    marginHorizontal: 10
  },
  socialIcon: {
    width: 40,
    height: 40
  },
  ftTextUnderline: {
    textDecorationLine: 'underline',
    textDecorationLine: 'underline',
    color: '#01AC66',
  }
})
export default styles
