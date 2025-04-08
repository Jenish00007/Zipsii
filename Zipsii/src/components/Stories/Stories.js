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

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);  // Confirmation modal
  const [storyInfo, setStoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewedStoryId, setViewedStoryId] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = 'http://192.168.1.6:3030'; // Ensure this is the correct base URL.
  const [userId, setUserId] = useState(); // assuming userId is fetched from authentication
  const [storyToDelete, setStoryToDelete] = useState(null);  // Store the story to delete

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
      const response = await fetch(baseUrl + '/story/upload', {
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
  
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      const response = await fetch(baseUrl + '/story/all', {
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

  const deleteStory = async (storyId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${baseUrl}/story/${storyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log('Story deleted successfully');
        setStoryInfo(prevStories => prevStories.filter(story => story.id !== storyId));
        setConfirmationModalVisible(false);  // Close confirmation modal
      } else {
        const data = await response.json();
        console.error('Error deleting story:', data.message);
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
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

        {/* Delete button */}
        {item.userId === userId && (
          <TouchableOpacity
            onPress={() => {
              setStoryToDelete(item.id);  // Set story to delete
              setConfirmationModalVisible(true);  // Show confirmation modal
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'red',
              borderRadius: 20,
              padding: 5,
            }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Delete</Text>
          </TouchableOpacity>
        )}
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
        keyExtractor={(item) => item.id ? item.id.toString() : ''}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderContent()}

      {/* Confirmation Modal for deleting story */}
      <Modal
        visible={confirmationModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Are you sure you want to delete this story?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => setConfirmationModalVisible(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: '#ccc',
                  borderRadius: 5,
                }}
              >
                <Text>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (storyToDelete) {
                    deleteStory(storyToDelete);  // Delete story when confirmed
                  }
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: 'red',
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white' }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Stories;
