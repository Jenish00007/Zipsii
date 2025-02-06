import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DummyScreen = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState('th-large'); // Default active icon

  // Local images for each icon
  const images = {
    'th-large': [
      { id: '1', uri: require('../../assets/image1.jpg') },
      { id: '2', uri: require('../../assets/image2.jpg') },
      { id: '3', uri: require('../../assets/image3.jpg') },
      { id: '4', uri: require('../../assets/image4.jpg') },
    ],
    briefcase: [], // No images for this icon
    'play-circle': [], // No images for this icon
  };

  // Generate placeholders if no images are available
  const imageData =
    images[activeIcon].length > 0
      ? images[activeIcon]
      : Array(6)
          .fill(null)
          .map((_, index) => ({ id: `${index + 1}`, isPlaceholder: true }));

  return (
    <View style={styles.container}>
     <View style={styles.protractorShape} />
     <View style={styles.backgroundCurvedContainer} />
        {/* Header Section */}
        <View style={styles.header}>
          {/* Icons Row */}
        <View style={styles.topIconsRow}>
          <View style={styles.circle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.circle}>
            <TouchableOpacity onPress={() => console.log('Share button pressed')}>
            <MaterialCommunityIcons name="share-all-outline"  size={24} color={colors.white} />
            </TouchableOpacity>
          </View> */}
        </View>
        </View>

       {/* Profile Section */}
<TouchableOpacity
  style={styles.profileContainer}
  onPress={() => navigation.navigate('PageCreation')}
>
  <Image
    source={require('../../assets/profileimage.jpg')} // Local profile image
    style={styles.profileImage}
  />
  <Text style={styles.name}>Leonardo</Text>
  <Text style={styles.description}>Just be yourself, there is no one better</Text>
</TouchableOpacity>


        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Posts</Text>
            <Text style={styles.statNumber}>100</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Followers</Text>
            <Text style={styles.statNumber}>120k</Text>
          </View>
          <View style={styles.statLast}>
            <Text style={styles.statLabel}>Following</Text>
            <Text style={styles.statNumber}>0</Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Gray Line */}
        <View style={styles.separatorLine} />

        {/* Icons Section */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={[
              styles.iconBox,
              activeIcon === 'th-large' && styles.activeIconBox,
            ]}
            onPress={() => setActiveIcon('th-large')}
          >
            <Icon name="th-large" size={30} color="#870E6B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconBox,
              activeIcon === 'briefcase' && styles.activeIconBox,
            ]}
            onPress={() => setActiveIcon('briefcase')}
          >
            <Icon name="briefcase" size={30} color="#870E6B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconBox,
              activeIcon === 'play-circle' && styles.activeIconBox,
            ]}
            onPress={() => setActiveIcon('play-circle')}
          >
            <Icon name="play-circle" size={30} color="#870E6B" />
          </TouchableOpacity>
        </View>

        <View style={{ position: 'absolute', top: 460, width: '100%', zIndex: 2 }}>
  <FlatList
    data={imageData}
    keyExtractor={(item) => item.id}
    numColumns={3}
    renderItem={({ item }) =>
      item.isPlaceholder ? (
        <View style={styles.placeholderBox} />
      ) : (
        <Image source={item.uri} style={styles.gridImage} />
      )
    }
    contentContainerStyle={[styles.gridContainer, { flexGrow: 1 }]} 
  />
</View>


      
    </View>
  );
};

export default DummyScreen;
