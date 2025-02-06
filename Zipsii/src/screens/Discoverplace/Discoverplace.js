import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components/Headers/Headers'; // Import BackHeader component
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import { colors } from '../../utils';
import { TextDefault } from '../../components';
import { textStyles } from '../../utils';
// import { cardData } from '../../data/Carddata';

function DiscoverPlace({ navigation }) {
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };

  // Data for 8 containers
  const cardData = [
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/p/AF1QipOwcynxRpNebAQYvogATP7Bg7j0k45R21LWYlCN=s1360-w1360-h1020-rw',
      title: 'Niladri Reservoir',
      subtitle: 'Tekergat, Sunamgnj',
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/p/AF1QipMU8xPHOakcdPjjT4bNIiIxuTiv6pQ7DRWxIGfn=s1360-w1360-h1020-rw',
      title: 'Casa Las Tirtugas',
      subtitle: 'Av Damero, Mexico',
    },
    {
      id: 3,
      image: 'https://lh3.googleusercontent.com/p/AF1QipOha67_zF0k8T5CBZyH_IZ6F_e_gGTQaF5Fkx4e=s1360-w1360-h1020-rw',
      title: 'Beautiful Beach',
      subtitle: 'Sunny Coastline, USA',
    },
    {
      id: 4,
      image: 'https://lh3.googleusercontent.com/p/AF1QipMmcWo4Ciw8yex9le9t1hdcvZDQFZVY40JrcjSW=s1360-w1360-h1020-rw',
      title: 'Mountain Retreat',
      subtitle: 'High Peaks, Nepal',
    },
    {
      id: 5,
      image: 'https://lh3.googleusercontent.com/p/AF1QipOSjf8POP7YG7I4HqzI7ZSQKcvrq09XQPwNn8Gw=s1360-w1360-h1020-rw',
      title: 'Historic Castle',
      subtitle: 'Edinburgh, Scotland',
    },
    {
      id: 6,
      image: 'https://lh3.googleusercontent.com/p/AF1QipMmCQKX_-bj12teoTW4iYA8ZkD_r4fHLIIojNpv=s1360-w1360-h1020-rw',
      title: 'Desert Oasis',
      subtitle: 'Sahara, Africa',
    },
    {
      id: 7,
      image: 'https://lh3.googleusercontent.com/p/AF1QipPPqbWVw3ssObZCFJWGBJako_PzCvbjSwep6bLl=s1360-w1360-h1020-rw',
      title: 'Rainforest Escape',
      subtitle: 'Amazon, Brazil',
    },
    {
      id: 8,
      image: 'https://lh3.googleusercontent.com/p/AF1QipPfFlUBfQB8n4b1bG9bW7WwuXh97i3HxE1KOoY3=s1360-w1360-h1020-rw',
      title: 'Snowy Cabin',
      subtitle: 'Alps, Switzerland',
    },
  ];

  return (
    
    <View style={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />
      
      {/* BackHeader component */}
      <BackHeader backPressed={backPressed}  title="Discover Place"/> 

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
