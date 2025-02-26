import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';

import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components';
import { SimpleLineIcons, MaterialIcons, Ionicons, FontAwesome, Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../utils';
import MainBtn from '../../ui/Buttons/MainBtn';
import { AntDesign } from '@expo/vector-icons';
import { cardData } from "../CardData/CardData";

function Destination({ route, navigation }) {
  const { image, cardTitle, subtitle } = route.params;
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the description is expanded
  const [activeTab, setActiveTab] = useState('Main Attractions'); // State to track active tab
  const [isFollowing, setIsFollowing] = useState(false); // State to track following status
  const [isSaved, setIsSaved] = useState(false); // State to track saved status
 
  // YouTube tutorial videos data
  const tutorialVideos = [
    {
      id: 1,
      title: 'Exploring Ooty',
      thumbnail: 'https://example.com/ooty-thumbnail1.jpg',
      url: 'https://www.youtube.com/watch?v=abcdef123456',
    },
    {
      id: 2,
      title: 'Best Places in Ooty',
      thumbnail: 'https://example.com/ooty-thumbnail2.jpg',
      url: 'https://www.youtube.com/watch?v=ghijkl789012',
    },
    {
      id: 3,
      title: 'Ooty Travel Guide',
      thumbnail: 'https://example.com/ooty-thumbnail3.jpg',
      url: 'https://www.youtube.com/watch?v=mnopqr345678',
    },
  ];

  // Tab data with descriptions
  const tabs = [
    {
      id: 1,
      name: 'Main Attractions',
      description: 'Ooty offers several must-visit attractions including the beautiful Botanical Gardens, Ooty Lake where you can enjoy boating, and the historic Nilgiri Mountain Railway.'
    },
    {
      id: 2,
      name: 'Squares',
      description: 'Explore Ooty\'s charming town squares, where you can experience local culture, shop for souvenirs, and enjoy street food among colonial architecture.'
    },
    {
      id: 3,
      name: 'Museums',
      description: 'Visit the Tea Museum to learn about Ooty\'s famous tea production, or explore the Tribal Research Centre Museum to understand the local indigenous cultures.'
    },
    {
      id: 4,
      name: 'Churches',
      description: 'St. Stephen\'s Church and St. Thomas Church are beautiful examples of colonial architecture with stained glass windows and peaceful surroundings.'
    },
    {
      id: 5,
      name: 'Hidden Spots',
      description: 'Discover off-the-beaten-path locations like Avalanche Lake, hidden tea estates, and lesser-known viewpoints that offer spectacular panoramic views without the crowds.'
    }
  ];

  const backPressed = () => {
    navigation.goBack();
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('Comment:', comment);
      setComment('');
    }
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? 'Unfollowed' : 'Followed');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(isSaved ? 'Removed from saved' : 'Saved to favorites');
  };

  const handleOpenMap = () => {
    console.log('Opening Map');
    // Navigate to map screen or open native maps
    // navigation.navigate('MapView', { location: subtitle });
  };

  const handleCall = () => {
    console.log('Making call to destination');
    // Linking.openURL('tel:+1234567890');
  };

  const handleOpenWebsite = () => {
    console.log('Opening website/blog');
    // Linking.openURL('https://ootytourism.com');
  };

  const handleOpenVideo = (url) => {
    console.log('Opening YouTube video:', url);
    // Linking.openURL(url);
  };

  // Get the description for the active tab
  const getActiveTabDescription = () => {
    const tab = tabs.find(tab => tab.name === activeTab);
    return tab ? tab.description : '';
  };

        const data = [
          { id: 1, name: 'Botanical Gardens', distance: '2.5 km' },
          { id: 2, name: 'Ooty Lake', distance: '3.1 km' },
          { id: 3, name: 'Nilgiri Mountain Railway', distance: '4.2 km' },
          // More nearby places...
        ];
     
  
  return (
    <View style={styles.container}>
      {/* Destination Details */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.detailImage} />
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
            {isSaved ? 
              <FontAwesome name="bookmark" size={24} color="#FFFFFF" /> : 
              <FontAwesome name="bookmark-o" size={24} color="#FFFFFF" />
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
            <TouchableOpacity onPress={() => navigation.navigate("Review")} style={[styles.ratingsContainer, { marginLeft: 10 }]}>
              <AntDesign name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingsText}>4.7</Text>
              <Text style={styles.ratingsCount}>(2498)</Text>
            </TouchableOpacity>
            
            {/* Map button */}
            <TouchableOpacity style={titleStyles.mapButton} onPress={handleOpenMap}>
              <MaterialIcons name="map" size={18} color={colors.Zipsii_color || "#3498db"} />
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
                <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={20} color="#FFFFFF" />
              </View>
              <Text style={actionStyles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* About Destination */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About Destination</Text>
            <Text style={styles.aboutText}>
            Ooty is a popular hill station located in the southern part of India.{" "}
              <TouchableOpacity onPress={handleReadMore}>
                <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
              </TouchableOpacity>
            </Text>

            {/* Show more content if expanded */}
            {isExpanded && (
              <Text style={styles.expandedText}>
                Ooty is a popular hill station located in the southern part of India, known for its scenic views, tea plantations, and pleasant weather. The town offers various tourist attractions, such as the Ooty Lake, Botanical Gardens, and the Nilgiri Mountain Railway, making it a perfect destination for nature lovers and adventure enthusiasts.
              </Text>
            )}
          </View>

          {/* Horizontal Tab Menu */}
          <View style={tabStyles.tabSection}>
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
            </ScrollView>
            
            {/* Tab Content Description */}
            <View style={tabStyles.tabContent}>
              <Text style={tabStyles.tabDescription}>{getActiveTabDescription()}</Text>
            </View>
          </View>


           {/* Discover Row */}
           <View style={styles.discoverRow}>
                    <Text style={styles.discoverText}>Discover by Nearest</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("DiscoverPlace")}>
                      <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                  </View>
          
                  {/* Horizontal Scroll for Cards */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cardData.map((card) => (
                      <View key={card.id} style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                      </View>
                    ))}
                  </ScrollView>

          {/* YouTube Tutorial Videos Section */}
          <View style={videoStyles.videoSection}>
            <Text style={styles.aboutTitle}>Tutorial Videos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={videoStyles.videoScrollContainer}
            >
              {tutorialVideos.map(video => (
                <TouchableOpacity 
                  key={video.id} 
                  style={videoStyles.videoCard}
                  onPress={() => handleOpenVideo(video.url)}
                >
                  <View style={videoStyles.thumbnailContainer}>
                    {/* Using a placeholder for the image in this example */}
                    <View style={videoStyles.thumbnailPlaceholder}>
                      <FontAwesome name="youtube-play" size={30} color="#FF0000" />
                    </View>
                    {/* <Image source={{ uri: video.thumbnail }} style={videoStyles.thumbnail} /> */}
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

          <MainBtn text="Make a schedule" onPress={() => navigation.navigate('MakeSchedule')} style={{ marginTop: 20 }} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab screen="WhereToGo" style={styles.bottomTab} />
    </View>
  );
}

// Additional styles for tabs
const tabStyles = {
  tabSection: {
    marginTop: 20,
  },
  tabScrollContainer: {
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  activeTab: {
    backgroundColor: colors.Zipsii_color,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  tabContent: {
    marginTop: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  tabDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  }
};

// Additional styles for title and subtitle rows
const titleStyles = {
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.Zipsii_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: '#E0E0E0',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 12,
  },
  followingButtonText: {
    color: '#555555',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.Zipsii_color,
  },
  mapButtonText: {
    color: colors.Zipsii_color || '#3498db',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  saveButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  }
};

// Styles for action icons
const actionStyles = {
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.Zipsii_color ,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  }
};

// Styles for YouTube videos
const videoStyles = {
  videoSection: {
    marginTop: 20,
  },
  videoScrollContainer: {
    paddingVertical: 10,
  },
  videoCard: {
    width: 180,
    marginRight: 15,
  },
  thumbnailContainer: {
    width: 180,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    position: 'relative',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
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
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  }
};

export default Destination;