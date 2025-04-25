import { StyleSheet } from 'react-native';
import { alignment, colors, scale } from '../../utils';

export default StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: colors.themeBackground,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: scale(10),
    elevation: 0,
    shadowOpacity: 0,
  },
  footerBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    fontSize: scale(10),
    marginTop: scale(2),
    color: colors.greenColor,
  },
  inactiveText: {
    fontSize: scale(10),
    marginTop: scale(2),
    color: colors.darkGrayText,
  },
});
