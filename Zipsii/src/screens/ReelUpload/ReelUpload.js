import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils";
import { useNavigation } from "@react-navigation/native";

function ReelUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate("LocationPage")} // Navigate to LocationPage
      >
        <Image
          source={require("../../assets/image4.jpg")}
          style={styles.image}
        />
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
      <View style={styles.locationContainer}>
        <TextInput
          style={[styles.input, styles.locationInput]}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <Ionicons
          name="send"
          size={24}
          color="#000"
          style={styles.locationIcon}
        />
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 25,
  },
  input: {
    borderRadius: 25,
    padding: 15,
    marginBottom: 30,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.graycolor,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: "top",
  },
  locationContainer: {
    position: "relative", // Ensures the icon can be placed inside
    marginBottom: 20,
  },
  locationInput: {
    borderRadius: 25,
    padding: 15,
    paddingRight: 50, // Leave space for the icon
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.graycolor,
  },
  locationIcon: {
    position: "absolute",
    right: 20, // Adjust spacing from the right
    top: "35%",
    transform: [{ translateY: -12 }], // Center the icon vertically
  },
  submitButton: {
    backgroundColor: colors.btncolor,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 90,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReelUpload;
