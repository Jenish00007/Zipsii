import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import styles from "./Styles";
import { base_url } from "../../utils/base_url";
import NotificationService from "../../services/NotificationService";

function ReelUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // For storing the selected image
  const navigation = useNavigation();

  // Function to handle image selection
  const pickImage = async () => {
     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (permissionResult.granted) {
       const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
       });
 
       if (!result.canceled) {
         setImage(result.assets[0]);
         uploadStory(result.assets[0]);
       }
     } else {
       Alert.alert("Permission required", "You need to allow access to your photos to upload an image.");
     }
   };
  // Function to handle form submission
  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image or video to upload.");
      return;
    }
    const file = {
      caption: title,
      description: description,
      file: image.uri.split('/').pop(),
      mimetype: image.type || '', // Use the mimeType from the ImagePicker result
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Get the access token
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);

      if (!accessToken) {
        Alert.alert("Error", "You need to be logged in to submit.");
        return;
      }

      const response = await fetch(`${base_url}/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Attach the JWT token to the request header
        },
        body: JSON.stringify(file), // Send the reel data as JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Reel uploaded:", responseData);
        
        // Send notification to followers
        const followersResponse = await fetch(`${base_url}/user/followers`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        
        if (followersResponse.ok) {
          const followers = await followersResponse.json();
          followers.forEach(async (follower) => {
            if (follower.expoPushToken) {
              await NotificationService.sendReelNotification(user.fullName, follower.expoPushToken);
            }
          });
        }

        Alert.alert("Success", "Your reel was successfully uploaded!");
        navigation.goBack();
      } else {
        console.error("Error uploading reel:", responseData);
        Alert.alert("Error", responseData.message || "There was an error uploading your reel.");
      }
    } catch (error) {
      console.error("Error in uploading reel:", error);
      Alert.alert("Error", "There was an error uploading your reel.");
    }
  };

  // Function to test notifications
  const testNotification = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      
      // Get the expoPushToken from AsyncStorage
      const expoPushToken = await AsyncStorage.getItem('expoPushToken');
      
      if (!expoPushToken) {
        Alert.alert("Error", "No push token found. Please make sure you're logged in.");
        return;
      }

      // Send test notification
      await NotificationService.sendReelNotification(user.fullName, expoPushToken);
      Alert.alert("Success", "Test notification sent!");
    } catch (error) {
      console.error("Error sending test notification:", error);
      Alert.alert("Error", "Failed to send test notification");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text>Select an Image or Video</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description & Hashtags"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Test Notification Button */}
      {/* <TouchableOpacity 
        style={[styles.submitButton, { marginTop: 10, backgroundColor: colors.btncolor }]} 
        onPress={testNotification}
      >
        <Text style={styles.submitButtonText}>Test Notification</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default ReelUpload;
