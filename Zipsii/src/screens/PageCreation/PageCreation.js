import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../../utils";

const ProfilePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const handleSave = () => {
    console.log("Profile updated");
    navigation.goBack();
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
        <TouchableOpacity style={styles.imageUploadButton}>
          <Image
            source={require("../../assets/profileimage.jpg")}
            style={styles.profileImage}
          />
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

      {/* Switch to Professional Account */}
      <TouchableOpacity style={styles.professionalButton}>
        <Text style={styles.professionalButtonText}>
          Switch to Professional Account
        </Text>
      </TouchableOpacity>

      {/* Private Information Section */}
      <View style={styles.inputWrapper}>
        <Text style={styles.sectionTitle}>Private Information</Text>

        {/* Email */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.divider} />
          </View>
        </View>

        {/* Phone */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Phone</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.divider} />
          </View>
        </View>

        {/* Gender */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.inputFieldContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your gender"
              value={gender}
              onChangeText={setGender}
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
  professionalButton: {
    marginBottom: 30,
    alignItems: "center",
  },
  professionalButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.blueColor,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
});

export default ProfilePage;
