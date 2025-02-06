import { StyleSheet } from 'react-native'
import { fontStyles, colors, scale, alignment } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.white
  },
  subContainer: {
    flexGrow: 1,
    ...alignment.Psmall
  },
  spacer: {
    marginTop: scale(10),
  },
  textStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(13)
  },
  totalStyle: {
    color: colors.blueColor
  },
  priceBox: {
    width: '100%',
    ...alignment.Psmall
  },
  summaryContainer: {
    width: '100%',
    backgroundColor: colors.whiteColor, // Or your preferred background color
    alignSelf: 'center',
    padding: scale(10),
    justifyContent: 'flex-end',
    borderRadius: scale(10),
    borderWidth: 1, // Adjust this value to increase the border thickness
    borderColor: colors.grayLinesColor, // Choose the border color (e.g., Dark Gray)
    // Shadow for both Android and iOS
    shadowColor: colors.grayLinesColor,  // Dark gray shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity (higher value = more visible shadow)
    shadowRadius: 6,  // Radius of the shadow blur
    elevation: 5,  // Shadow for Android (higher value = more prominent shadow)
  },
  
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lineStyle: {
    width: '99%',
    height: 1,
    backgroundColor: 'transparent',  // Ensure the background is transparent
    borderBottomWidth: 2,           // Set border width
    borderBottomColor: '#D3D3D3',  // Set the color
    borderStyle: 'dashed',          // Make the border dashed
    alignSelf: 'center',
  },  
  // empty
  subContainerImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MBlarge
  },
  image: {
    width: scale(100),
    height: scale(100)
  },
  descriptionEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.Plarge
  },
  emptyButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
export default styles
