import { Dimensions, StyleSheet } from 'react-native'
import { alignment, colors, scale, verticalScale } from '../../utils'
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subHeading: {
    fontSize: 16,
    color: '#666'
  },
  formContainer: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  errorInput: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  },
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    textDecorationColor: 'green',
    
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  socialButton: {
    marginHorizontal: 10
  },
  socialIcon: {
    width: 40,
    height: 40
  },
  appleButton: {
    height: 40,
    width: 120
  },
  signUpLink: {
    alignItems: 'center',
    marginTop: 20
  },
  signUpAction: {
    textDecorationLine: 'underline',
    textDecorationColor: 'green',
    
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  orText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: -5,
    textAlign: 'center', // Centers the text
    marginTop: 60
  },
  
})
export default styles