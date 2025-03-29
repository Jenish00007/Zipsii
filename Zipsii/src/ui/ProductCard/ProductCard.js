import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import styles from './styles';
import { colors, scale } from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function ProductCard(props) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch user data from AsyncStorage on component mount

  const handleLikeToggle = async () => {
    setLoading(true); // Start loading

    try {
      // Toggle the like status
      const newLikedStatus = !liked;
      const postData = {
        productId: props.id,  // Assuming `id` is the product identifier
        liked: newLikedStatus,
      };
      const accessToken = await AsyncStorage.getItem('accessToken'); // Get the access token

      // Make the POST request to update like status
      const response = await fetch('http://172.20.10.5:8000/update-like-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Attach the JWT token to the request header
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response

        if (!data.error) {
          // Successful like/unlike update
          Alert.alert('Success', newLikedStatus ? 'Product liked' : 'Product unliked');
          setLiked(newLikedStatus); // Update liked state
        } else {
          // Show error if any error occurred from the backend
          Alert.alert('Error', data.message || 'Failed to update like status');
        }
      } else {
        // If response is not OK (e.g., 400 or 500 error)
        Alert.alert('Error', 'Failed to update like status, please try again.');
      }
    } catch (error) {
      // Network or fetch error
      console.error('Network or fetch error:', error);
      Alert.alert('Error', 'Failed to update like status due to a network error');
    } finally {
      // Set loading state to false after completion
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('Destination', { product: props })}
      style={[styles.cardContainer, props.styles]}>
      
      {/* Product Image */}
      <View style={styles.topCardContainer}>
        <Image
          source={{ uri: props.image }}  // Assuming `props.image` contains the product image URL
          style={styles.imgResponsive}
          resizeMode="cover"
        />

        {/* Like Button */}
        <View style={styles.likeContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleLikeToggle} // Trigger like/unlike functionality
            disabled={loading}  // Disable while loading
          >
            <Ionicons
              name={liked ? 'ios-bookmark' : 'ios-bookmark-outline'}
              size={scale(20)}
              color={colors.greenColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Information */}
      <View style={styles.botCardContainer}>
        <View style={styles.botSubCardContainer}>
          <Text style={{ color: colors.fontMainColor }} numberOfLines={1}>
            {props.name}
          </Text>

          <View style={styles.priceContainer}>
            {/* Optionally add more product information like price or rating */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;
