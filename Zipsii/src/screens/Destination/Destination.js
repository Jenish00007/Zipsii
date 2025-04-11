import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, Text, FlatList, TextInput, Image, ScrollView, TouchableOpacity, Linking } from 'react-native'
import styles from './styles'
import BottomTab from '../../components/BottomTab/BottomTab'
import { BackHeader } from '../../components'
import { SimpleLineIcons, MaterialIcons, Ionicons, FontAwesome, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { colors } from '../../utils'
import MainBtn from '../../ui/Buttons/MainBtn'
import { ActivityIndicator } from 'react-native'
import { cardData } from '../CardData/CardData'
import DiscoverByNearest from '../../components/DiscoverByNearest/DiscoverByNearest'
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://192.168.1.6:3030'
function Destination({ route, navigation }) {
  const { image, cardTitle, subtitle } = route.params
  // const [comment, setComment] = useState('')
  const [isExpanded, setIsExpanded] = useState(false) // State to track if the description is expanded
  const [activeTab, setActiveTab] = useState('Main Attractions') // State to track active tab
  const [isFollowing, setIsFollowing] = useState(false) // State to track following status
  const [isSaved, setIsSaved] = useState(false) // State to track saved status
  const [discoverbynearest, setDiscoverbyNearest] = useState([])
  const [loading, setLoading] = useState(true); // Loading state
  const item_id= route.params.product.id;
  const image1 = route.params.product.image;
  // Fetch data from an open-source API (JSONPlaceholder API for demonstration)
  // useEffect(() => {
  //   const fetchDiscoverbyNearest = async() => {
  //     try {
  //       const response = await fetch(baseUrl + '/discover_by_nearest')
  //       const data = await response.json()

  //       // Log to verify the data structure
  //       //  console.log(data);

  //       const formattedData = data.slice(0, 100).map(item => ({
  //         id: item.id,
  //         image: item.image,
  //         title: item.name,
  //         subtitle: item.subtitle
  //       }))

  //       //  console.log(formattedData); // Check the formatted data with image URLs

  //       setDiscoverbyNearest(formattedData)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchDiscoverbyNearest()
  // }, [])

  useEffect(() => {
    const fetchDiscoverbyNearest = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(baseUrl + '/discover_by_nearest');
        const data = await response.json();
        const formattedData = data.map(item => ({
          id: item.id,
          image: item.image,
          title: item.name,
          subtitle: item.subtitle
        }));
        setDiscoverbyNearest(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchDiscoverbyNearest();
  }, []);

  const [destinationData, setDestinationData] = useState(null) // ✅ Store fetched data

  useEffect(() => {
    const fetchDestinationData = async() => {
      try {
        const response = await fetch('http://192.168.1.6:3030/destination')
        const data = await response.json()
        setDestinationData(data) // ✅ Store fetched data in state
      } catch (error) {
        console.error('Error fetching destination data:', error)
      }
    }

    fetchDestinationData()
  }, [])

  // YouTube tutorial videos data
  const [tutorialVideos, setTutorialVideos] = useState([])

  useEffect(() => {
    const fetchTutorialVideos = async() => {
      try {
        const response = await fetch('http://192.168.1.6:3030/tutorialVideos') // Replace with your backend URL
        const data = await response.json()
        setTutorialVideos(data.videos) // Access the 'videos' array from the response
      } catch (error) {
        console.error('Error fetching tutorial videos:', error)
      }
    }

    fetchTutorialVideos()
  }, [])

  // Tab data with descriptions
  const [tabs, setDescriptionexplore] = useState([])

  useEffect(() => {
    const fetchDescriptionexplore = async() => {
      try {
        const response = await fetch('http://192.168.1.6:3030/descriptionexplore') // Replace with your backend URL
        const data = await response.json()
        setDescriptionexplore(data.dataexplore) // Access the 'videos' array from the response
      } catch (error) {
        console.error('Error fetching :', error)
      }
    }

    fetchDescriptionexplore()
  }, [])

  const backPressed = () => {
    navigation.goBack()
  }

  // const handleSendComment = () => {
  //   if (comment.trim()) {
  //     console.log('Comment:', comment)
  //     setComment('')
  //   }
  // }

  const handleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    console.log(isFollowing ? 'Unfollowed' : 'Followed')
  }

  // const handleSave = () => {
  //   setIsSaved(!isSaved)
  //   console.log(isSaved ? 'Removed from saved' : 'Saved to favorites')
  // }
  const handleSave = async () => {
    setLoading(true); // Start loading

    try {
      const accessToken = await AsyncStorage.getItem('accessToken'); // Get the access token
      const response = await fetch(`http://192.168.1.6:3030/update-like-status?id=${item_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Attach the JWT token to the request header
        },
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response

        if (!data.error) {
          Alert.alert('Success', isSaved ? 'Product liked' : 'Product unliked');
          setIsSaved(!isSaved); // Update liked state
        } else {
          Alert.alert('Error', data.message || 'Failed to update like status');
        }
      } else {
        Alert.alert('Error', 'Failed to update like status, please try again.');
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      Alert.alert('Error', 'Failed to update like status due to a network error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMap = () => {
    console.log('Opening Map')
    // Navigate to map screen or open native maps
    // navigation.navigate('MapView', { location: subtitle });
  }

  const handleCall = () => {
    console.log('Making call to destination')
    Linking.openURL('tel:+1234567890')
  }

  const handleOpenWebsite = () => {
    console.log('Opening website/blog')
    // Linking.openURL('https://ootytourism.com');
  }

  const handleOpenVideo = (url) => {
    console.log('Opening YouTube video:', url)
    // Linking.openURL(url);
  }

  // Get the description for the active tab
  const getActiveTabDescription = () => {
    const tab = tabs.find(tab => tab.name === activeTab)
    return tab ? tab.description : ''
  }

  const data = [
    { id: 1, name: 'Botanical Gardens', distance: '2.5 km' },
    { id: 2, name: 'Ooty Lake', distance: '3.1 km' },
    { id: 3, name: 'Nilgiri Mountain Railway', distance: '4.2 km' }
    // More nearby places...
  ]

  const [comment, setComment] = useState('') // Input field state
  const [comments, setComments] = useState([]) // Stores all comments

  // ✅ Fetch Comments from Backend
  // const fetchComments = async() => {
  //   try {
  //     const response = await fetch('http://192.168.1.6:3030/comments')
  //     const data = await response.json()
  //     setComments(data) // Update state
  //   } catch (error) {
  //     console.error('❌ Error fetching comments:', error)
  //   }
  // }

  // ✅ Send Comment to Backend
  // const handleSendComment = async () => {
  //   if (!comment.trim()) return; // Prevent empty comments

  //   try {
  //     console.log('Sending comment:', comment); // Log the comment before sending

  //     const response = await fetch('http://192.168.1.6:3030/comments', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ text: comment }) // Sending the comment as JSON
  //     });

  //     // Log the response status and message
  //     if (!response.ok) {
  //       console.error('Failed to send comment:', response.status, response.statusText);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log('Comment posted successfully:', data.message);

  //     setComment(''); // Clear comment input field
  //     fetchComments(); // Refresh the list of comments
  //   } catch (error) {
  //     console.error('❌ Error sending comment:', error);
  //   }
  // };
  const handleSendComment = async() => {
    if (!comment.trim()) return // Prevent empty comments

    try {
      const response = await fetch('http://192.168.1.6:3030/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Comment posted successfully:', data)
        setComment('') // Clear the comment input
        fetchComments() // Refresh the comments list
      } else {
        const errorData = await response.json()
        console.error('Failed to send comment:', errorData)
      }
    } catch (error) {
      console.error('Error sending comment:', error)
    }
  }

  // const fetchComments = async() => {
  //   try {
  //     const response = await fetch('http://192.168.1.6:3030comments')
  //     if (!response.ok) {
  //       console.error('Failed to fetch comments:', response.status, response.statusText)
  //       return
  //     }
  //     const data = await response.json()
  //     console.log('Fetched comments:', data) // Log the fetched comments
  //     setComments(data) // Update state
  //   } catch (error) {
  //     console.error('❌ Error fetching comments:', error)
  //   }
  // }
  // Example function to fetch comments
  async function fetchComments() {
    try {
      const response = await fetch('http://192.168.1.6:3030/comments')
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data = await response.json()
      console.log('Fetched comments from backend:', data)
      setComments(data) // Update your state with the fetched comments
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  // Call the fetch function when the component mounts or whenever needed
  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color={colors.Zipsii_color} />
    ) : (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image1 }} style={styles.detailImage} />
          <BackHeader
            title="Details"
            backPressed={backPressed}
            style={{ position: 'absolute', top: 50, left: 20, right: 20 }}
          />

          {/* Save icon on the image */}
          <TouchableOpacity
            style={titleStyles.saveButton}
            onPress={handleSave}
          >
            {isSaved
              ? <FontAwesome name="bookmark" size={24} color="#FFFFFF" />
              : <FontAwesome name="bookmark-o" size={24} color="#FFFFFF" />
            }
          </TouchableOpacity>
        </View>

        {/* Detail Container */}
        <View style={styles.detailContainer}>
          {/* Title row with Follow button */}
          <View style={titleStyles.titleRow}>
            <Text style={styles.detailTitle}>{cardTitle}</Text>
            <TouchableOpacity
              style={[
                titleStyles.followButton,
                isFollowing ? titleStyles.followingButton : {}
              ]}
              onPress={handleFollow}
            >
              <Text style={[
                titleStyles.followButtonText,
                isFollowing ? titleStyles.followingButtonText : {}
              ]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Subtitle with map button */}
          <View style={styles.subtitleContainer}>
            <SimpleLineIcons name="location-pin" size={18} color={colors.fontThirdColor} />
            <Text style={styles.detailSubtitle}>{subtitle}</Text>

            {/* Ratings */}
            <TouchableOpacity onPress={() => navigation.navigate('Review')} style={[styles.ratingsContainer, { marginLeft: 10 }]}>
              <AntDesign name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingsText}>4.7</Text>
              <Text style={styles.ratingsCount}>(2498)</Text>
            </TouchableOpacity>

            {/* Map button */}
            <TouchableOpacity style={titleStyles.mapButton} onPress={handleOpenMap}>
              <MaterialIcons name="map" size={18} color={colors.Zipsii_color || '#3498db'} />
              <Text style={titleStyles.mapButtonText}>Map</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Action Icons */}
          <View style={actionStyles.actionContainer}>
            <TouchableOpacity style={actionStyles.actionItem} onPress={handleCall}>
              <View style={actionStyles.actionIconContainer}>
                <Feather name="phone-call" size={20} color="#FFFFFF" />
              </View>
              <Text style={actionStyles.actionText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={actionStyles.actionItem} onPress={handleOpenWebsite}>
              <View style={actionStyles.actionIconContainer}>
                <FontAwesome5 name="blog" size={20} color="#FFFFFF" />
              </View>
              <Text style={actionStyles.actionText}>Blog</Text>
            </TouchableOpacity>

            <TouchableOpacity style={actionStyles.actionItem} onPress={() => navigation.navigate('MakeSchedule')}>
              <View style={actionStyles.actionIconContainer}>
                <AntDesign name="calendar" size={20} color="#FFFFFF" />
              </View>
              <Text style={actionStyles.actionText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={actionStyles.actionItem} onPress={handleSave}>
              <View style={actionStyles.actionIconContainer}>
                <FontAwesome name={isSaved ? 'bookmark' : 'bookmark-o'} size={20} color="#FFFFFF" />
              </View>
              <Text style={actionStyles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* About Destination */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>{destinationData?.title}</Text>
            <Text style={styles.aboutText}>
              {destinationData?.shortDescription}{' '}
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
              </TouchableOpacity>
            </Text>
            {isExpanded && <Text style={styles.expandedText}>{destinationData?.fullDescription}</Text>}
          </View>

          {/* Horizontal Tab Menu */}
          {/* <View style={tabStyles.tabSection}>
            <Text style={styles.aboutTitle}>Explore</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tabStyles.tabScrollContainer}
            >
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    tabStyles.tab,
                    activeTab === tab.name && tabStyles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab.name)}
                >
                  <Text
                    style={[
                      tabStyles.tabText,
                      activeTab === tab.name && tabStyles.activeTabText
                    ]}
                  >
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView> */}

          {/* Tab Content Description */}
          {/* <View style={tabStyles.tabContent}>
              <Text style={tabStyles.tabDescription}>{getActiveTabDescription()}</Text>
            </View>
          </View> */}

          <View style={tabStyles.tabSection}>
            <Text style={styles.aboutTitle}>Explore</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tabStyles.tabScrollContainer}
            >
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    tabStyles.tab,
                    activeTab === tab.name && tabStyles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab.name)}
                >
                  <Text
                    style={[
                      tabStyles.tabText,
                      activeTab === tab.name && tabStyles.activeTabText
                    ]}
                  >
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Tab Content Description */}
            <View style={tabStyles.tabContent}>
              <Text style={tabStyles.tabDescription}>
                {getActiveTabDescription()}
              </Text>
            </View>
          </View>

          {/* Discover Row */}
          <View style={styles.discoverRow}>
            <Text style={styles.discoverText}>Discover by Nearest</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscoverPlace')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Scroll for Cards */}
          {/* <View style={styles.discoverRow}>
          <TextDefault style={styles.discoverText}>Discover by Nearest</TextDefault>
          <TouchableOpacity onPress={() => navigation.navigate('DiscoverPlace')}>
            <TextDefault style={styles.viewAllText}>View All</TextDefault>
          </TouchableOpacity>
        </View> */}
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            data={discoverbynearest}
            renderItem={({ item, index }) => (
              <DiscoverByNearest styles={styles.itemCardContainer} {...item} />
            )}
          />

          {/* YouTube Tutorial Videos Section */}
          {/* <View style={videoStyles.videoSection}>
            <Text style={styles.aboutTitle}>Tutorial Videos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={videoStyles.videoScrollContainer}
            >
              {Array.isArray(tutorialVideos) && tutorialVideos.map((video) => (
                <TouchableOpacity
                  key={video.id}
                  style={videoStyles.videoCard}
                  onPress={() => handleOpenVideo(video.url)}
                >
                  <View style={videoStyles.thumbnailContainer}> */}
          {/* Using a placeholder for the image in this example */}
          {/* <View style={videoStyles.thumbnailPlaceholder}>
                      <FontAwesome name="youtube-play" size={30} color="#FF0000" />
                    </View> */}
          {/* <Image source={{ uri: video.thumbnail }} style={videoStyles.thumbnail} /> */}
          {/* <View style={videoStyles.playButton}>
                      <Ionicons name="play" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                  <Text style={videoStyles.videoTitle} numberOfLines={2}>{video.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}

          {/* youtube preview */}
          <View style={videoStyles.videoSection}>
            <Text style={styles.aboutTitle}>Tutorial Videos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={videoStyles.videoScrollContainer}
            >
              {Array.isArray(tutorialVideos) && tutorialVideos.map((video) => (
                <TouchableOpacity
                  key={video._id} // Use video._id instead of video.id
                  style={videoStyles.videoCard}
                  onPress={() => handleOpenVideo(video.url)}
                >
                  <View style={videoStyles.thumbnailContainer}>
                    {/* Placeholder icon */}
                    <View style={videoStyles.thumbnailPlaceholder}>
                      <FontAwesome name="youtube-play" size={30} color="#FF0000" />
                    </View>
                    <View style={videoStyles.playButton}>
                      <Ionicons name="play" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                  <Text style={videoStyles.videoTitle} numberOfLines={2}>{video.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Comments */}
          <View style={styles.commentContainer}>
            <Text style={styles.commentTitle}>Leave a comment</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Say something..."
                placeholderTextColor={colors.fontThirdColor}
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View>
            {comments.map(comment => (
              <View key={comment._id}>
                <Text>{comment.text}</Text>
              </View>
            ))}
          </View> */}
          <View style={stylescomment.commentSection}>
  {comments.map((comment) => (
    <View key={comment._id} style={stylescomment.commentCard}>
      <View style={stylescomment.commentHeader}>
        <FontAwesome name="user-circle" size={20} color="#555" />
        <Text style={stylescomment.commentUser}>{comment.username || "User"}</Text>
      </View>
      <Text style={stylescomment.commentText}>{comment.text}</Text>
    </View>
  ))}
</View>


          <MainBtn text="Make a schedule" onPress={() => navigation.navigate('MakeSchedule')} style={{ marginTop: 20 }} />
        </View>
      </ScrollView>
    )}
      {/* Bottom Navigation */}
      <BottomTab screen="WhereToGo" style={styles.bottomTab} />
   
    </View>
  )
}

const stylescomment = StyleSheet.create({
  commentSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  commentCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2, // Shadow for Android
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUser: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 18,
  },
});


// Additional styles for tabs
const tabStyles = {
  tabSection: {
    marginTop: 20
  },
  tabScrollContainer: {
    paddingVertical: 10
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0'
  },
  activeTab: {
    backgroundColor: colors.Zipsii_color
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabText: {
    color: '#FFF'
  },
  tabContent: {
    marginTop: 15,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  tabDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555'
  }
}

// Additional styles for title and subtitle rows
const titleStyles = {
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.Zipsii_color,
    alignItems: 'center',
    justifyContent: 'center'
  },
  followingButton: {
    backgroundColor: '#E0E0E0'
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 12
  },
  followingButtonText: {
    color: '#555555'
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.Zipsii_color
  },
  mapButtonText: {
    color: colors.Zipsii_color || '#3498db',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500'
  },
  saveButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8
  }
}

// Styles for action icons
const actionStyles = {
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.Zipsii_color,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  actionText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500'
  }
}

// Styles for YouTube videos
const videoStyles = {
  videoSection: {
    marginTop: 20
  },
  videoScrollContainer: {
    paddingVertical: 10
  },
  videoCard: {
    width: 180,
    marginRight: 15
  },
  thumbnailContainer: {
    width: 180,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    position: 'relative'
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0'
  },
  thumbnail: {
    width: '100%',
    height: '100%'
  },
  playButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333'
  }
}

export default Destination
