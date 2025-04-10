import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import Geocoder from 'react-native-geocoding';

const { width, height } = Dimensions.get("window");

Geocoder.init("YOUR_GOOGLE_API_KEY"); // Make sure to replace with your Google API key

function MapScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { dayId } = route.params;

  const [region, setRegion] = useState({
    latitude: 11.1276, // Default value for latitude
    longitude: 78.6569, // Default value for longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [searchText, setSearchText] = useState("");

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    if (latitude && longitude) {
      setRegion({
        ...region,
        latitude,
        longitude,
      });
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      // Perform geocoding search to get latitude and longitude from address
      Geocoder.from(searchText)
        .then((json) => {
          const location = json.results[0].geometry.location;
          const { lat, lng } = location;

          if (lat && lng) {
            // Update region state with the new coordinates
            setRegion({
              ...region,
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } else {
            console.warn("Invalid location data.");
          }
        })
        .catch((error) => {
          console.warn("Error with geocoding:", error);
        });
    }
  };

  const handleDone = () => {
    // Ensure that latitude and longitude are valid before navigating
    if (region.latitude && region.longitude) {      
      navigation.navigate("MakeSchedule", {
        dayId,
        latitude: region.latitude,
        longitude: region.longitude,
      });
    } else {
      console.warn("Invalid coordinates. Please select a valid location.");
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a place"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
      >
        <Marker coordinate={region} />
      </MapView>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width,
    height: height - 250, // Adjust height to make space for search bar
  },
  doneButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  searchInput: {
    width: "80%",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MapScreen;
