import React from 'react';
import { View, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';
import CategoryCard from '../../ui/CategoryCard/CategoryCard';
import { BottomTab, TextDefault, TextError, Spinner, Hexagon } from '../../components';
import { verticalScale, scale, colors, alignment } from '../../utils';
import ProductCard from '../../ui/ProductCard/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { HeaderBackButton } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Image } from 'react-native'; // Add this to your imports
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useSchedule } from '../../context/ScheduleContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Stories from '../../components/Stories/Stories';
import Post from '../../components/Posts/Post';




// import HexagonBlue from '../../components/Hexagon';

const caroselImage = [
  require('../../assets/images/MainLanding/slide1.jpg'),
  require('../../assets/images/MainLanding/slide2.jpg'),
  require('../../assets/images/MainLanding/slide3.jpg'),
  require('../../assets/images/MainLanding/slide4.jpg'),
  require('../../assets/images/MainLanding/slide5.jpg'),
  require('../../assets/images/MainLanding/slide6.jpg')
];

const dummyData = [
  { id: '1', title: 'Item 1', description: 'This is a description of item 1' },
  { id: '2', title: 'Item 2', description: 'This is a description of item 2' },
  { id: '3', title: 'Item 3', description: 'This is a description of item 3' },
  { id: '4', title: 'Item 4', description: 'This is a description of item 4' },
  { id: '5', title: 'Item 5', description: 'This is a description of item 5' }
];
const videoShorts = [
  { id: '1', url: 'https://www.youtube.com/shorts/8OLAi6Eba98?feature=share' },
  { id: '2', url: 'https://www.youtube.com/shorts/NsOfgaUD92Q?feature=share' },
  { id: '3', url: 'https://www.youtube.com/shorts/QyGx_Z2tbTA?feature=share' }
];

const dummyDatacategory = [
  { id: '1', cardLabel: 'Beach', icon: require('../../assets/th1.jpeg') },
  { id: '2', cardLabel: 'Mountains', icon: require('../../assets/th1.jpeg') },
  { id: '3', cardLabel: 'Forest', icon: require('../../assets/th1.jpeg') },
  { id: '4', cardLabel: 'Desert', icon: require('../../assets/th1.jpeg') },
  { id: '5', cardLabel: 'City', icon: require('../../assets/th1.jpeg') },
];

function MainLanding(props) {
  const navigation = useNavigation();

  const { scheduleData } = useSchedule();

  // Button state
  const [selectedButton, setSelectedButton] = useState('All');
  const buttons = ['All', 'Latest', 'Popular', 'Trending'];


  const handleCardPress = (item) => {
    navigation.navigate('TripDetail', { tripData: item }); // Navigate and pass data
  };

  const renderVideoShorts = () => (
    <View style={styles.videoShortsContainer}>
      <TextDefault textColor={colors.fontMainColor} H5 bold>
        {'Shorts'}
      </TextDefault>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={videoShorts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: item.url }}
              style={styles.webviewVideo}
              allowsFullscreenVideo
            />
          </View>
        )}
      />
    </View>
  );




  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.locationWrapper}>
            <View style={styles.locationContainer}>
              <Image
                source={require('../../assets/zipsii.png')}  // Your image file
                style={styles.locationImage}  // Style the image appropriately
              />
              <TextDefault style={styles.locationText} H5 bold>Zypsii</TextDefault>
            </View>

          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchPage')} // Navigate to Searchbar
            style={styles.notificationIconWrapper}
          >
            <MaterialIcons
              name="search"
              size={28}
              color="#000"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.notificationIconWrapper}
          >
            <MaterialIcons
              name="notifications-none"
              size={28}
              color="#000"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => navigation.navigate("LocationPage")}
            style={styles.notificationIconWrapper}
          >
            <MaterialIcons
              name="my-location"
              size={28}
              color="#000"
            />
          </TouchableOpacity>

          {/* Create Poll Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CreatePoll')}
            style={styles.notificationIconWrapper}
          >
            <MaterialCommunityIcons name="poll" size={28} color="#000" />
          </TouchableOpacity>



        </View>

        {/* Search Bar */}
        {/* <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchResult')} // Navigate to SearchResult
          activeOpacity={0.7} // Optional: Add a slight opacity effect on press
        >
          <MaterialIcons name="search" size={24} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Food, Drinks, etc"
            placeholderTextColor="#A0A0A0"
            editable={false} // Disable editing as the entire container is clickable
            pointerEvents="none" // Ensure TextInput doesn't intercept the touch event
          />
          <TouchableOpacity>
            <MaterialIcons name="tune" size={24} color="#008000" />
          </TouchableOpacity>
        </TouchableOpacity> */}




        {/* ButtonContainer */}

        <Stories />

        <View style={styles.buttonContainer}>
          {buttons.map(button => (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                selectedButton === button && styles.selectedButton
              ]}
              onPress={() => setSelectedButton(button)}
            >
              <TextDefault
                style={[
                  styles.buttonText,
                  selectedButton === button && styles.selectedButtonText
                ]}
              >
                {button}
              </TextDefault>
            </TouchableOpacity>
          ))}
        </View>


        {renderVideoShorts()}


        {/* Schedule Section */}
        <View style={styles.scheduleContainer}>
          <View style={styles.scheduleheadContainer}>
            <TextDefault textColor={colors.fontMainColor} H5 bold>
              {'Schedule'}

            </TextDefault>
            <TouchableOpacity onPress={() => navigation.navigate('MySchedule')}>

              <TextDefault textColor={colors.btncolor} H5>
                {'View All'}
              </TextDefault>
            </TouchableOpacity>
          </View>
          {scheduleData && scheduleData.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={scheduleData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleCardPress(item)} // Navigate to TripDetail
                >
                  {/* Left Side - Image */}
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  {/* Right Side - Content */}
                  <View style={styles.cardContent}>
                    <TextDefault style={styles.title} H4>
                      {item.title}
                    </TextDefault>
                    <View style={styles.routeRow}>
                      <View style={styles.routeItem} H5>
                        <TextDefault style={styles.routeLabel}>From</TextDefault>
                        <View style={styles.locationRow}>
                          <Icon name="location-outline" size={16} color="#333" />
                          <TextDefault style={styles.routeText}>{item.from}</TextDefault>
                        </View>
                      </View>
                      <View style={styles.routeItem} H5>
                        <TextDefault style={styles.routeLabel}>To</TextDefault>
                        <View style={styles.locationRow}>
                          <Icon name="location-outline" size={16} color="#333" />
                          <TextDefault style={styles.routeText}>{item.to}</TextDefault>
                        </View>
                      </View>
                    </View>
                    <TextDefault style={styles.date}>📅 {item.date}</TextDefault>
                    <TextDefault style={styles.riders}>🏍️ ({item.riders})</TextDefault>
                  </View>
                  <TouchableOpacity style={styles.joinedButton}>
                    <TextDefault style={styles.joinedText}>
                      {item.joined ? 'Joined' : 'Join'}
                    </TextDefault>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          ) : (
            <TextDefault>No schedule available</TextDefault>
          )}
        </View>



        {/* Scrollable Category Row */}
        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.fontMainColor} H5 bold >
            {'Discover by Intrest'}
          </TextDefault>
          <View style={styles.seeAllTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('WhereToGo')}>
              <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
            </TouchableOpacity>
          </View>

          {/* Horizontal Scrollable FlatList for Icon Containers */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={dummyDatacategory?.slice(0, 8) || []} // Ensure you limit to 8 categories
            renderItem={({ item }) => (
              <CategoryCard
                id={item._id}
                icon={require('../../storage/images/profile4.jpg')} // Replace with dynamic icon if available
                cardLabel={item.title} // Pass the category name as `cardLabel`
                style={styles.categoryWrapper}
              />
            )}
          />
        </View>


        {dummyData.length > 0 && (
          <View style={styles.titleSpacer}>
            <TextDefault textColor={colors.fontMainColor} H5 bold >
              {'Best Destination'}
            </TextDefault>
            <View style={styles.seeAllTextContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('WhereToGo')}>
                <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item._id}
              data={dummyData}
              renderItem={({ item, index }) => {
                return (
                  <ProductCard styles={styles.itemCardContainer} {...item} />
                );
              }}
            />
          </View>
        )}
        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.fontMainColor} H4>
            {'Posts'}
          </TextDefault>
          <Post />
        </View>

        <View style={styles.titleSpacer}>
          <TextDefault textColor={colors.fontMainColor} H4>
            {'All Destination'}
          </TextDefault>

        </View>
      </>
    );
  }


  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        {/* {error ? (
          <TextError text={error.message} />
        ) : ( */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // Removed refreshing and onRefresh
          // ListFooterComponent={loading && <Spinner />} // Optionally removed footer loading indicator
          ListHeaderComponent={renderHeader}
          data={dummyData}
          renderItem={({ item }) => (
            <ProductCard styles={styles.productCard} {...item} />
          )}
        />

        {/* )} */}
        <BottomTab screen="HOME" />
      </View>
    </SafeAreaView>
  );
}
export default MainLanding;
