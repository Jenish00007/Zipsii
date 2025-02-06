import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserContext from '../../context/User';
import { gql, useMutation } from '@apollo/client';
import styles from './styles';
import { updateUser } from '../../apollo/server';
import { FontAwesome } from '@expo/vector-icons';
import { BackHeader, BottomTab } from '../../components';
import { colors } from '../../utils';

const UPDATEUSER = gql`
  ${updateUser}
`;

function EditingProfile() {
  const route = useRoute();
  const { profile } = useContext(UserContext);
  const navigation = useNavigation();

  const [name, setName] = useState(profile?.name ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [gender, setGender] = useState(profile?.gender ?? '');
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  // Gender options
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  // Handle gender selection
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const [mutate, { loading: loadingMutation }] = useMutation(UPDATEUSER, {
    onCompleted,
    onError
  });

  useEffect(() => {
    if (route.params?.backScreen) {
      setPhoneError('Phone number is required');
    }
  }, [route.params]);

  function onCompleted({ updateUser }) {
    if (updateUser) {
      alert("User's info updated successfully!");
      navigation.goBack();
    }
  }

  function onError(error) {
    alert(error.message);
  }

  function validateFields() {
    let valid = true;
    setNameError(null);
    setPhoneError(null);

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    }

    if (!phone.trim() || phone.length < 10) {
      setPhoneError('Valid phone number is required');
      valid = false;
    }

    return valid;
  }

  function handleSubmit() {
    if (validateFields()) {
      mutate({
        variables: {
          name,
          phone,
          gender,
          is_Active: true
        }
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* BackHeader at the top */}
      <BackHeader title="Edit Profile" backPressed={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.profileTitle}>Complete Your Profile</Text>
          <Text style={styles.profileSubtitle}>
            Don’t worry, only you can see your personal data. No one else will be able to see it.
          </Text>

          <View style={styles.profileImageContainer}>
            <FontAwesome name="user-circle" size={60} color="#CCCCCC" />
            <TouchableOpacity style={styles.editIcon}>
              <FontAwesome name="pencil" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              onBlur={() => {
                if (!name.trim()) setNameError('Name is required');
              }}
            />
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}


             {/* Phone Input */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneContainer}>
              <Text style={styles.countryCode}>+1</Text>

            <TextInput
              style={styles.phoneInput}
                placeholder="Enter phone number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              onBlur={() => {
                if (!phone.trim() || phone.length < 10) {
                  setPhoneError('Valid phone number is required');
                }
              }}
            />
            </View>
            {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

            {/* Gender Dropdown */}
            <Text style={styles.label}>Gender</Text>
            <View>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.dropdownText}>{gender || 'Nothing selected'}</Text>
                <FontAwesome name="caret-down" size={16} color="#777" />
              </TouchableOpacity>
              {isDropdownOpen && (
                <View style={styles.dropdownList}>
                  {genderOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleGenderSelect(option)}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
{/* Submit Button */}
          <TouchableOpacity
            style={styles.completeProfileButton}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BottomTab at the bottom */}
      <BottomTab screen="PROFILE" />
    </SafeAreaView>
  );
}

export default EditingProfile;
