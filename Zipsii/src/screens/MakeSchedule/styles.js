import { StyleSheet } from "react-native";
import { colors } from "../../utils";
import { alignment } from "../../utils";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    position: "relative"
  },
  container: {
    flex: 1,
    ...alignment.Pmedium,
    position: 'relative',
    width: '100%',
    zIndex: 2
  },
  backgroundCurvedContainer: {
    backgroundColor: colors.btncolor, // Adjust to match the gradient or color
    height: 200, // Height for curved container
    width: "100%", // Full screen width
    position: "absolute",
    top: 0, // Start from the top
    zIndex: 0, // Set a lower zIndex than the protractorShape
},
protractorShape: {
    backgroundColor: colors.white, // Match the desired protractor color
    height: 500, // Half of the new width for a proportional semi-circle
    width: 1000, // Increased width for the protractor shape
    borderTopLeftRadius: 500, // Half of the width for a semi-circle
    borderTopRightRadius: 500, // Half of the width for a semi-circle
    position: "absolute",
    top: 80, // Adjust to position the shape properly
    alignSelf: "center", // Center horizontally
    zIndex: 1, // Position it above the backgroundCurvedContainer
    overflow: "hidden", // Ensure content stays inside the shape
},
  tripContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    shadowColor: colors.black, // Shadow color (iOS)
    shadowOffset: { width: 0, height: 6 }, // Shadow offset (iOS)
    shadowOpacity: 6, // Shadow opacity (iOS)
    shadowRadius: 6, // Shadow radius (iOS)
    elevation: 6, // Shadow for Android
    ...alignment.Pmedium,
    top: 120,
    
  },
  formGroupRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjusts spacing between inputs
    alignItems: "center", // Aligns inputs vertically
    marginBottom: 16, // Space below the row
  },
  labelRow: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.fontMainColor,
    marginRight: 8,
  },
  underlineInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLinesColor,
    fontSize: 14,
    paddingVertical: 4,
    color: colors.fontMainColor,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    padding: 7,
    fontSize: 14,
    marginHorizontal: 8,
    color: colors.fontMainColor,
    backgroundColor: colors.themeBackground
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 8,
    backgroundColor: colors.themeBackground
  },
  dropdownText: {
    fontSize: 14,
    color: colors.fontSecondColor,
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  dropdown: {
    marginTop: 8,
    position: "absolute",
    backgroundColor: colors.lightpink,
    borderRadius: 8,
    elevation: 3,
    padding: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dropdownOption: {
    padding: 5,
  },
  optionText: {
    fontSize: 14,
    color: colors.textBlueColor,
  },
  planDescriptionContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    shadowColor: colors.grayLinesColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  dayContainer: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.fontMainColor,
    marginBottom: 8,
  },
  dayInput: {
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: colors.themeBackground,
    color: colors.fontMainColor,
    height: 80,
    textAlignVertical: "top", // Multiline input starts at the top
  },
  removeDayButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  addDayButton: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: colors.lightpink,
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  doneButton: {
    padding: 16,
    backgroundColor: colors.btncolor,
    borderRadius: 8,
    alignItems: "center",
    ...alignment.MBlarge,
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  maintitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.fontMainColor,
    marginVertical: 12,
    ...alignment.Psmall
  },
  title: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    color: colors.fontMainColor,
    ...alignment.Psmall,
    marginBottom: 2,
    marginTop: 40
  },
  formGroup: {
    flex: 1,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: colors.fontSecondColor,
    marginBottom: 8,
    
  },
  datescontainer: {
    borderRadius: 15,
    borderWidth: 1, // Adjust this value to increase the border thickness
    borderColor: colors.grayLinesColor, // Choose the border color (e.g., Dark Gray)
    // Shadow for both Android and iOS
    shadowColor: colors.grayLinesColor,  // Dark gray shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity (higher value = more visible shadow)
    shadowRadius: 6,  // Radius of the shadow blur
    elevation: 5, 
  },
  
});

export default styles;
