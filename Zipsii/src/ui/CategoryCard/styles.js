import { StyleSheet, Dimensions } from 'react-native';
import { colors, scale } from '../../utils';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: scale(4),
    width: width * 0.21,
  },
  iconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(40),
    backgroundColor: colors.grayLinesColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(1),
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: scale(2),
  },
  dummyImage: {
    width: scale(60),
    height: scale(60), // Adjusted to better fit within iconContainer
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -scale(30) }, { translateY: -scale(30) }], // Centers the image within iconContainer
  },
});

export default styles;
