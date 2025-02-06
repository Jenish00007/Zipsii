import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { colors, scale } from '../../utils';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: colors.white,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
  },
  tabButton: {
    paddingVertical: 10,
  },
  tabButtonText: {
    fontSize: 16,
    color: colors.grey,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.greenColor,
  },
  activeTabButtonText: {
    fontWeight: 'bold',
    color: colors.greenColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGray,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightyellow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9,
    marginBottom: 10,
  },
  forwardArrow: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 8,
  },  
  statusBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.lightBlueColor,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 40
  },
  transactionText: {
    fontSize: 14,
    color: colors.fontMainColor,
    marginHorizontal: 5,
  },
  label: {
    color: colors.black,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: colors.grayLinesColor,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%', // Set a fixed width or percentage-based width
    alignItems: 'center', // Center the text horizontally
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.fontMainColor,
    textAlign: 'center',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.fontMainColor,
    textAlign: 'center',
  },    
  cancelButtonText: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  trackButton: {
    backgroundColor: colors.greenColor,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%', // Set a fixed width or percentage-based width
    alignItems: 'center', // Center the text horizontally
  },
  trackButtonText: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
