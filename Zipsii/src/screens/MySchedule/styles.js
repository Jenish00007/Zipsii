import { StyleSheet } from "react-native";
import { colors } from "../../utils";
import { alignment } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // ...alignment.Pmedium, // Example of using padding from alignment
    position: 'relative'
  },
  backgroundCurvedContainer: {
    backgroundColor: colors.btncolor,
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  protractorShape: {
    backgroundColor: colors.white,
    height: 500,
    width: 1000,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    zIndex: 1,
    overflow: 'hidden',
  },
  datecontainer:{
    zIndex: 2, // Place it above the protractorShape
    position: 'relative', // Adjust from absolute to prevent overlap
    width: '100%',
    // marginTop: 110,
    ...alignment.Pmedium
  },
  dateScheduleContainer: {
    backgroundColor: colors.white,
    ...alignment.Pmedium,
    borderRadius: 20,
    // elevation: 2,
    ...alignment.MBmedium, // Example of using margin-bottom from alignment
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    shadowColor: colors.grayLinesColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 6,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 2, // Place it above the protractorShape
    position: 'relative', // Adjust from absolute to prevent overlap
    width: '100%',
    marginTop: 110
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...alignment.MBsmall,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dayContainer: {
    alignItems: "center",
    ...alignment.Msmall,
    ...alignment.Psmall,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  selectedDayContainer: {
    backgroundColor: colors.btncolor,
  },
  weekText: {
    fontSize: 14,
    color: "#6b7280",
  },
  selectedWeekText: {
    color: "#ffffff",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  selectedDayText: {
    color: "#ffffff",
  },
  content: {
    ...alignment.MTmedium,
    ...alignment.Pmedium,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.btncolor,
    ...alignment.MBsmall,
  },
  noScheduleText: {
    fontSize: 16,
    color: "#6b7280",
  },
});

export default styles;
