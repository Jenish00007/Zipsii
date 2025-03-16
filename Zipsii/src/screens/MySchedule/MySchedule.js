import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { BackHeader, BottomTab, TextDefault } from '../../components';
import { SafeAreaView } from "react-native-safe-area-context";
import Schedule from './Schedule/AllSchedule';

const baseUrl = 'http://192.168.85.179:8000'; // Update the base URL if necessary

function MySchedule({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [all_schedule, setAll_schedule] = useState([]);

  // Fetch all schedule data
  useEffect(() => {
    const fetch_all_schedule = async () => {
      try {
        const response = await fetch(baseUrl + '/get_all_schedule');
        const data = await response.json();
        const formattedData = data.slice(0, 100).map((item) => ({
          id: item.id,
          title: item.title,
          from: item.from,
          to: item.to,
          date: item.date,
          riders: item.riders,
          joined: item.joined,
          imageUrl: item.imageUrl,
          day1Locations: item.day1Locations,
          day2Locations: item.day2Locations,
        }));
        setAll_schedule(formattedData); // Set the fetched schedule data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch_all_schedule();
  }, []);

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

  // Handle navigation between months
  const handlePrevMonth = () => {
    setSelectedDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(year, month + 1, 1));
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  // Back button pressed
  const backPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} 
          data={all_schedule.slice(0, 8)}
          renderItem={({ item }) => <Schedule item={item} />}
        />
      </View>
     
     
      <BottomTab screen={"WhereToGo"} style={styles.BottomTab} />
    </SafeAreaView>
  );
}

export default MySchedule;
