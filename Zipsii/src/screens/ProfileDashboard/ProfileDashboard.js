import React, { useContext } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './ProfileContainer/styles';
import ProfileContainer from './ProfileContainer/ProfileContainer';
import { BottomTab, TextDefault } from '../../components';
// import CardContainer from './CardContainer/CardContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { colors } from '../../utils';

const baseUrl = 'http://10.0.2.2:8000';
function ProfileDashboard(props) {
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useState({
    id: 1,
    name: 'Leonardo',
    Posts: '0',
    Followers: '0',
    Following: '0',
    image: '../../assets/profileimage.jpg'
  });
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`${baseUrl}/userInfo`);
        // Check if response is ok before parsing
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from server");
        }
        
        const data = await response.json();
        setProfileInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Keep the default profile data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, []);
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <ScrollView 
        contentContainerStyle={[styles.flex, styles.mainContainer]} // Use ScrollView for scrolling
        showsVerticalScrollIndicator={false} // Optional: hide the scroll indicator
      >
        <ProfileContainer profileInfo={profileInfo}/>
        <View style={styles.tabContainer}>
          <TouchableOpacity activeOpacity={1}>
            {/* Uncomment this section if needed */}
            {/* <TextDefault textColor={colors.fontBrown} H5>
              My Active Orders (
              {orders
                ? orders.filter(o =>
                  ['PENDING', 'DISPATCHED', 'ACCEPTED'].includes(
                    o.orderStatus
                  )
                ).length
                : 0}
              )
            </TextDefault> */}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('PreviousOrders')}>
            {/* Uncomment this section if needed */}
            {/* <TextDefault H5>
              Previous Orders (
              {orders
                ? orders.filter(o => ['DELIVERED'].includes(o.orderStatus))
                  .length
                : 0}
              )
            </TextDefault> */}
          </TouchableOpacity>
        </View>
        {/* <CardContainer /> */}
      </ScrollView>
     <View style={{height:200,backgroundColor:'white'}}></View>
    </SafeAreaView>
  );
}

export default ProfileDashboard;
