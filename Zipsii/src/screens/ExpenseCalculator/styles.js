import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: colors.fontMainColor,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.fontMainColor,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: colors.btncolor,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resultsSection: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.fontMainColor,
  },
  memberCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    elevation: 2,
  },
  memberCardPaid: {
    backgroundColor: colors.lightGreen,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.fontMainColor,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.fontMainColor,
  },
  paidStatus: {
    fontSize: 12,
    color: colors.fontSecondColor,
    marginTop: 4,
  },
});

export default styles;