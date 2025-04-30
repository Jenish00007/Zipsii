import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image, 
  Alert, 
  StyleSheet,
  Button,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { base_url } from '../../utils/base_url';
import InstaStory from 'react-native-insta-story';

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [storyInfo, setStoryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const [seenStories, setSeenStories] = useState(new Set());
  const [showStories, setShowStories] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserStories, setCurrentUserStories] = useState([]);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [myStories, setMyStories] = useState([]);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGVmZDUxN2I4M2FmOGVmNmFiZmEzYyIsImVtYWlsIjoiamVudUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkplbnVfWllfNTM1IiwiaWF0IjoxNzQ1OTA5NDA3LCJleHAiOjE3NDYxNjg2MDd9.v7rIck922X0ugdvyoOwCaFc62dl3LJzSed5ZCEE09k4 need to hordcode this token ';
    
      const response = await fetch('https://admin.zypsii.com/story/list', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      const data = await response.json();
      
      if (data.status) {
        // Transform the API response to match the format expected by InstaStory
        const transformedStories = data.data.stories.map(story => ({
          user_id: story._id,
          user_image: story.thumbnailUrl,
          user_name: story.title,
          stories: [{
            story_id: story._id,
            story_image: story.videoUrl,
            swipeText: story.description,
            onPress: () => console.log('story swiped'),
          }]
        }));
        
        setStoryInfo(transformedStories);
      } else {
        setError(data.message || 'Failed to fetch stories');
      }
    } catch (error) {
      setError('Error fetching stories: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

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

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
        uploadStory(result.assets[0]);
        setShowImagePickerModal(false);
      }
    } else {
      Alert.alert("Permission required", "You need to allow access to your photos to upload an image.");
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
        uploadStory(result.assets[0]);
        setShowImagePickerModal(false);
      }
    } else {
      Alert.alert("Permission required", "You need to allow access to your camera to take a photo.");
    }
  };

  const uploadStory = async (imageAsset) => {
    const formData = new FormData();
    formData.append('title', 'Just for testing 1');
    formData.append('description', 'for test the data');
    formData.append('videoUrl', imageAsset.uri);
    formData.append('thumbnailUrl', imageAsset.uri);

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGVmZDUxN2I4M2FmOGVmNmFiZmEzYyIsImVtYWlsIjoiamVudUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkplbnVfWllfNTM1IiwiaWF0IjoxNzQ1OTA5NDA3LCJleHAiOjE3NDYxNjg2MDd9.v7rIck922X0ugdvyoOwCaFc62dl3LJzSed5ZCEE09k4';

    try {
      const response = await fetch(`${base_url}/shorts/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Just for testing 1',
          description: 'for test the data',
          videoUrl: imageAsset.uri,
          thumbnailUrl: imageAsset.uri
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Story uploaded successfully:', data);
        // Refresh the stories list after successful upload
        fetchStories();
      } else {
        console.error('Failed to upload story:', data.message);
        Alert.alert('Error', data.message || 'Failed to upload story');
      }
    } catch (error) {
      console.error('Error uploading story:', error);
      Alert.alert('Error', 'Failed to upload story. Please try again.');
    }
  };

  const updateSeenStories = ({ story: { story_id } }) => {
    setSeenStories((prevSet) => {
      prevSet.add(story_id);
      return prevSet;
    });
  };

  const handleSeenStories = async (item) => {
    console.log(item);
    const storyIds = [];
    seenStories.forEach((storyId) => {
      if (storyId) storyIds.push(storyId);
    });
    if (storyIds.length > 0) {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        await fetch(`${base_url}/story/mark-seen`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storyIds }),
        });
        seenStories.clear();
      } catch (error) {
        console.error('Error marking stories as seen:', error);
      }
    }
  };

  const handleStoryPress = (user) => {
    // Create a new array with only the selected user's stories
    const userStories = [{
      ...user,
      stories: [...user.stories] // Create a new array of stories to avoid reference issues
    }];
    
    setSelectedUser(user);
    setCurrentUserStories(userStories);
    setShowStories(true);
  };

  const renderStoryItem = ({ item }) => {
    // Check if the user has any stories
    const hasStories = item.stories && item.stories.length > 0;
    
    return (
      <TouchableOpacity 
        onPress={() => hasStories && handleStoryPress(item)}
        disabled={!hasStories}
      >
        <View style={styles.storyItemContainer}>
          <View style={[
            styles.storyCircle,
            !hasStories && styles.disabledStoryCircle
          ]}>
            <Image
              source={{ uri: item.user_image }}
              style={styles.storyImage}
            />
          </View>
          <Text style={styles.storyName}>{item.user_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderYourStory = () => {
    const hasStories = myStories.length > 0;
    return (
      <TouchableOpacity 
        style={styles.yourStoryContainer}
        onPress={() => setShowImagePickerModal(true)}
      >
        <View style={[styles.storyCircle, hasStories && styles.storyCircleActive]}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user's profile picture
            style={styles.storyImage}
          />
          {!hasStories && (
            <View style={styles.addIconContainer}>
              <Ionicons name="add-circle" size={24} color="#fff" />
            </View>
          )}
        </View>
        <Text style={styles.storyUsername}>Your Story</Text>
      </TouchableOpacity>
    );
  };

  const renderImagePickerModal = () => (
    <Modal
      visible={showImagePickerModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowImagePickerModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={openCamera}
          >
            <Ionicons name="camera" size={24} color="#000" />
            <Text style={styles.modalButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={pickImage}
          >
            <Ionicons name="images" size={24} color="#000" />
            <Text style={styles.modalButtonText}>Choose Story from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => {
              setShowImagePickerModal(false);
              navigation.navigate('ReelUpload');
            }}
          >
            <Ionicons name="videocam" size={24} color="#000" />
            <Text style={styles.modalButtonText}>Upload Reel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => {
              setShowImagePickerModal(false);
              navigation.navigate('ReelUpload');
            }}
          >
            <Ionicons name="image" size={24} color="#000" />
            <Text style={styles.modalButtonText}>Upload Post</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setShowImagePickerModal(false)}
          >
            <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setError(null);
              fetchStories();
            }}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.storiesContainer}>
          <SkeletonLoader
            count={6}
            circleSize={68}
            textWidth={40}
            textHeight={10}
            containerStyle={styles.skeletonContainer}
          />
        </View>
      );
    }

    if (storyInfo.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No stories available</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {renderImagePickerModal()}
        <View style={styles.storiesContainer}>
          {renderYourStory()}
          <InstaStory
            data={storyInfo}
            duration={10}
            onStart={(item) => {
              console.log('Story started:', item);
              if (item.user_id === userId) {
                setShowStories(true);
                setSelectedUser(item);
              }
            }}
            onClose={() => {
              handleSeenStories();
              setShowStories(false);
              setSelectedUser(null);
            }}
            onStorySeen={updateSeenStories}
            renderCloseComponent={({ onPress }) => (
              <View style={styles.closeContainer}>
                <Button title="Share" onPress={() => console.log('Share story')} />
                <Button title="X" onPress={onPress} />
              </View>
            )}
            renderTextComponent={({ item, profileName }) => (
              <View style={styles.textContainer}>
                <Text style={styles.profileName}>{profileName}</Text>
                {item.user_id === userId && !item.stories?.length && (
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.addStoryButton}
                  >
                    <Entypo name="circle-with-plus" style={styles.addIcon} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            style={styles.instaStory}
            onAddStoryPress={() => {
              if (userId) {
                pickImage();
              }
            }}
            showAddStoryButton={true}
            addStoryButtonStyle={styles.addStoryButton}
            addStoryButtonIcon={<Entypo name="circle-with-plus" style={styles.addIcon} />}
            unPressedBorderColor="#A60F93"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  storyItemContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    position: 'relative',
    alignItems: 'center',
  },
  storyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#A60F93',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  storyImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  storyName: {
    textAlign: 'center',
    fontSize: 10,
    color: '#A60F93',
    marginTop: 4,
  },
  addStoryButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#A60F93',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  addIcon: {
    fontSize: 20,
    color: '#A60F93',
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textContainer: {
    padding: 10,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  profileName: {
    color: '#A60F93',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instaStory: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#A60F93',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#A60F93',
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
  },
  skeletonContainer: {
    paddingHorizontal: 8,
  },
  disabledStoryCircle: {
    opacity: 0.5,
    borderColor: '#A60F93',
  },
  yourStoryContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyCircleActive: {
    borderColor: '#A60F93',
  },
  storyUsername: {
    fontSize: 12,
    color: '#A60F93',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#A60F93',
    borderRadius: 100,
    padding: 0.1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#A60F93',
  },
  cancelButton: {
    borderBottomWidth: 0,
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#A60F93',
  },
  storiesContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#A60F93',
  },
});

export default Stories;
