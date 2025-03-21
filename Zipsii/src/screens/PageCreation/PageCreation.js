import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../../utils";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; // Importing Location module

const ProfilePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState({ latitude: 343, longitude: 343 }); // Default location
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://192.168.1.40:8000/user/getProfile");
        const data = await response.json();

        if (response.ok) {
          setName(data.fullName || "");
          setUsername(data.username || "");
          setWebsite(data.website || "");
          setBio(data.bio || "");
          setLocation(data.location);
          setProfileImage(data.profilePicture || null); 
        } else {
          console.log("profile data not found", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfileData();
    getLocation(); // Get the user's location when the component mounts
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to fetch the current location
  const getLocation = async () => {
    try {
      // Request permission for location access
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);

        // Set the fetched latitude and longitude in the state
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        Alert.alert('Permission Denied', 'Location permission is required');
      }
    } catch (error) {
      console.warn('Error fetching location:', error);
      Alert.alert('Error', 'Unable to fetch location');
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri); // Set selected image URI
    }
  };

  // Save the profile data
  const handleSave = async () => {
    const profileData = {
      fullName: name,
      username,
      website,
      bio,
      location: JSON.stringify(location),
    };

    if (profileImage) {
      const uri = profileImage;
      const fileName = uri.split("/").pop();
      const type = `image/${fileName.split(".").pop()}`;
      profileData.profilePicture = {
        uri,
        name: fileName,
        type,
      };
    }

    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      const response = await fetch("http://192.168.1.40:8000/user/editProfile", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated successfully", data);
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        throw new Error('Error updating profile');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.doneButton}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageUploadButton}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../../assets/profileimage.jpg")}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.imageUploadText}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputWrapper}>
        {/* Name */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.divider} />
          </View>
        </View>

        {/* Username */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <View style={styles.divider} />
          </View>
        </View>

        {/* Website */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Website</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Add your website"
              value={website}
              onChangeText={setWebsite}
            />
            <View style={styles.divider} />
          </View>
        </View>

        {/* Bio */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Bio</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={[styles.inputField, styles.bioInput]}
              placeholder="Write about yourself"
              value={bio}
              onChangeText={setBio}
            />
            <View style={styles.divider} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
  },
  doneButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  doneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.blueColor,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageUploadButton: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.graycolor,
  },
  imageUploadText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: colors.blueColor,
  },
  inputWrapper: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingVertical: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.fontMainColor,
    flex: 1,
  },
  inputFieldContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
    width: "100%",
  },
  bioInput: {
    textAlignVertical: "top",
  },
  divider: {
    height: 1,
    backgroundColor: colors.graycolor,
    width: "100%",
    marginTop: 5,
  },
});

export default ProfilePage;
