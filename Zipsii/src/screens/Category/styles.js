import { Dimensions, StyleSheet } from 'react-native';
import { alignment, colors, scale } from '../../utils';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground,
  },
  grayBackground: {
    backgroundColor: colors.white,
  },
  headerText: {
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightHorizontalLine,
  },
  categoryContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.03,
    ...alignment.MTlarge,
  },
  spacer: {
    marginBottom: scale(16), // Adjust bottom margin as needed
  },
});

export default styles;