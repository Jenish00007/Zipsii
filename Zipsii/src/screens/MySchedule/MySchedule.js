import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import Schedule from "./Schedule/Schedule";
import {
  BackHeader,
  BottomTab,

} from '../../components'
import { SafeAreaView } from "react-native-safe-area-context";

function MySchedule({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper function to generate dates for the current month
  const getDatesForMonth = (year, month) => {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dates.push({
        day: day,
        week: date.toLocaleString("en-US", { weekday: "short" }).charAt(0),
        fullDate: date,
      });
    }
    return dates;
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const dates = getDatesForMonth(year, month);

  const handlePrevMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const formatSelectedDate = (date) => {
    // Manually set the time to 00:00:00 before formatting
    date.setHours(0, 0, 0, 0);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const backPressed = () => {
    navigation.goBack();
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />
      <BackHeader backPressed={backPressed} title="Schedule" />

      <View style={styles.datecontainer}>
      <View style={styles.dateScheduleContainer}>
        <View style={styles.monthNavigation}>
        <Text style={styles.monthText}>{formatMonthYear(selectedDate)}</Text>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleNextMonth}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item) => item.fullDate.toISOString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedDate(item.fullDate)}
              style={[
                styles.dayContainer,
                selectedDate.getDate() === item.day &&
                  selectedDate.getMonth() === item.fullDate.getMonth() &&
                  styles.selectedDayContainer,
              ]}
            >
              <Text
                style={[
                  styles.weekText,
                  selectedDate.getDate() === item.day &&
                    selectedDate.getMonth() === item.fullDate.getMonth() &&
                    styles.selectedWeekText,
                ]}
              >
                {item.week}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  selectedDate.getDate() === item.day &&
                    selectedDate.getMonth() === item.fullDate.getMonth() &&
                    styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      </View>

      {/* Integrate Schedule Component Below the Date Schedule Container */}
      <Schedule />

      {/* BottomTab Component */}
      <BottomTab screen={"WhereToGo"} style={styles.BottomTab}/>
    </View>
    
  );
}

export default MySchedule;
