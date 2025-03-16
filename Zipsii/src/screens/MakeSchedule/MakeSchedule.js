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
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Image picker for cover image
import styles from "./styles";

function MakeSchedule() {
  const navigation = useNavigation();
  const route = useRoute();
  const [visibility, setVisibility] = useState("Public");
  const [members, setMembers] = useState("1-2");
  const [travelMode, setTravelMode] = useState("Car");
  const [days, setDays] = useState([{ id: 1, details: "", latitude: "", longitude: "" }]);
  const [tripName, setTripName] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  
  const addDay = () => {
    setDays([...days, { id: days.length + 1, details: "", latitude: "", longitude: "" }]);
  };

  const removeDay = (id) => {
    const updatedDays = days.filter((day) => day.id !== id);
    setDays(updatedDays);
  };

  const updateDayDetails = (id, field, value) => {
    const updatedDays = days.map((day) =>
      day.id === id ? { ...day, [field]: value } : day
    );
    setDays(updatedDays);
  };

  // Function to handle image selection (cover image)
  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  const handleSubmit = async () => {
    const scheduleData = {
      tripName,
      locationFrom,
      locationTo,
      fromDate,
      toDate,
      visibility,
      members,
      travelMode,
      days: days.map(day => ({
        ...day,
        location: {
          latitude: parseFloat(day.latitude),
          longitude: parseFloat(day.longitude),
        },
      })),
      coverImage,
    };

    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      const response = await fetch('http://192.168.85.179:8000/makeschedule', {
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

  // Function to open map for each day
  const openMapForDay = (dayId) => {
    navigation.navigate('MapScreen', { dayId });
  };

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      const { latitude, longitude, dayId } = route.params;
      updateDayDetails(dayId, "latitude", latitude.toString());
      updateDayDetails(dayId, "longitude", longitude.toString());
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
                  placeholder="Start date"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>To Date</Text>
                <TextInput
                  style={styles.input}
                  value={toDate}
                  onChangeText={setToDate}
                  placeholder="End date"
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
                  value={day.details}
                  onChangeText={(text) => updateDayDetails(day.id, "details", text)}
                  multiline
                  onFocus={() => openMapForDay(day.id)}  // Open map when day description is focused
                />
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

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   tripContainer: {
//     marginBottom: 20,
//   },
//   formGroupRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   labelRow: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   underlineInput: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     width: "48%",
//   },
//   maintitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   formGroup: {
//     width: "48%",
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     borderColor: "#ccc",
//     marginTop: 5,
//   },
//   datescontainer: {
//     marginTop: 20,
//   },
//   dayContainer: {
//     marginBottom: 20,
//   },
//   dayTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dayInput: {
//     borderWidth: 1,
//     padding: 10,
//     borderColor: "#ccc",
//     marginTop: 10,
//     borderRadius: 5,
//     height: 80,
//     textAlignVertical: "top",
//   },
//   map: {
//     width: "100%",
//     height: 200,
//     marginTop: 10,
//   },
//   removeDayButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#e53935",
//     padding: 5,
//     borderRadius: 20,
//   },
//   addDayButton: {
//     alignSelf: "center",
//     marginTop: 10,
//   },
//   doneButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   doneButtonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

export default MakeSchedule;
