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
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { base_url } from '../../utils/base_url';

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [storyInfo, setStoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewedStoryId, setViewedStoryId] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(); // assuming userId is fetched from authentication
  const [currentStoryIndex, setCurrentStoryIndex] = useState({}); // Store current index of stories for each user

  const loadViewedStories = async () => {
    try {
      const viewedStories = await AsyncStorage.getItem('viewedStories');
      return viewedStories ? JSON.parse(viewedStories) : [];
    } catch (error) {
      console.error('Error loading viewed stories: ', error);
      return [];
    }
  };

  const loadUserId = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;

      if (parsedUser && parsedUser._id) {
        setUserId(parsedUser._id);
      } else {
        console.error('User not found or user ID is missing');
      }
    } catch (error) {
      console.error('Error loading user ID:', error);
    }
  };

  useEffect(() => {
    loadUserId();
  }, []);

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

  const uploadStory = async (imageAsset) => {
    const formData = new FormData();
    formData.append('media', {
      uri: imageAsset.uri,
      name: imageAsset.uri.split('/').pop(),
      type: 'image/jpeg',
    });
    formData.append('userId', userId); // Add other necessary data here
    const accessToken = await AsyncStorage.getItem('accessToken');
  
    try {
      const response = await fetch(`${base_url}/story/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      const stories = data.stories?.stories || [];

      if (response.ok) {
        console.log('Story uploaded successfully:', data.story);
        setStoryInfo(prevState => {
          const updatedStory = {
            ...data.story,
            userId: data.story._id,  // Set the userId for the new story
          };
        
          // Add the new story at the start of the list, or you can use push to add it at the end
          return [updatedStory, ...prevState];
        });
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
  
      // Retrieve the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      // Fetch stories from the API
      const response = await fetch(`${base_url}/story/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Error response from server:', text);
        setError(text);
        return;
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
  
        if (!Array.isArray(data.stories) || data.stories.length === 0) {
          console.log('No stories found or data.stories is not an array.');
          return;
        }
  
        const stories = data.stories[0]?.stories || [];
  
        const viewedStories = await loadViewedStories();
  
        const updatedData = stories.map(story => ({
          id: story._id,
          image: story.mediaUrl,
          viewed: viewedStories.includes(story._id),
          userId: story.userId._id,
        }));
  
        setStoryInfo(updatedData);
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        setError(text);
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoryData();
  }, []);

  const handleStoryPress = async (data) => {
    if (!data || !data.id) {
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

  const deleteStory = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${base_url}/story/${viewedStoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Story deleted successfully:', data);
        setStoryInfo(prevStoryInfo =>
          prevStoryInfo.filter(item => item.id !== viewedStoryId)
        );
        setModalVisible(false); // Close modal after deletion
      } else {
        console.error('Failed to delete story:', data.message);
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }
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
            <Text>No Image</Text>
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

    const groupedStories = storyInfo.reduce((acc, story) => {
      if (!acc[story.userId]) {
        acc[story.userId] = [];
      }
      acc[story.userId].push(story);
      return acc;
    }, {});

    return (
      <FlatList
        data={Object.keys(groupedStories)}
        renderItem={({ item: userId }) => {
          const userStories = groupedStories[userId];
          const currentStoryIndex = 0;
          const currentStory = userStories[currentStoryIndex];
  
          return (
            <View style={{ flexDirection: 'column', paddingVertical: 5, alignItems: 'center', justifyContent: 'center' }}>
              <FlatList
                data={[currentStory]}
                renderItem={renderStoryItem}
                keyExtractor={(story) => story.id ? story.id.toString() : ''}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: '#870E6B',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 0,
                  marginTop: -40,
                  marginLeft: 40
                }}
                onPress={pickImage}
              >
                <Icon name="add" size={20} color="white" />
              </TouchableOpacity>
              <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Your Story</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
        {storyInfo.filter(story => story.userId === userId).length === 0 ? (
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
              marginLeft: 12,
            }}>
            <Entypo name="circle-with-plus" style={{ fontSize: 30, color: '#c13584' }} />
          </TouchableOpacity>
        ) : null}  
        {renderContent()}
      </View>

      <Modal transparent={false} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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

            <TouchableOpacity
              onPress={deleteStory}
              style={{
                position: 'absolute',
                bottom: 20,
                backgroundColor: '#e74c3c',
                padding: 10,
                borderRadius: 50,
              }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Stories;
