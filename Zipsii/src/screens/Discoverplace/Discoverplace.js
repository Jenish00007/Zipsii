import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import baseStyles from '../../utils/styles'
import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers'; 
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons'; 
import { colors } from '../../utils';
import { TextDefault } from '../../components';
import { textStyles } from '../../utils';
import { base_url } from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

// Merge the styles
const styles = {
  ...baseStyles,
  contentContainer: {
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.fontMainColor,
    marginLeft: 2,
  },
  selectedTripButton: {
    backgroundColor: colors.primary,
  },
  selectedTripButtonText: {
    color: colors.Zypsii_color,
  },
};

//const baseUrl = 'https://admin.zypsii.com'; 
function DiscoverPlace({ navigation }) {
  const backPressed = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchPage');
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileDashboard');
  };

  const [cardData, setCardData] = useState([]);
  const [selectedTripType, setSelectedTripType] = useState('Friendship Trip');
  const [loading, setLoading] = useState(false);

  const tripTypes = ['Friendship Trip', 'Honeymoon Trip', 'Weekend Trip'];

  const getApiParams = (tripType) => {
    switch (tripType) {
      case 'Friendship Trip':
        return { type: 'restaurant', keyword: 'pizza', opennow: true };
      case 'Honeymoon Trip':
        return { type: 'hotel', keyword: 'resort', opennow: true };
      case 'Weekend Trip':
        return { type: 'attraction', keyword: 'park', opennow: true };
      default:
        return { type: 'restaurant', keyword: 'pizza', opennow: true };
    }
  };

  const fetchCardData = async (tripType) => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      const params = getApiParams(tripType);
      const queryString = new URLSearchParams(params).toString();
      
      const response = await fetch(`${base_url}/schedule/places/getNearest?${queryString}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const responseData = await response.json();
      
      // Check if responseData exists and has the expected structure
      if (!responseData || !responseData.data) {
        console.warn('Unexpected API response structure:', responseData);
        setCardData([]);
        return;
      }

      // Ensure data is an array before using slice
      const dataArray = Array.isArray(responseData.data) ? responseData.data : [];
      
      const formattedData = dataArray.map(item => ({
        id: item._id || item.image,
        image: item.image,
        title: item.name,
        subtitle: item.address || 'No address',
        rating: parseFloat(item.rating) || 0,
        location: item.location,
        distance: item.distanceInKilometer ? parseFloat(item.distanceInKilometer).toFixed(1) : null
      }));
      
      setCardData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCardData([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData(selectedTripType);
  }, [selectedTripType]);

  const handleTripTypePress = (tripType) => {
    setSelectedTripType(tripType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />
      
      <BackHeader 
        backPressed={backPressed} 
        title="Discover Place"
        onNotificationPressed={handleNotificationPress}
        onSearchPressed={handleSearchPress}
        onProfilePressed={handleProfilePress}
      /> 

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{'Which trip would you love to go on?'}</Text>
        <View style={styles.buttonRow}>
          {tripTypes.map((label) => (
            <TouchableOpacity 
              key={label} 
              style={[
                styles.tripButton,
                selectedTripType === label && styles.selectedTripButton
              ]}
              onPress={() => handleTripTypePress(label)}
            >
              <Text style={[
                styles.tripButtonText,
                selectedTripType === label && styles.selectedTripButtonText
              ]}>{label}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={selectedTripType === label ? colors.Zypsii_color : colors.fontMainColor}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Card List */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.grayContainer}>
          {cardData.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Destination', {
                  id: card.id,
                  image: card.image,
                  cardTitle: card.title,
                  subtitle: card.subtitle,
                  rating: card.rating,
                  location: card.location,
                  distance: card.distance
                })
              }
            >
              <View style={styles.likeIconContainer}>
                <MaterialCommunityIcons name="heart-outline" size={20} color={colors.errorColor} />
              </View>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <View style={styles.contentContainer}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                {card.rating && (
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={14} color={colors.Zypsii_color} />
                    <Text style={styles.ratingText}>{card.rating}</Text>
                    <Text style={[styles.ratingText, { marginLeft: 8 }]}>{card.distance}</Text>
                  </View>
                )}
                <View style={styles.subtitleContainer}>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab screen="WhereToGo" style={styles.bottomTab} />
    </View>
  );
}

export default DiscoverPlace;
