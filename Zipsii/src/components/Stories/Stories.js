import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image, 
  Alert, 
  StyleSheet,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonLoader from '../Loader/SkeletonLoader';
import { base_url } from '../../utils/base_url';
import InstaStory from 'react-native-insta-story';

const defaultStories = [
  {
    user_id: 4,
    user_image: 'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
    user_name: 'Ahmet Çağlar Durmuş',
    stories: [
      {
        story_id: 4,
        story_image: 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 4,
        story_image: 'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
      {
        story_id: 4,
        story_image: 'https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148256082.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 3 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image: 'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
      {
        story_id: 3,
        story_image: 'https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148256082.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 3 swiped'),
      },
    ],
  },
  {
    user_id: 3,
    user_image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'John Doe',
    stories: [
      {
        story_id: 1,
        story_image: 'https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148256082.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image: 'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
];

const Stories = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [storyInfo, setStoryInfo] = useState(defaultStories);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const [seenStories, setSeenStories] = useState(new Set());
  const [showStories, setShowStories] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserStories, setCurrentUserStories] = useState([]);

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
    formData.append('userId', userId);
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
      if (response.ok) {
        console.log('Story uploaded successfully:', data.story);
        const newStory = {
          user_id: userId,
          user_image: data.story.userId.profilePicture || 'https://via.placeholder.com/150',
          user_name: data.story.userId.name || 'User',
          stories: [{
            story_id: data.story._id,
            story_image: data.story.mediaUrl,
            swipeText: 'Swipe to view more',
            onPress: () => console.log('story swiped'),
          }]
        };

        // Check if user already exists in stories
        const existingUserIndex = storyInfo.findIndex(story => story.user_id === userId);
        if (existingUserIndex !== -1) {
          // Update existing user's stories
          setStoryInfo(prev => {
            const updated = [...prev];
            updated[existingUserIndex].stories = [
              ...updated[existingUserIndex].stories,
              newStory.stories[0]
            ];
            return updated;
          });
        } else {
          // Add new user with story
          setStoryInfo(prev => [...prev, newStory]);
        }
      } else {
        console.error('Failed to upload story:', data.message);
      }
    } catch (error) {
      console.error('Error uploading story:', error);
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

  const renderContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setError(null);
              setStoryInfo(defaultStories);
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
        <SkeletonLoader
          count={6}
          circleSize={68}
          textWidth={40}
          textHeight={10}
          containerStyle={styles.skeletonContainer}
        />
      );
    }

    return (
      <View style={styles.container}>
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
              {item.user_id === userId && (
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
        />
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
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
    borderRadius: 100,
  },
  storyName: {
    textAlign: 'center',
    fontSize: 10,
    opacity: 0.5,
    marginTop: 4,
  },
  addStoryButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#c13584',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  addIcon: {
    fontSize: 20,
    color: '#c13584',
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
    color: 'white',
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
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#870E6B',
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
    borderColor: '#ccc',
  },
});

export default Stories;
