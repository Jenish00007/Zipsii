import React, { useContext, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { colors, scale } from '../../utils';
import MainBtn from '../../ui/Buttons/MainBtn';
import { Ionicons } from '@expo/vector-icons';
import {
  TextError,
  TextDefault,
  BackHeader,
  BottomTab,
  Spinner,
} from '../../components';
import { useMutation, gql } from '@apollo/client';
import { addToWhishlist } from '../../apollo/server';
import UserContext from '../../context/User';

const REMOVE_FROM_WHISHLIST = gql`
  ${addToWhishlist}
`;

function Favourite() {
  const navigation = useNavigation();
  const [indexDelete, indexSetterDelete] = useState(-1);
  const { profile, loadingProfile, errorProfile } = useContext(UserContext);
  const [mutate, { loading: loadingMutation }] = useMutation(
    REMOVE_FROM_WHISHLIST
  );

  function emptyView() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/wishlist.png')}
          />
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontSecondColor} bold center>
            {'Your favourite product is missing.'}
          </TextDefault>
        </View>
        <View style={styles.emptyButton}>
          <MainBtn
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('MainLanding')}
            text="Browse Place"
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        <BackHeader
          title={'Favourite'}
          backPressed={() => navigation.goBack()}
          
        />
        {loadingProfile ? (
          <Spinner />
        ) : errorProfile ? (
          <TextError text={'User Context: ' + errorProfile.message} />
        ) : (
          <FlatList
            data={profile ? profile.whishlist : []}
            numColumns={2}
            style={styles.flex}
            key={`flatlist-${2}`}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyView}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.cardWrapper}>
                <View style={styles.cardContainer}>
                  <TouchableOpacity
                    disabled={loadingMutation}
                    activeOpacity={1}
                    onPress={() =>
                      navigation.navigate('ProductDescription', {
                        product: item,
                      })
                    }>
                    <Image
                      source={{
                        uri:
                          item?.image?.[0] ||
                          'https://res.cloudinary.com/ecommero/image/upload/v1597658445/products/su6dg1ufmtfuvrjbhgtj.png',
                      }}
                      resizeMode="cover"
                      style={styles.cardImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.likeButtonContainer}
                    disabled={loadingMutation}
                    onPress={() =>
                      mutate({
                        variables: { productId: item._id },
                      }).then(() => indexSetterDelete(index))
                    }>
                    <Ionicons
                      name="ios-heart-sharp"
                      size={scale(20)}
                      color={colors.greenColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardDetailsWrapper}>
                  <TextDefault
                    textColor={colors.fontMainColor}
                    numberOfLines={1}
                    style={styles.productTitle}>
                    {item.title}
                  </TextDefault>
                  <TextDefault
                    textColor={colors.fontBlue}
                    numberOfLines={1}
                    style={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            )}
          />
        )}
        <BottomTab screen="FAVOURITES" />
      </View>
    </SafeAreaView>
  );
}

export default Favourite;
