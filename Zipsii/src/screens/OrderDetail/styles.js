import { StyleSheet } from 'react-native'
import { alignment, colors, scale, verticalScale } from '../../utils'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeAreaStyle: {
    backgroundColor: colors.white
  },
  itemContainer: {
    backgroundColor: colors.white
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.darkGrayText,
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  cardContainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: scale(100),
    
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  card: {
    backgroundColor: colors.container,
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    borderRadius: scale(8),
    borderWidth: 1, // Adjust this value to increase the border thickness
    borderColor: '#D3D3D3', // Choose the border color (e.g., Dark Gray)
    // Shadow for both Android and iOS
    shadowColor: '#D3D3D3',  // Dark gray shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity (higher value = more visible shadow)
    shadowRadius: 6,  // Radius of the shadow blur
    elevation: 5,  //
    marginTop: 30
  },
  cardLeftContainer: {
    width: '30%',
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  cardRightContainer: {
    width: '65%',
    justifyContent: 'space-between',
    ...alignment.MLxSmall,
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: verticalScale(8),
    borderBottomLeftRadius: verticalScale(8)
  },
  amountContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...alignment.MTxSmall,
    ...alignment.MBxSmall
  },
  quantityContainer: {
    // width: '30%',
    justifyContent: 'center'
  },
  priceContainer: {
    maxWidth: '60%',
    justifyContent: 'center'
  },
  deliverContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  deliverSubContainer: {
    width: '100%',
    ...alignment.MLmedium,
    ...alignment.MRmedium,
  },
  paymentContainer: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  paymentSubContainer: {
    width: '90%',
    marginTop: -50
  },
  twoItems: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalContainer: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  totalSubContainer: {
    width: '90%',
    justifyContent: 'center',
    borderColor: colors.grayLinesColor,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginTop: -20,
    shadowColor: colors.grayLinesColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0,
    elevation: 1,

  },
  trackOrderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    ...alignment.PTlarge,
    ...alignment.PBlarge
  },
  buttonText: {
    width: '90%',
    alignSelf: 'center'
  },
  trackOrderSubContainer: {
    width: '100%',
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    borderRadius: scale(4),
    height: scale(80),
    marginTop: -30
  },
  trackStyle: {
    width: '90%',
    height: '60%',
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(4)
  },
  actionContainer: {
    // width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: scale(4),
    backgroundColor: colors.buttonBackground,
    ...alignment.PLxSmall,
    ...alignment.PRxSmall
  }
})
export default styles
