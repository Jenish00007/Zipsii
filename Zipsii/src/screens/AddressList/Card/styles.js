import { color } from 'react-native-reanimated'
import { colors, scale, alignment } from '../../../utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.container,
    borderRadius: scale(5),
    overflow: 'hidden',
    alignItems: 'center',
    ...alignment.MBmedium,
    ...alignment.PTmedium,
    ...alignment.PBmedium,
    borderBottomWidth: 1, // Adds the gray line below
    borderBottomColor: colors.grayLinesColor,
  },
  headerRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  address: {
    ...alignment.MTmedium,
    ...alignment.MBsmall,
    ...alignment.PLxSmall,
    width: '90%',
    justifyContent: 'center'
  },
  btnContainer: {
    width: '90%',
    justifyContent: 'flex-start'
  },
  selectedBtn: {
    height: scale(50),
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(4),
    borderWidth: 1, // Border for the button
    borderColor: colors.grayLinesColor, // Button border color
    shadowColor: colors.grayLinesColor,  // Shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity
    shadowRadius: 6,  // Shadow blur radius
    elevation: 5,  // Shadow elevation (Android)
    borderBottomWidth: 1, // Adds the gray line below
    borderBottomColor: colors.grayLinesColor, // Color of the gray line
  },
  

  tickImage: {
    position: 'absolute',
    left: scale(20)
  },
  icon: {
    ...alignment.PxSmall
  },
  iconWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: scale(10), // Add spacing to the right of the icon
  },
  label: {
    flex: 1, // Ensures the label is properly aligned
  },
  
  
})
export default styles
