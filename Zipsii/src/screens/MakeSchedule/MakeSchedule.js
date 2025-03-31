import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps"; // MapView for location selection
import Icon from "react-native-vector-icons/Ionicons"; // Import Icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Image picker for cover image
import styles from "./styles";

function MakeSchedule() {
  const navigation = useNavigation();
  const route = useRoute();

  // Initializing states based on the provided format
  const [bannerImage, setBannerImage] = useState(null);
  const [tripName, setTripName] = useState("");
  const [travelMode, setTravelMode] = useState("Bike");
  const [visible, setVisible] = useState("Public");
  const [locationFrom, setLocationFrom] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [days, setDays] = useState([{ id: 1, description: "", latitude: "", longitude: "" }]);

  // Function to calculate the number of days between two dates
  const calculateNumberOfDays = (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 for inclusive date range
  };

  // Function to handle the form submission
  const handleSubmit = async () => {
    const numberOfDays = calculateNumberOfDays(fromDate, toDate);

    // Constructing the schedule data in the required format
    const scheduleData = {
      bannerImage,
      tripName,
      travelMode,
      visible,
      location: {
        from: locationFrom,
        to: locationTo,
      },
      dates: {
        from: fromDate,
        end: toDate,
      },
      numberOfDays,
      planDescription: days.map(day => ({
        description: day.description,
        date: fromDate, // Using fromDate as a placeholder for day date
        location: {
          latitude: parseFloat(day.latitude),
          longitude: parseFloat(day.longitude),
        },
      })),
    };

    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      // Replace with your API URL
      const response = await fetch('http://172.20.10.5:8000/makeschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Schedule created successfully!');
        navigation.navigate('MySchedule');
      } else {
        throw new Error('Failed to create schedule');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Failed to save schedule. Please try again.');
    }
  };

  // Function to add a day to the trip plan
  const addDay = () => {
    setDays([...days, { id: days.length + 1, description: "", latitude: "", longitude: "" }]);
  };

  // Function to remove a day from the trip plan
  const removeDay = (id) => {
    const updatedDays = days.filter((day) => day.id !== id);
    setDays(updatedDays);
  };

  // Function to update a day's description or location
  const updateDayDetails = (id, field, value) => {
    const updatedDays = days.map((day) =>
      day.id === id ? { ...day, [field]: value } : day
    );
    setDays(updatedDays);
  };

  // Open map for location selection for a specific day
  const openMapForDay = (dayId) => {
    navigation.navigate('MapScreen', { dayId });
  };

  // Updating day location details from the map screen
  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      const { latitude, longitude, dayId } = route.params;
      updateDayDetails(dayId, "longitude", longitude.toString());
      updateDayDetails(dayId, "latitude", route.params.latitude.toString());
    }
  }, [route.params]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.tripContainer}>
          {/* Trip Name */}
          <View style={styles.formGroupRow}>
            <Text style={styles.labelRow}>Trip Name</Text>
            <TextInput
              style={styles.underlineInput}
              value={tripName}
              onChangeText={setTripName}
              placeholder="Enter trip name"
            />
          </View>

          {/* Location */}
          <Text style={styles.maintitle}>LOCATION</Text>
          <View style={styles.row}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>From</Text>
              <TextInput
                style={styles.input}
                value={locationFrom}
                onChangeText={setLocationFrom}
                placeholder="From location"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>To</Text>
              <TextInput
                style={styles.input}
                value={locationTo}
                onChangeText={setLocationTo}
                placeholder="To location"
              />
            </View>
          </View>

          {/* Dates */}
          <View style={styles.datescontainer}>
            <Text style={styles.maintitle}>DATES</Text>
            <View style={styles.row}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>From Date</Text>
                <TextInput
                  style={styles.input}
                  value={fromDate}
                  onChangeText={setFromDate}
                  placeholder="Start date (dd/mm/yyyy)"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>To Date</Text>
                <TextInput
                  style={styles.input}
                  value={toDate}
                  onChangeText={setToDate}
                  placeholder="End date (dd/mm/yyyy)"
                />
              </View>
            </View>
          </View>

          {/* Plan Description - Location Fields */}
          <Text style={styles.title}>Plan Description</Text>
          <View style={styles.planDescriptionContainer}>
            {days.map((day) => (
              <View key={day.id} style={styles.dayContainer}>
                <Text style={styles.dayTitle}>{`Day ${day.id}`}</Text>
                <TextInput
                  style={styles.dayInput}
                  placeholder={`Enter details for Day ${day.id}`}
                  value={day.description}
                  onChangeText={(text) => updateDayDetails(day.id, "description", text)}
                  multiline
                />
                <View style={styles.mapButtonContainer}>
                  <TouchableOpacity
                    onPress={() => openMapForDay(day.id)}
                    style={styles.mapButton}>
                    <Icon name="location-sharp" size={24} color="white" />
                    <Text style={styles.mapButtonText}>Select Location</Text>
                  </TouchableOpacity>
                </View>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: day.latitude ? parseFloat(day.latitude) : 37.78825,
                    longitude: day.longitude ? parseFloat(day.longitude) : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  {day.latitude && day.longitude && (
                    <Marker coordinate={{ latitude: parseFloat(day.latitude), longitude: parseFloat(day.longitude) }} />
                  )}
                </MapView>
                <TouchableOpacity
                  style={styles.removeDayButton}
                  onPress={() => removeDay(day.id)}
                >
                  <Icon name="close-circle" size={20} color="#e53935" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addDayButton} onPress={addDay}>
              <Icon name="add-circle" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default MakeSchedule;
