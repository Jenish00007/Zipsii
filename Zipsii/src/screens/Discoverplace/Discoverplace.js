import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../utils/styles'
import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers'; 
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons'; 
import { colors } from '../../utils';
import { TextDefault } from '../../components';
import { textStyles } from '../../utils';
const baseUrl = 'http://172.20.10.5:8000'; 
function DiscoverPlace({ navigation }) {
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };

  // State to hold the dynamic data
  const [cardData, setCardData] = useState([]);

  // Fetch data from an open-source API (JSONPlaceholder API for demonstration)
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(baseUrl + '/places');
        const data = await response.json();
  
        // Log to verify the data structure
        console.log(data);
  
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          image: baseUrl + item.image, // Make sure the URL is correct
          title: item.name,
          subtitle: item.subtitle,
        }));
  
        console.log(formattedData); // Check the formatted data with image URLs
  
        setCardData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchCardData();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />
      
      {/* BackHeader component */}
      <BackHeader backPressed={backPressed} title="Discover Place"/> 

      {/* Header Container (Title + Button Row) */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{'Which trip would you love to go on?'}</Text>
        <View style={styles.buttonRow}>
          {['Friendship Trip', 'Honeymoon Trip', 'Weekend Trip'].map((label, index) => (
            <TouchableOpacity key={index} style={styles.tripButton}>
              <Text style={styles.tripButtonText}>{label}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={colors.fontMainColor}
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
                  image: card.image,
                  cardTitle: card.title,
                  subtitle: card.subtitle,
                })
              }
            >
              <View style={styles.likeIconContainer}>
                <MaterialCommunityIcons name="heart-outline" size={20} color={colors.errorColor} />
              </View>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.subtitleContainer}>
                <SimpleLineIcons name="location-pin" size={15} color={colors.fontThirdColor} />
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
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
