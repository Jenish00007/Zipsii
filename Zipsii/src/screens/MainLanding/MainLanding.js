import React from 'react';
import { View, FlatList,Alert, ScrollView, ImageBackground, TouchableOpacity, NativeModules } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';
import CategoryCard from '../../ui/CategoryCard/CategoryCard';
import { BottomTab, TextDefault, TextError, Spinner, Hexagon } from '../../components';
import { verticalScale, scale, colors, alignment } from '../../utils';
import ProductCard from '../../ui/ProductCard/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useSchedule } from '../../context/ScheduleContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Stories from '../../components/Stories/Stories';
import Post from '../../components/Posts/Post';
import DiscoverByNearest from '../../components/DiscoverByNearest/DiscoverByNearest';
import Schedule from '../MySchedule/Schedule/AllSchedule';
const baseUrl = 'http://192.168.18.179:8000';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


function MainLanding(props) {
  const navigation = useNavigation()
  const { scheduleData } = useSchedule()
  const [selectedButton, setSelectedButton] = useState('All')
  const buttons = ['All', 'Schedule', 'Shorts', 'Posts']
  const handleCardPress = (item) => {
    navigation.navigate('TripDetail', { tripData: item })
  }
  const [discover_by_intrest, setDiscover_by_intrest] = useState([])
  const [best_destination, setBest_destination] = useState([])
  const [all_destination, setAll_destination] = useState([])
  const [all_schedule, setAll_schedule] = useState([])
  const [all_posts, setAllPosts] = useState([])
  const [all_shorts, setAllShorts] = useState([])
  const [discoverbynearest, setDiscoverbyNearest] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]
        );
        return true; // Prevent default behavior (exit app)
      };

      // Add the event listener
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      // Clean up the event listener when the screen is unfocused
      return () => backHandler.remove();
    }, []) // Empty dependency array ensures this runs only on mount/unmount
  );


  useEffect(() => {
    const fetch_Discover_by_intrest = async() => {
      try {
        const response = await fetch(baseUrl + '/discover_by_intrest')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          image: baseUrl + item.image, // Make sure the URL is correct
          name: item.name
        }))
        setDiscover_by_intrest(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_Discover_by_intrest()
  }, [])

  useEffect(() => {
    const fetch_best_destination = async() => {
      try {
        const response = await fetch(baseUrl + '/best_destination')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          image: baseUrl + item.image,
          name: item.name
        }))
        setBest_destination(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_best_destination()
  }, [])

  useEffect(() => {
    const fetch_all_destination = async() => {
      try {
        const response = await fetch(baseUrl + '/all_destination')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          image: baseUrl + item.image,
          name: item.name
        }))
        setAll_destination(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_all_destination()
  }, [])

  useEffect(() => {
    const fetch_all_schedule = async() => {
      try {
        const response = await fetch(baseUrl + '/get_all_schedule')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map((item) => ({
          id: item.id,
          title: item.title,
          from: item.from,
          to: item.to,
          date: item.date,
          riders: item.riders,
          joined: item.joined,
          imageUrl: item.imageUrl,
          day1Locations: item.day1Locations,
          day2Locations: item.day2Locations
        }))
        setAll_schedule(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_all_schedule()
  }, [])

  useEffect(() => {
    const fetch_all_posts = async() => {
      try {
        const response = await fetch(baseUrl + '/get_all_posts')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          postPersonImage: item.postPersonImage,
          postTitle: item.postTitle,
          postImage: item.postImage,
          likes: item.likes,
          isLiked: item.isLiked
        }))
        setAllPosts(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_all_posts()
  }, [])

  useEffect(() => {
    const fetch_all_Shorts = async() => {
      try {
        const response = await fetch(baseUrl + '/get_all_shorts')
        const data = await response.json()
        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          video: item.video.url,
          videoTitle: item.videoTitle,
          videoImage: item.videoImage,
          likes: item.likes,
          isLiked: item.isLiked
        }))
        // console.log(data)
        setAllShorts(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetch_all_Shorts()
  }, [])

  // Fetch data from an open-source API (JSONPlaceholder API for demonstration)
  useEffect(() => {
    const fetchDiscoverbyNearest = async() => {
      try {
        const response = await fetch(baseUrl + '/discover_by_nearest')
        const data = await response.json()

        // Log to verify the data structure
        // console.log(data);

        const formattedData = data.slice(0, 100).map(item => ({
          id: item.id,
          image: item.image,
          title: item.name,
          subtitle: item.subtitle
        }))

        // console.log(formattedData); // Check the formatted data with image URLs

        setDiscoverbyNearest(formattedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDiscoverbyNearest()
  }, [])

  const renderVideoShorts = () => (
    <View style={styles.videoShortsContainer}>
      <TextDefault textColor={colors.fontMainColor} H5 bold>
        {'Shorts'}
      </TextDefault>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={all_shorts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: item.video }}
              style={styles.webviewVideo}
              allowsFullscreenVideo
            />
          </View>
        )}
      />
    </View>
  )

  const renderScheduleContainer = () => (
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

      {all_schedule && all_schedule.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={all_schedule?.slice(0, 8) || []}
          renderItem={({ item }) => (
            <Schedule
              item={item}
            />
          )}

        />
      ) : (
        <TextDefault>No schedule available</TextDefault>
      )}
    </View>
  )

  const renderDiscoverByInterest = () => (
    <View style={styles.titleSpacer}>
      <TextDefault textColor={colors.fontMainColor} H5 bold >
        {'Discover by Interest'}
      </TextDefault>
      <View style={styles.seeAllTextContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('WhereToGo')}>
          <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={discover_by_intrest?.slice(0, 8) || []}
        renderItem={({ item }) => (
          <CategoryCard
            id={item.id}
            icon={item.image}
            cardLabel={item.name}
            style={styles.categoryWrapper}
          />
        )}
      />
    </View>
  )

  const renderDiscoverByNearest = () => (
    discoverbynearest.length > 0 && (
      <View style={styles.titleSpacer}>
        <TextDefault textColor={colors.fontMainColor} H5 bold >
          {/* {'Discover by Nearest'} */}
          Discover by Nearest
        </TextDefault>
        <View style={styles.seeAllTextContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('DiscoverPlace')}>
            <TextDefault textColor={colors.greenColor} H5 style={styles.seeAllText}>View All</TextDefault>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          data={discoverbynearest}
          renderItem={({ item, index }) => (
            <DiscoverByNearest styles={styles.itemCardContainer} {...item} />
          )}
        />

      </View>
    )
  )

  const renderBestDestination = () => (
    best_destination.length > 0 && (
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
          keyExtractor={(item, index) => item.id}
          data={best_destination}
          renderItem={({ item, index }) => (
            <ProductCard styles={styles.itemCardContainer} {...item} />
          )}
        />

      </View>
    )
  )

  const renderPosts = () => (
    <View style={styles.titleSpacer}>
      <TextDefault textColor={colors.fontMainColor} H4>
        {'Posts'}
      </TextDefault>
      <FlatList
        data={all_posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  )
  const renderItem = ({ item }) => {
    return (
      <Post
        postPersonImage={item.postPersonImage}
        postTitle={item.postTitle}
        postImage={item.postImage}
        likes={item.likes}
        isLiked={item.isLiked}
      />
    )
  }

  const renderAllDestination = () => (
    <View style={styles.titleSpacer}>
      <TextDefault textColor={colors.fontMainColor} H4>
        {'All Destination'}
      </TextDefault>
    </View>
  )

  // Determine what content to show based on selected button
  const renderContent = () => {
    switch (selectedButton) {
      case 'Shorts':
        return renderVideoShorts()
      case 'Schedule':
        return renderScheduleContainer()
      case 'Posts':
        return renderPosts()
      case 'All':
      default:
        return (
          <>
            {renderScheduleContainer()}
            {renderDiscoverByInterest()}
            {renderDiscoverByNearest()}
            {renderBestDestination()}
            {renderAllDestination()}
          </>
        )
    }
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          <View style={styles.locationWrapper}>
            <View style={styles.locationContainer}>
              <Image
                source={require('../../assets/zipsii.png')}
                style={styles.locationImage}
              />
              <TextDefault style={styles.locationText} H5 bold>Zypsii</TextDefault>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchPage')}
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

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("LocationPage")}
            style={styles.notificationIconWrapper}
          >
            <MaterialIcons
              name="my-location"
              size={28}
              color="#000"
            />
          </TouchableOpacity> */}

          {/* Create Poll Icon */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('CreatePoll')}
            style={styles.notificationIconWrapper}
          >
            <MaterialCommunityIcons name="poll" size={28} color="#000" />
          </TouchableOpacity> */}
        </View>

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

        {/* Render content based on selected button */}
        {renderContent()}
      </>
    )
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={renderHeader}
          data={selectedButton === 'All' ? all_destination : []}
          renderItem={({ item }) => (
            <ProductCard styles={styles.productCard} {...item} />
          )}
        />
        <BottomTab screen="HOME" />
      </View>
    </SafeAreaView>
  )
}
export default MainLanding
