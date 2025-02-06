import { fontStyles } from '../../utils/fontStyles';
import { scale } from '../../utils/scaling';
import { colors } from '../../utils/colors';
import { Dimensions } from 'react-native';
import { alignment } from '../../utils';
import { StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  container: {
    width: width,
    height: height * 0.10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Position it absolutely
    top: 0, // Stick it to the top
    zIndex: 2,
    
  },
  subContainer: {
    width: '100%',
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...alignment.MLxSmall,
    paddingHorizontal: 10,
  },
  leftContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Ensures it doesn't affect the layout
    ...alignment.PLmedium,
    top: 18
  },
  headerText: {
    fontFamily: fontStyles.PoppinsBold,
    fontSize: scale(16),
    textAlign: 'center', // Center the text
    // position: 'absolute', // Makes the title independent of other elements
    left: '35%', // Centers the title horizontally
    // transform: [{ translateX: -width * 0.15 }], // Adjust centering offset (based on width of left and right containers)
    color: colors.white, // Optional: Customize text color
    top: 18,
    flex: 1,
    
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconButton: {
    marginHorizontal: 10,
    top: 18
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(47, 47, 47, 0.5)', // Black with 50% transparency
    
},

};
