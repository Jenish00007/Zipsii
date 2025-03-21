import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [storyInfo, setStoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewedStoryId, setViewedStoryId] = useState(null);
  const baseUrl = 'http://192.168.1.14:8000';

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

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  // Fetch the viewed story IDs from AsyncStorage
  const loadViewedStories = async () => {
    try {
      const viewedStories = await AsyncStorage.getItem('viewedStories');
      return viewedStories ? JSON.parse(viewedStories) : [];
    } catch (error) {
      console.error('Error loading viewed stories: ', error);
      return [];
    }
  };

  // Store the viewed story IDs in AsyncStorage
  const saveViewedStory = async (storyId) => {
    try {
      const viewedStories = await loadViewedStories();
      if (!viewedStories.includes(storyId)) {
        viewedStories.push(storyId);
        await AsyncStorage.setItem('viewedStories', JSON.stringify(viewedStories));
      }
    } catch (error) {
      console.error('Error saving viewed story: ', error);
    }
  };

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(baseUrl + '/stories');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const viewedStories = await loadViewedStories();

        const updatedData = data.map(item => ({
          ...item,
          image: baseUrl + item.image,
          viewed: viewedStories.includes(item.id), // Mark as viewed based on AsyncStorage
        }));
        setStoryInfo(updatedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
        Alert.alert('Error', `Failed to load stories: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  const handleStoryPress = async (data) => {
    if (data.id === 1) {
      pickImage();
    } else {
      setImage(data.image);
      setModalVisible(true);

      // Mark the currently viewed story and save it in AsyncStorage
      setViewedStoryId(data.id);
      await saveViewedStory(data.id);

      // Update the storyInfo to reflect the viewed state
      setStoryInfo(prevStoryInfo =>
        prevStoryInfo.map(item =>
          item.id === data.id ? { ...item, viewed: true } : item
        )
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#c13584" />
        </View>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20 }}>
          {storyInfo.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStoryPress(data)}>
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
                    borderColor: data.viewed ? 'transparent' : '#c13584',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: data.image }}
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
      )}

      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
