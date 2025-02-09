import React, { useState, useContext, useEffect } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { TextDefault } from '../../components'
import { colors, scale } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'




function ProductCard(props) {
  const navigation = useNavigation()

  const [liked, setLiked] = useState(false)

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setLiked(
  //       profile.whishlist
  //         ? !!profile.whishlist.find(whishlist => whishlist._id === props._id)
  //         : false
  //     )
  //   } else {
  //     setLiked(false)
  //   }
  // }, [profile, isLoggedIn])

  const dummyData = [
   
    
  ];

  return (
    <TouchableOpacity
      // disabled={loadingMutation}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('Destination', { product: props })
      }
      style={[styles.cardContainer, props.styles]}>
      
      {/* Multiple Images Carousel */}
      <View style={styles.topCardContainer}>
        <FlatList
          data={props.image} // Assuming props.image is an array of image URLs
          horizontal
          renderItem={({ item }) => (
            <Image
              source={require('../../storage/images/profile4.jpg')}
              style={styles.imgResponsive}
              resizeMode="cover"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.likeContainer}>
          <TouchableOpacity
            // disabled={loadingMutation}
            activeOpacity={0.7}
            // onPress={() => {
            //   if (isLoggedIn) {
            //     mutate({
            //       variables: {
            //         productId: props._id
            //       }
            //     });
            //     setLiked((prev) => !prev);
            //   } else {
            //     navigation.navigate('SignIn');
            //   }
            // }}
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
            {props.title}
          </TextDefault>
          
          <View style={styles.priceContainer}>
            {/* <TextDefault
              style={{ maxWidth: '70%' }}
              numberOfLines={1}
              textColor={colors.fontSecondColor}
              small>
              {props.subCategory.title}
            </TextDefault> */}
            <View style={styles.ratingContainer}>
              {/* <TextDefault
                textColor={colors.fontSecondColor}
                style={{ marginLeft: 2 }}
                small>
                {`${props.reviewData.total} `}
              </TextDefault> */}
            </View>
          </View>
        </View>

        {/* Dummy List Section */}
        <View style={styles.priceContainer}>
          <FlatList
            data={dummyData}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <TextDefault textColor={colors.fontMainColor}>{item.title}</TextDefault>
              </View>
            )}
            keyExtractor={item => item.id}
            
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
