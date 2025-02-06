import { Dimensions, StyleSheet } from 'react-native'
import { alignment, fontStyles, colors, scale } from '../../utils'
import color from '../../components/Text/TextDefault/styles'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  line: {
    width: '100%',
    borderBottomColor: colors.horizontalLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...alignment.MTsmall,
    ...alignment.MBsmall
  },
  safeAreaStyle: {
    backgroundColor: colors.headerbackground
  },
  mainContainer: {
    backgroundColor: colors.darkGrayText
  },
  contentStyle: {
    flexGrow: 1
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  caroselContainer: {
    width: '100%',
    height: height * 0.1,
    alignItems: 'center'
  },
  caroselSubContainer: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  caroselTitleContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: '5%',
    fontWeight: 'bold'
  },
  // caroselPriceContainer: {
  //   width: '30%',
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   ...alignment.PxSmall,
    
  // },
  caroselPriceSubContainer: {
    marginLeft: '3%',
    fontWeight: 'bold',
    ...alignment.Psmall,
    marginTop: -30
    
   
  },
  mainScrollViewContainer: {
    backgroundColor: colors.white

  },
  textStyle: {
    fontFamily: fontStyles.PoppinsRegular,
    fontSize: scale(12)
  },
  boldStyle: {
    fontFamily: fontStyles.PoppinsBold
  },
  priceColor: {
    color: colors.textBlueColor
  },
  caroselMainImgCnt: {
    height: height * 0.5,
    width: '100%',
    backgroundColor: colors.grayLinesColor,
    marginTop: -100
  },
  scrollViewStyle: {
    height: height * 0.08
  },
  caroselItems: {
    width: width * 0.15,
    height: height * 0.08,
    marginRight: width * 0.01,
    marginLeft: width * 0.01,
    marginTop: width * 0.01
  },
  shoppingCartContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(20),
    marginBottom: scale(20)
  },
  outOfStockContainer: {
    width: '90%',
    height: scale(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    backgroundColor: colors.medHorizontalLine,
    ...alignment.MTlarge,
    ...alignment.MBlarge
  },
  spacer: {
    ...alignment.MTlarge
  },
  smallSpacer: {
    ...alignment.MTxSmall
  },
  variationContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  // REview Styling
  review: {
    width: '90%',
    alignSelf: 'center'
  },
  reviewerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(-12), // Adjust spacing
    marginLeft: '5%',
  },  
  ratingText:{
    marginLeft: 5,
  },
  dateReview: {
    width: '100%',
    textAlign: 'left',
    ...alignment.PTsmall,
    ...alignment.PBxSmall
  },
  reviewHeader: {
    alignSelf: 'center',
    width: '90%',
    marginTop: scale(-17), // Adjust spacing
  },
  // modal
  crossBtn: {
    backgroundColor: colors.white,
    borderRadius: 50,
    ...alignment.Psmall
  },
  headerZoom: {
    position: 'absolute',
    top: scale(20),
    right: scale(10),
    ...alignment.MTlarge
  },
  kgSelectorContainer: {
    position: 'absolute', // Makes it relative to caroselContainer
    bottom: scale(130), // Adjust distance from the bottom
    right: scale(10), // Adjust distance from the right
    padding: scale(10), // Add some padding
    borderRadius: scale(5), // Optional: rounded corners
    
  },
  kgSelectorButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  kgButton: {
    padding: scale(5),
    borderRadius: scale(5),
  },
  kgCount: {
    marginHorizontal: scale(10),
  },
  likeContainer: {
    position: 'absolute',
    top: scale(10), // Adjust for spacing from the top
    right: scale(0), // Adjust for spacing from the right
    zIndex: 20, // Ensure it appears above other content
    backgroundColor: colors.white, // Optional: Add a background
    borderRadius: scale(15), // Optional: Round the background
    padding: scale(5), // Optional: Add padding for touch area
    shadowColor: colors.grayLinesColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  }
  
  
  
  
})
export default styles
