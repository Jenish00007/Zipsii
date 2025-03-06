import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { BackHeader, BottomTab } from "../../components";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Import image picker for selecting the cover image

function MakeSchedule() {
  const navigation = useNavigation();
  const [visibility, setVisibility] = useState("Public");
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
  const [members, setMembers] = useState("1-2");
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  const [travelMode, setTravelMode] = useState("Car");
  const [showTravelModeDropdown, setShowTravelModeDropdown] = useState(false);
  const [days, setDays] = useState([{ id: 1, details: "" }]);

  // State for text inputs
  const [tripName, setTripName] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // State for cover image
  const [coverImage, setCoverImage] = useState(null);

  // Focus state to highlight input
  const [focusedField, setFocusedField] = useState(null);

  const visibilityOptions = ["Public", "Private", "Friends Only"];
  const membersOptions = Array.from({ length: 4 }, (_, i) => `1-${i + 2}`);
  const travelModeOptions = ["Car", "Bike", "Cycle"];

  const addDay = () => {
    setDays([...days, { id: days.length + 1, details: "" }]);
  };

  const removeDay = (id) => {
    const updatedDays = days.filter((day) => day.id !== id);
    setDays(updatedDays);
  };

  const updateDayDetails = (id, details) => {
    const updatedDays = days.map((day) =>
      day.id === id ? { ...day, details } : day
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

  // Function to handle the API request and post data
  const handleSubmit = async () => {
    const scheduleData = {
      tripName, // User input
      locationFrom, // User input
      locationTo, // User input
      fromDate, // User input
      toDate, // User input
      visibility,
      members,
      travelMode,
      days,
      coverImage, // Add the cover image URI to the schedule data
    };

    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      // Replace with your API URL
      const response = await fetch('http://192.168.18.179:8000/makeschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        // If the API call is successful, navigate to MySchedule screen
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.protractorShape} />
      <BackHeader title="Make a Schedule" />
      <ScrollView style={styles.container}>
        <View style={styles.tripContainer}>
          {/* Trip Name */}
          <View style={styles.formGroupRow}>
            <Text style={styles.labelRow}>Trip Name</Text>
            <TextInput
              style={[styles.underlineInput, focusedField === 'tripName' && styles.inputFocused]}
              value={tripName}
              onChangeText={setTripName} // Update the state with user input
              placeholder="Enter trip name"
              onFocus={() => setFocusedField('tripName')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Location */}
          <Text style={styles.maintitle}>LOCATION</Text>
          <View style={styles.row}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>From</Text>
              <TextInput
                style={[styles.input, focusedField === 'locationFrom' && styles.inputFocused]}
                value={locationFrom}
                onChangeText={setLocationFrom}
                placeholder="From location"
                onFocus={() => setFocusedField('locationFrom')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>To</Text>
              <TextInput
                style={[styles.input, focusedField === 'locationTo' && styles.inputFocused]}
                value={locationTo}
                onChangeText={setLocationTo}
                placeholder="To location"
                onFocus={() => setFocusedField('locationTo')}
                onBlur={() => setFocusedField(null)}
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
                  style={[styles.input, focusedField === 'fromDate' && styles.inputFocused]}
                  value={fromDate}
                  onChangeText={setFromDate}
                  placeholder="Start date"
                  onFocus={() => setFocusedField('fromDate')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>To Date</Text>
                <TextInput
                  style={[styles.input, focusedField === 'toDate' && styles.inputFocused]}
                  value={toDate}
                  onChangeText={setToDate}
                  placeholder="End date"
                  onFocus={() => setFocusedField('toDate')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>
          </View>

          {/* Dropdowns for Visibility and Members */}
          <Text style={styles.title}>Visibility & Members</Text>
          <View style={styles.row}>
            {/* Visibility Dropdown */}
            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
              >
                <Text style={styles.dropdownText}>{visibility}</Text>
                <Icon
                  name={showVisibilityDropdown ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#555"
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showVisibilityDropdown && (
                <View style={styles.dropdown}>
                  {visibilityOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setVisibility(option);
                        setShowVisibilityDropdown(false);
                      }}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Members Dropdown */}
            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => setShowMembersDropdown(!showMembersDropdown)}
              >
                <Text style={styles.dropdownText}>{members}</Text>
                <Icon
                  name={showMembersDropdown ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#555"
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showMembersDropdown && (
                <View style={styles.dropdown}>
                  {membersOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setMembers(option);
                        setShowMembersDropdown(false);
                      }}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* No of Days */}
          <Text style={styles.title}>No of Days</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Enter number of days"
              keyboardType="numeric"
            />
          </View>

          {/* Plan Description */}
          <Text style={styles.title}>Plan Description</Text>
          <View style={styles.planDescriptionContainer}>
            {days.map((day) => (
              <View key={day.id} style={styles.dayContainer}>
                <Text style={styles.dayTitle}>{`Day ${day.id}`}</Text>
                <TextInput
                  style={styles.dayInput}
                  placeholder={`Enter details for Day ${day.id}`}
                  value={day.details}
                  onChangeText={(text) => updateDayDetails(day.id, text)}
                  multiline
                />
                <TouchableOpacity
                  style={styles.removeDayButton}
                  onPress={() => removeDay(day.id)}
                >
                  <Icon name="close-circle" size={20} color="#e53935" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addDayButton} onPress={addDay}>
              <Icon name="add-circle" size={24} color={colors.btncolor} />
            </TouchableOpacity>
          </View>

          {/* Travel Mode Section */}
          <Text style={styles.title}>Travel Mode</Text>
          <View style={styles.formGroup}>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setShowTravelModeDropdown(!showTravelModeDropdown)}
            >
              <Text style={styles.dropdownText}>{travelMode}</Text>
              <Icon
                name={showTravelModeDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#555"
                style={styles.icon}
              />
            </TouchableOpacity>
            {showTravelModeDropdown && (
              <View style={styles.dropdown}>
                {travelModeOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => {
                      setTravelMode(option);
                      setShowTravelModeDropdown(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Cover Image */}
          <View style={styles.formGroup}>
            <Text style={styles.title}>Cover Image</Text>
            {coverImage ? (
              // Show selected image inside a box/container with styling
              <View style={styles.coverImageContainer}>
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              </View>
            ) : (
              <Text style={styles.placeholderText}>No image selected</Text> // Optional: Show placeholder text
            )}
            <TouchableOpacity style={styles.uploadImageButton} onPress={pickCoverImage}>
              <Icon name="cloud-upload-outline" size={24} color={colors.btncolor} />
              <Text style={styles.uploadImageText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          
          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomTab />
    </View>
  );
}

export default MakeSchedule;
