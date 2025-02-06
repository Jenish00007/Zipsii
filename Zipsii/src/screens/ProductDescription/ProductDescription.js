import React, { useState, useContext, useEffect } from 'react'
import { View, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import styles from './styles'
import {
  BackHeader,
  BottomTab,
  TextDefault,
  Spinner,
  FlashMessage,
  TextError
} from '../../components'
import MainBtn from '../../ui/Buttons/MainBtn'
import VariationSection from './VariationSection/VariationSection'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, alignment, scale } from '../../utils'
import { MaterialIcons } from '@expo/vector-icons'
import UserContext from '../../context/User'
import ConfigurationContext from '../../context/Configuration'
import { useQuery, useMutation, gql } from '@apollo/client';
import { productReviews} from '../../apollo/server';
import ImageViewer from 'react-native-image-zoom-viewer'
import { addToWhishlist } from '../../apollo/server';


const ADD_TO_WHISHLIST= gql`
  ${addToWhishlist}
`

const REVIEWS = gql`
  ${productReviews}
`

function ProductDescription(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalShow, modalShowSetter] = useState(false);
  const [imageIndex, imageIndexSetter] = useState(0);
  const product = route.params?.product ?? null;
  const { addCartItem, isLoggedIn, profile } = useContext(UserContext);
  const configuration = useContext(ConfigurationContext);
  const [carouselImage, setCarouselImage] = useState(product.image[0] ?? null);
  const [price, priceSetter] = useState(null);
  const [stockAvailability, setStockAvailability] = useState(false);
  const [attributes, attributeSetter] = useState([]);
  const [kgCount, setKgCount] = useState(1);
  const [liked, setLiked] = useState(false); // Like state
  const [mutate, { loading: loadingMutation }] = useMutation(ADD_TO_WHISHLIST);

  const { data, loading, error } = useQuery(REVIEWS, {
    variables: { productId: product._id },
  });
  const zoomImages = product?.image.map(item => {
    return { url: item }
  })



  // Increment KG
  const handleIncrement = () => {
    setKgCount((prev) => prev + 1);
  };

  // Decrement KG
  const handleDecrement = () => {
    if (kgCount > 1) {
      setKgCount((prev) => prev - 1);
    }
  };


  const toggleLike = async () => {
    if (!isLoggedIn) {
      FlashMessage({ message: 'Please login to like products' });
      return;
    }

    try {
      const response = await mutate({
        variables: { productId: product._id, userId: profile._id },
      });
      if (response?.data?.addToWhishlist?.success) {
        setLiked((prev) => !prev); // Toggle like
        FlashMessage({
          message: liked ? 'Removed from Whishlist' : 'Added to Whishlist',
        });
      } else {
        FlashMessage({ message: 'Something went wrong. Try again!' });
      }
    } catch (err) {
      FlashMessage({ message: err.message });
    }
  };




  function didFocus() {
    const itemAttributes = product?.attributes.length
      ? product.attributes.map(attribute => {
        return {
          ...attribute,
          options: attribute.options.filter(item => item.stock > 0)[0] ?? null
        }
      })
      : []
    if (itemAttributes.length) {
      setStockAvailability(itemAttributes.every(attribute => attribute.options))
    } else {
      setStockAvailability(false)
    }
    attributeSetter(itemAttributes)
  }
  useEffect(() => {
    didFocus()
  }, [])

  if (product === null) {
    navigation.goBack()
    return null
  }

  useEffect(() => {
    if (product) calculateprice()
  }, [product])

  function calculateprice() {
    let totalPrice = 0
    const mainPrice = product?.price ?? 0
    attributes.map(attribute => (totalPrice += attribute.options.price))
    totalPrice += mainPrice
    priceSetter(totalPrice)
  }

  function formatDate(date) {
    date = Number(date)
    date = new Date(date)
    return date.toDateString()
  }

  function handleAttributes(id, option) {
    if (option.stock > 0) {
      const attribute = attributes
      const objIndex = attribute.findIndex(item => item._id === id)
      attribute[objIndex].options = option
      attributeSetter([...attribute])
      calculateprice()
    } else {
      FlashMessage({ message: 'Out Of Stock' })
    }
  }

  function ListHeader() {
    return (
      <>
        <View style={alignment.MBlarge}>
          <View style={styles.caroselContainer}>
            <View style={styles.caroselSubContainer}>

             {/* Like Container */}
             <TouchableOpacity
                style={styles.likeContainer}
                onPress={toggleLike}>
                <MaterialIcons
                  name={liked ? 'favorite' : 'favorite-border'}
                  size={scale(20)}
                  color={liked ? colors.red : colors.black}
                />
              </TouchableOpacity>
              
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => modalShowSetter(true)}
            style={styles.caroselMainImgCnt}>
            <Image
              source={product && { uri: carouselImage }}
              resizeMode="cover"
              style={styles.imgResponsive}
            />
          </TouchableOpacity>


          

          {/* KG Selector Inside caroselContainer */}
          <View style={[styles.kgSelectorContainer, { zIndex: 10 }]}>
  {/* <TextDefault textColor={colors.fontMainColor} bold>
    Select Weight (KG)
  </TextDefault> */}
  <View style={styles.kgSelectorButtons}>
    <TouchableOpacity
      style={[styles.kgButton, {backgroundColor: colors.grayLinesColor }]} // Debug styling
      onPress={handleDecrement}
    >
      <MaterialIcons name="remove" size={scale(10)} color={colors.black} />
    </TouchableOpacity>
    <TextDefault textColor= {colors.fontMainColor}H5 style={styles.kgCount} bold>{kgCount} KG</TextDefault>
    <TouchableOpacity
      style={[styles.kgButton, {backgroundColor: colors.greenColor}]} // Debug styling
      onPress={handleIncrement}
    >
      <MaterialIcons name="add" size={scale(10)} color={colors.black} />
    </TouchableOpacity>
  </View>
</View>



          <View style={styles.scrollViewStyle}>
            <FlatList
              style={{ flex: 1 }}
              horizontal
              data={product?.image ?? []}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    imageIndexSetter(index)
                    setCaroselImage(item)
                  }}
                  style={styles.caroselItems}>
                  <Image
                    source={{ uri: item }}
                    resizeMode="cover"
                    style={styles.imgResponsive}
                  />
                </TouchableOpacity>

                
              )}
            />
            <View style={styles.caroselTitleContainer}>
                <TextDefault textColor={colors.fontMainColor} numberOfLines={2}>
                  {product.title}
                </TextDefault>
              </View>
              <View style={styles.caroselPriceContainer}>
                <View style={styles.caroselPriceSubContainer}>
                  <TextDefault
                    numberOfLines={2}
                    textColor={colors.fontBlue}
                    bold>
                    {configuration.currencySymbol}{' '}
                    {parseFloat(price).toFixed(2)}
                  </TextDefault>
                </View>


                <View style={styles.ratingStarsContainer}>
  {Array(5)
    .fill(1)
    .map((_, index) => (
      <MaterialIcons
        key={index}
        name="star"
        size={scale(15)} // Adjust size as needed
        color={index < (product.rating ?? 0) ? 'blue' : colors.fontPlaceholder}
      />
    ))}
  <TextDefault style={styles.ratingText}>
    ({(product.rating ?? 0).toFixed(1)}/5)
  </TextDefault>
</View>

{/* KG Selector
 <View style={styles.kgSelectorContainer}>
            <TextDefault textColor={colors.fontMainColor} bold>
              Select Weight (KG)
            </TextDefault>
            <View style={styles.kgSelectorButtons}>
              <TouchableOpacity
                style={styles.kgButton}
                onPress={handleDecrement}
              >
                <MaterialIcons name="remove" size={scale(20)} color={colors.black} />
              </TouchableOpacity>
              <TextDefault style={styles.kgCount}>{kgCount} KG</TextDefault>
              <TouchableOpacity
                style={styles.kgButton}
                onPress={handleIncrement}
              >
                <MaterialIcons name="add" size={scale(20)} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View> */}

                
              </View>
          </View>


          
          <View style={styles.spacer} />
          <View style={styles.variationContainer}>
            {/* {stockAvailability &&
              product.attributes.map((variation, index) => (
                <VariationSection
                  key={variation._id}
                  variation={variation}
                  selected={attributes[index].options._id}
                  handleAttributes={handleAttributes}
                />
              ))} */}
            <TextDefault bold style={styles.smallSpacer}>
              {'Description'}
            </TextDefault>
            <TextDefault
              textColor={colors.fontSecondColor}
              style={styles.smallSpacer}>
              {product.description}
            </TextDefault>
          </View>
        </View>
        <View style={styles.reviewHeader}>
          <TextDefault textColor={colors.fontMainColor} bold>
            Reviews
            <TextDefault textColor={colors.fontMainColor} small>
              {' '}
              ({data.productReviews?.total}){' '}
            </TextDefault>
          </TextDefault>
        </View>
      </>
    )
  }
  function ListFooter() {
    return (
      <>
        {stockAvailability ? (
          <View style={styles.shoppingCartContainer}>
            <MainBtn
              loading={false}
              onPress={async() => {
                await addCartItem(
                  product._id,
                  product.title,
                  product.image[0],
                  1,
                  price,
                  attributes
                )
                navigation.navigate('ShoppingCart')
              }}
              text="Add to Cart"
              style={styles.cartbtn}
            />
          </View>
        ) : (
          <View style={styles.outOfStockContainer}>
            <TextDefault textColor={colors.white} H4>
              {'Out Of Stock'}
            </TextDefault>
          </View>
        )}
      </>
    )
  }
  function noReview() {
    return (
      <TextDefault style={alignment.PTxSmall} center>
        {'No review yet! !'}
      </TextDefault>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader
          title="Details"
          backPressed={() => props.navigation.goBack()}
        />
        {error ? (
          <TextError text={error.message} />
        ) : loading || !data.productReviews?.reviews ? (
          <Spinner />
        ) : (
          <FlatList
            data={data.productReviews?.reviews}
            style={styles.mainScrollViewContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentStyle}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponentStyle={alignment.MTlarge}
            ItemSeparatorComponent={() => <View style={styles.line} />}
            ListHeaderComponent={<ListHeader />}
            ListFooterComponent={<ListFooter />}
            ListEmptyComponent={noReview()}
            // refreshing={networkStatus === 4}
            // onRefresh={() => refetch()}
            renderItem={({ item }) => (
              <View style={styles.review}>
                <View style={styles.reviewerContainer}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.fontMainColor}
                    style={{ width: '75%' }}>
                    {item.order.user.name}
                  </TextDefault>
                  <View style={styles.ratingContainer}>
                    {Array(5)
                      .fill(1)
                      .map((value, index) => {
                        if (index < item.rating) {
                          return (
                            <MaterialIcons
                              key={index}
                              name="star"
                              size={scale(10)}
                              color={'blue'}
                            />
                          )
                        } else if (index >= item.rating && index < 5) {
                          return (
                            <MaterialIcons
                              key={index}
                              name="star"
                              size={scale(10)}
                              color={colors.fontPlaceholder}
                            />
                          )
                        }
                      })}
                  </View>
                </View>
                <TextDefault
                  style={styles.dateReview}
                  textColor={colors.fontSecondColor}
                  numberOfLines={1}
                  small>
                  {formatDate(item.createdAt)}
                </TextDefault>
                <TextDefault
                  style={styles.textReview}
                  textColor={colors.fontSecondColor}
                  small>
                  {item.description}
                </TextDefault>
              </View>
            )}
          />
        )}
        <BottomTab screen="HOME" />
        <Modal animationType="slide" visible={modalShow} transparent={true}>
          <ImageViewer
            imageUrls={zoomImages}
            backgroundColor={colors.themeBackground}
            enableSwipeDown={true}
            onCancel={() => {
              modalShowSetter(prev => !prev)
            }}
            renderIndicator={() => null}
            renderArrowLeft={() => (
              <MaterialIcons
                name="chevron-left"
                size={scale(30)}
                color={colors.black}
              />
            )}
            renderArrowRight={() => (
              <MaterialIcons
                name="chevron-right"
                size={scale(30)}
                color={colors.black}
              />
            )}
            loadingRender={() => <Spinner />}
            index={imageIndex}
          />
          <View style={styles.headerZoom}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.crossBtn}
              onPress={() => {
                modalShowSetter(prev => !prev)
              }}>
              <MaterialIcons
                name="close"
                size={scale(25)}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default ProductDescription
