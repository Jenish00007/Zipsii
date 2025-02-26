import React, { useState } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { TextDefault } from '../../components';
import { colors, scale } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ProductCard(props) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('Destination', { product: props })}
      style={[styles.cardContainer, props.styles]}>
      
      {/* Multiple Images Carousel */}
      <View style={styles.topCardContainer}>
        {/* Ensure that image is rendered properly */}
        <Image
          source={{ uri: props.image }} // Render each image correctly
          style={styles.imgResponsive} // Make image responsive
          resizeMode="cover" // Ensure it fills its container
        />

        <View style={styles.likeContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setLiked((prev) => !prev)} // Toggle like
          >
            <Ionicons
              name={liked ? 'ios-bookmark' : 'ios-bookmark-outline'}
              size={scale(20)}
              color={colors.greenColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Info Section */}
      <View style={styles.botCardContainer}>
        <View style={styles.botSubCardContainer}>
          <TextDefault numberOfLines={1} textColor={colors.fontMainColor}>
            {props.name}
          </TextDefault>

          <View style={styles.priceContainer}>
            {/* Add more product information if needed */}
            <View style={styles.ratingContainer}>
              {/* You can add star ratings or review counts here */}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;
