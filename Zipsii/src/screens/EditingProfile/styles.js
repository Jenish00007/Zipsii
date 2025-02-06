import { StyleSheet } from 'react-native';
import { colors, scale } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.fontThirdColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Set fixed width and height for the circle
    height: 100,
    borderRadius: 50, // Makes it circular
    backgroundColor: colors.grayLinesColor, // Light gray background
    shadowColor: colors.black, // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow blur
    elevation: 5, // Adds shadow for Android
  },

  profileImage: {
    fontSize: 64, // Font size for the icon
    color: colors.darkGrayText, // Gray color for the user icon
  },

  editIcon: {
    position: 'absolute',
    bottom: -5,
    right: -7,
    backgroundColor: colors.greenColor,
    borderRadius: 20,
    padding: 5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    marginBottom: 20,
    height: scale(45),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    marginBottom: 20,
    height: scale(45),
  },
  countryCode: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: colors.fontSecondColor,
    fontSize: 14,
    color: colors.fontMainColor,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.fontMainColor,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.fontMainColor,
  },
  mainButton: {
    backgroundColor: colors.greenColor, // Customize the button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: scale(45),
    width: '100%',
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white, // White text
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginTop: 5,
    position: 'absolute',
    width: '100%',
    zIndex: 10, // To ensure it appears above other content
    elevation: 5, // For Android shadow effect
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.fontMainColor,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: colors.white,
    height: scale(45),
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  completeProfileButton: {
    width: '100%',
    backgroundColor: colors.greenColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
