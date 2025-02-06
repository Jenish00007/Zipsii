import { Dimensions, StyleSheet } from 'react-native';
import { alignment, colors, scale } from '../../utils';
const { height, width } = Dimensions.get('window');

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
  contentContainer: {
    flexGrow: 1,
    padding: scale(10),
    justifyContent: 'space-between',
  },
  subContainerImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: scale(130),
    height: scale(130),
  },
  descriptionEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.Plarge,
  },
  emptyButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardWrapper: {
    marginBottom: scale(15),
    alignItems: 'flex-start',
  },
  cardContainer: {
    width: width * 0.45,
    height: height * 0.25,
    margin: scale(5),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: colors.medHorizontalLine,
    backgroundColor: colors.grayLinesColor,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  likeButtonContainer: {
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    padding: scale(5),
  },
  cardDetailsWrapper: {
    width: '100%',
    paddingHorizontal: scale(5),
    alignItems: 'flex-start',
    marginTop: scale(5),
  },
  productTitle: {
    fontSize: scale(14),
    marginBottom: scale(5),
    width: width * 0.45,
  },
  productPrice: {
    fontSize: scale(12),
    marginBottom: scale(5),
    color: colors.fontBlue,
    width: width * 0.45,
  },
});

export default styles;
