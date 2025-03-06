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
      }
    } else {
      Alert.alert("Permission required", "You need to allow access to your photos to upload an image.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const reelData = {
      title: title,
      description: description,
      coverImageUrl: image ? image.uri : null, // If an image is selected, use its URI
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Get the access token

      if (!accessToken) {
        Alert.alert("Error", "You need to be logged in to submit.");
        return;
      }

      const response = await fetch('http://192.168.18.179:8000/reels_upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Attach the JWT token to the request header
        },
        body: JSON.stringify(reelData), // Send the reel data as JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Reel uploaded:", responseData);
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text>Select an Image</Text>
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
    </SafeAreaView>
  );
}


export default ReelUpload;
