import { StyleSheet } from 'react-native'
import { alignment, colors, scale} from '../../utils'

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '70%', // Reduced height (adjust this value as needed)
    backgroundColor: colors.white,
    borderRadius: 10, // Optional: Rounded corners
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset for shadow
    shadowOpacity: 0.25, // Opacity of shadow
    shadowRadius: 3.84, // Blur radius for shadow
    elevation: 5, // Elevation for Android shadow
    padding: 10,
    marginBottom: 20
  },
  topCardContainer: {
    width: '100%',
    height: '70%',
    position: 'relative', // Makes child absolute positioning work
    borderRadius: 10,
    backgroundColor: colors.grayLinesColor,
  },
  cardImageContainer: {
    width: '90%',
    height: '90%',
    position: 'relative',
    
  },
  imgResponsive: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 5,
  },
  botCardContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    backgroundColor: colors.container,
    ...alignment.PTxSmall
  },
  botSubCardContainer: {
    width: '90%',
    height: '100%',
    justifyContent: 'space-between',
    ...alignment.PBxSmall
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  ratingContainer: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  aboutRestaurant: {
    width: '20%',
    justifyContent: 'center'
  },
  likeContainer: {
    position: 'absolute', // Positioning it inside the parent container
    top: 10, // Adjust the value as needed for spacing from the top
    right: 10, // Adjust the value as needed for spacing from the right
    zIndex: 1, // Ensure it's above other elements
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.greenColor
  },
  offerContainer: {
    position: 'absolute', // Positioned relative to the parent container
    top: 0, // Distance from the top edge
    left: 0, // Distance from the left edge
    backgroundColor: colors.greenColor, // Green background color
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 5, // Rounded corners
    zIndex: 1, // Ensure it appears above the image
  }, 
  font: {
    marginLeft: 2,
    backgroundColor: 'aqua',
    alignContent: 'center'
  },
});
export default styles;
