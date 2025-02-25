import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Status() {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [visitedLocation, setVisitedLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [visitedDate, setVisitedDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [authToken, setAuthToken] = useState(''); // state to hold the authentication token

  // Fetch token from AsyncStorage when the component mounts
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error fetching the token from AsyncStorage:', error);
      }
    };
    getToken();
  }, []);

  const handleAddStory = async () => {
    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://192.168.47.179:8000/create-account/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title,
          story,
          visitedLocation,
          imageUrl,
          visitedDate: visitedDateMilliseconds,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setStatusMessage(data.message || 'Story added successfully!');
        setStatusType('success');
        Alert.alert('Success', data.message);
      } else {
        setStatusMessage(data.message || 'Something went wrong.');
        setStatusType('error');
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      setStatusMessage('Error submitting story');
      setStatusType('error');
      Alert.alert('Error', 'There was an issue with the request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Your Travel Story</Text>
      
      {/* Input fields for travel story */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Story"
        value={story}
        onChangeText={setStory}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Visited Location"
        value={visitedLocation}
        onChangeText={setVisitedLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <TextInput
        placeholder="Visited Date (YYYY-MM-DD)"
        value={visitedDate}
        onChangeText={setVisitedDate}
        style={styles.input}
      />

      {/* Submit Button */}
      <Button title="Add Travel Story" onPress={handleAddStory} color="#2e8b57" />

      {/* Status Message */}
      {statusMessage && (
        <Text style={[styles.statusMessage, statusType === 'success' ? styles.success : styles.error]}>
          {statusMessage}
        </Text>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  statusMessage: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});
