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
  const baseUrl = 'http://192.168.1.24:3030';
  const [userId, setUserId] = useState(null); // assuming userId is fetched from authentication

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
        uploadStory(result.assets[0]);
      }
    } else {
      Alert.alert("Permission required", "You need to allow access to your photos to upload an image.");
    }
  };

  // Function to upload the story to the backend
  const uploadStory = async (imageAsset) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageAsset.uri,
      name: imageAsset.uri.split('/').pop(), // Get the image name
      type: 'image/jpeg', // Assume it's an image
    });
    formData.append('userId', userId); // You can add any other necessary data here

    try {
      const response = await fetch(baseUrl + '/upload-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Story uploaded successfully:', data.story);
        // Optionally, update storyInfo state here to reflect the new story
        setStoryInfo(prevState => [data.story, ...prevState]); // Add the uploaded story to the top of the list
      } else {
        console.error('Failed to upload story:', data.message);
      }
    } catch (error) {
      console.error('Error uploading story:', error);
    }
  };

  const fetchStoryData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(baseUrl + '/stories');

      if (!response.ok) {
        console.log('Failed to fetch stories.');
        return;
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        console.error('No stories found.');
        return;
      }

      const viewedStories = await loadViewedStories();

      if (Array.isArray(data)) {
        const updatedData = data.map(item => ({
          ...item,
          image: item.image ? baseUrl + item.image : '', // Safe concatenation
          viewed: viewedStories.includes(item.id),
        }));
        setStoryInfo(updatedData);
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (!data || Object.keys(data).length === 0) {
      console.log('Data is empty!');
      return;
    }

    setImage(data.image);
    setModalVisible(true);
    setViewedStoryId(data.id);
    await saveViewedStory(data.id);
    setStoryInfo(prevStoryInfo =>
      prevStoryInfo.map(item =>
        item.id === data.id ? { ...item, viewed: true } : item
      )
    );
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleStoryPress(item)}>
      <View style={{ flexDirection: 'column', paddingHorizontal: 8, position: 'relative' }}>
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
          {item.image ? (
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
          ) : (
            <Text>No Image</Text> // Default text if no image is available
          )}
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
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
        {/* The round button with the plus sign on the left side */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 68,
            height: 68,
            backgroundColor: 'white',
            borderWidth: 1.8,
            borderRadius: 100,
            borderColor: '#c13584',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20, // Space between the add button and the stories
          }}>
          <Entypo name="circle-with-plus" style={{ fontSize: 30, color: '#c13584' }} />
        </TouchableOpacity>

        {/* Render the stories next to the "Add Story" button */}
        {renderContent()}
      </View>

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
