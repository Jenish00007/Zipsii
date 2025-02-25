import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null); // To store the image of a clicked story
  const [modalVisible, setModalVisible] = useState(false); // To control the modal visibility
  const [storyInfo, setStoryInfo] = useState([]);
  const baseUrl = 'http://192.168.47.179:8000'; // Base URL for images

  // Timer to close the modal after 10 seconds
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false); // Close modal after 10 seconds
      }, 10000); // 10000 ms = 10 seconds

      return () => clearTimeout(timer); // Clean up the timer if the component unmounts or modal is closed
    }
  }, [modalVisible]);

  // Fetch data from backend API
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch(baseUrl + '/stories');
        
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // Update image paths by adding the base URL
        const updatedData = data.map(item => ({
          ...item,
          image: baseUrl + item.image, // Concatenate base URL with the relative image path
        }));
        setStoryInfo(updatedData); // Update the state with the modified data
      } catch (error) {
        console.error('Error fetching data: ', error);
        Alert.alert('Error', `Failed to load stories: ${error.message}`);
      }
    };
  
    fetchStoryData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20 }}>
        {storyInfo.map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (data.id === 1) {
                pickImage(); // Opens gallery if "Your Story" is clicked
              } else {
                setImage(data.image); // Sets the image of the clicked story
                setModalVisible(true); // Show the modal with the selected story image
              }
            }}>
            <View style={{ flexDirection: 'column', paddingHorizontal: 8, position: 'relative' }}>
              {data.id === 1 ? (
                <View style={{ position: 'absolute', bottom: 15, right: 10, zIndex: 1 }}>
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#405de6',
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : null}
              <View
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: 'white',
                  borderWidth: 1.8,
                  borderRadius: 100,
                  borderColor: '#c13584',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: data.image }} // Use full URL for the image source
                  style={{
                    resizeMode: 'cover',
                    width: '92%',
                    height: '92%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text style={{ textAlign: 'center', fontSize: 10, opacity: data.id === 0 ? 1 : 0.5 }}>
                {data.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full-Screen Modal to display the image */}
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}>
            <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />

            {/* X Button to close modal */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 50,
                padding: 10,
              }}>
              <Text style={{ fontSize: 20, color: '#333' }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Stories;
