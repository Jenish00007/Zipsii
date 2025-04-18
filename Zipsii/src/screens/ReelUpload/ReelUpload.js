import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
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

  const pickImage = async () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: () => openCamera(),
        },
        {
          text: "Gallery",
          onPress: () => openGallery(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } else {
      Alert.alert("Permission required", "You need to allow camera access to take photos.");
    }
  };

  const openGallery = async () => {
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
       }
     } else {
       Alert.alert("Permission required", "You need to allow access to your photos to upload an image.");
     }
   };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append('caption', title);
    formData.append('description', description);
    formData.append('media', {
      uri: image.uri,
      name: image.uri.split('/').pop(),
      type: image.type || 'image/jpeg', // default if type not available
    });
  
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        Alert.alert("Error", "You need to be logged in to submit.");
        return;
      }

      const response = await fetch(`${base_url}/post/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
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
      {/* Add Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.fontMainColor} />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Create Reel</Text> */}
      </View>

      <ScrollView>
        {/* Image Selection Section */}
        <TouchableOpacity 
          style={styles.imageContainer} 
          onPress={pickImage}
        >
        {image ? (
            <Image 
              source={{ uri: image.uri }} 
              style={styles.selectedImage} 
            />
        ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="camera" size={50} color={colors.btncolor} />
              <Text style={styles.placeholderText}>Tap to add photo</Text>
            </View>
        )}
      </TouchableOpacity>

        {/* Title Input */}
        <View style={styles.inputContainer}>
      <TextInput
            style={styles.titleInput}
            placeholder="Add a title..."
            placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
      <TextInput
            style={styles.descriptionInput}
            placeholder="Add a description..."
            placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
            numberOfLines={4}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Share</Text>
      </TouchableOpacity>

      {/* Test Notification Button */}
      {/* <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: colors.btncolor }]} 
        onPress={testNotification}
      >
        <Text style={styles.submitButtonText}>Test Notification</Text>
      </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ReelUpload;
