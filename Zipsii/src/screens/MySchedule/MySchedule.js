import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../../utils/styles";
import { BackHeader, BottomTab, TextDefault } from '../../components';
import { SafeAreaView } from "react-native-safe-area-context";
import Schedule from './Schedule/AllSchedule';
import { base_url } from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';


//const baseUrl = 'http://192.168.1.6:3030'; // Update the base URL if necessary

function MySchedule({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [all_schedule, setAll_schedule] = useState([]);

  // Fetch all schedule data
  useEffect(() => {
    const fetch_all_schedule = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        const response = await fetch(`${base_url}/schedule/listing/filter`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }); 
        const data = await response.json();
        if (data.success && data.data) {
          const formattedData = data.data.map((item) => {
            const fromDate = new Date(item.Dates.from);
            const endDate = new Date(item.Dates.end);
            const createdAt = new Date(item.createdAt);
            
            return {
              id: item._id,
              title: item.tripName,
              from: item.locationDetails?.[0]?.address || 'Unknown location',
              to: item.locationDetails?.[1]?.address || 'Unknown location',
              date: fromDate.toLocaleDateString(),
              endDate: endDate.toLocaleDateString(),
              travelMode: item.travelMode,
              visible: item.visible,
              numberOfDays: item.numberOfDays.toString(),
              imageUrl: item.bannerImage,
              locationDetails: item.locationDetails,
              createdAt: createdAt.toLocaleDateString(),
              // Keep raw location data for map if needed
              rawLocation: {
                from: {
                  latitude: item.location.from.latitude,
                  longitude: item.location.from.longitude
                },
                to: {
                  latitude: item.location.to.latitude,
                  longitude: item.location.to.longitude
                }
              }
            };
          });
          setAll_schedule(formattedData);
        }
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

  // Filter schedules for the selected date
  const filteredSchedules = all_schedule.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return (
      scheduleDate.getDate() === selectedDate.getDate() &&
      scheduleDate.getMonth() === selectedDate.getMonth() &&
      scheduleDate.getFullYear() === selectedDate.getFullYear()
    );
  });

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
          data={filteredSchedules}
          renderItem={({ item }) => <Schedule item={item} />}
        />
      </View>
     
     
      <BottomTab screen={"WhereToGo"} style={styles.BottomTab} />
    </SafeAreaView>
  );
}

export default MySchedule;
