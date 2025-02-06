import { StyleSheet } from 'react-native';
import { alignment, colors, verticalScale, scale } from '../../utils';

export default {
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.themeBackground
  },
  timelineContainer: {
    backgroundColor: colors.white,
    flex: 1,
    ...alignment.PTlarge,
    ...alignment.PLsmall,
    ...alignment.PRsmall
  },
  orderIdContainer: {
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    alignItems: 'flex-start',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...alignment.MBxSmall
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleStyle: {
    fontSize: scale(16),
    color: colors.blackText,
    ...alignment.MBxSmall,
  },
  descriptionStyle: {
    fontSize: scale(14),
    color: colors.fontSecondColor
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(40),
    height: scale(40),
    marginRight: scale(-5),
    marginBottom: verticalScale(10)
  },
  iconStyle: {
    marginRight: scale(-5),
    marginTop: verticalScale(-20),
    marginleft: -20,
    paddingVertical: 10
  }
};
