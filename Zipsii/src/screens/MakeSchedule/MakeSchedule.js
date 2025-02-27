import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { BackHeader, BottomTab } from "../../components";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";

function MakeSchedule() {
  const navigation = useNavigation();
  const [visibility, setVisibility] = useState("Public"); // Default visibility option
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);

  const [members, setMembers] = useState("1-2"); // Default member option
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);

  const [travelMode, setTravelMode] = useState("Car"); // Default travel mode
  const [showTravelModeDropdown, setShowTravelModeDropdown] = useState(false);

  const [days, setDays] = useState([{ id: 1, details: "" }]); // Initial days array

  const visibilityOptions = ["Public", "Private", "Friends Only"];
  const membersOptions = Array.from({ length: 4 }, (_, i) => `1-${i + 2}`); // Members options: 1-2 to 1-11
  const travelModeOptions = ["Car", "Bike", "Cycle"]; // Travel Mode options

  // Add a new day container
  const addDay = () => {
    setDays([...days, { id: days.length + 1, details: "" }]);
  };

  // Remove a specific day container
  const removeDay = (id) => {
    const updatedDays = days.filter((day) => day.id !== id);
    setDays(updatedDays);
  };

  // Update the details for a specific day
  const updateDayDetails = (id, details) => {
    const updatedDays = days.map((day) =>
      day.id === id ? { ...day, details } : day
    );
    setDays(updatedDays);
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
          <TextInput style={styles.underlineInput} />
        </View>

        {/* Location */}
        <Text style={styles.maintitle}>LOCATION</Text>
        <View style={styles.row}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>From</Text>
            <TextInput style={styles.input} placeholder="From location" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>To</Text>
            <TextInput style={styles.input} placeholder="To location" />
          </View>
        </View>

        {/* Dates */}
        <View style={styles.datescontainer}>
        <Text style={styles.maintitle}>DATES</Text>
        <View style={styles.row}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>From Date</Text>
            <TextInput style={styles.input} placeholder="Start date" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>To Date</Text>
            <TextInput style={styles.input} placeholder="End date" />
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
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid",
            }}
            style={styles.image}
          />
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton} 
        onPress={()=>
            navigation.navigate('MySchedule')
        }>
          <Text style={styles.doneButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
      
     </ScrollView>

     {/* BottomTab Component */}
     <BottomTab screen={"WhereToGo"} stye={styles.BottomTab}/>
    </View>
  );
}

export default MakeSchedule;
