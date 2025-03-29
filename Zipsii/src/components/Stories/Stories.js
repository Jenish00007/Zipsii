import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Alert, 
  Modal 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [storyInfo, setStoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewedStoryId, setViewedStoryId] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = 'http://172.20.10.5:8000';

  // 1. First define all helper functions
  const loadViewedStories = async () => {
    try {
      const viewedStories = await AsyncStorage.getItem('viewedStories');
      return viewedStories ? JSON.parse(viewedStories) : [];
    } catch (error) {
      console.error('Error loading viewed stories: ', error);
      return [];
    }
  };

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

  // 2. Then define the data fetching function
  const fetchStoryData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(baseUrl + '/stories');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const viewedStories = await loadViewedStories();

      const updatedData = data.map(item => ({
        ...item,
        image: baseUrl + item.image,
        viewed: viewedStories.includes(item.id),
      }));
      
      setStoryInfo(updatedData);
    } catch (err) {
      console.error('Error fetching stories:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Then use the functions in useEffect
  useEffect(() => {
    fetchStoryData();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleStoryPress = async (data) => {
    if (data.id === 1) {
      pickImage();
    } else {
      setImage(data.image);
      setModalVisible(true);
      setViewedStoryId(data.id);
      await saveViewedStory(data.id);
      setStoryInfo(prevStoryInfo =>
        prevStoryInfo.map(item =>
          item.id === data.id ? { ...item, viewed: true } : item
        )
      );
    }
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleStoryPress(item)}>
      <View style={{ flexDirection: 'column', paddingHorizontal: 8, position: 'relative' }}>
        {item.id === 1 ? (
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
            borderColor: item.viewed ? 'transparent' : '#c13584',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: item.image }}
            style={{
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
              borderRadius: 100,
              backgroundColor: 'orange',
            }}
          />
        </View>
        <Text style={{ textAlign: 'center', fontSize: 10, opacity: item.id === 0 ? 1 : 0.5 }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <SkeletonLoader 
          count={6} 
          circleSize={68}
          textWidth={40}
          textHeight={10}
          containerStyle={{ paddingHorizontal: 8 }}
        />
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Error: {error}</Text>
          <TouchableOpacity 
            onPress={fetchStoryData}
            style={{ marginTop: 10, padding: 10, backgroundColor: '#ddd' }}
          >
            <Text>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={storyInfo}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderContent()}

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