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
import { base_url } from '../../utils/base_url';
import { useStatusBar } from '../../utils/useStatusBar';

//const baseUrl = 'https://admin.zypsii.com';
function ProfileDashboard(props) {
  useStatusBar(colors.btncolor, 'light-content');
  const navigation = useNavigation();
  const [profileInfo, setProfileInfo] = useState({
    id: 1,
    name: 'Jenish',
    Posts: '0',
    Followers: '0',
    Following: '0',
    image: '../../assets/profileimage.jpg'
  });

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`${base_url}/userInfo`);
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
      }
    };

    fetchProfileInfo();
  }, []);

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <ScrollView 
        contentContainerStyle={[styles.flex, styles.mainContainer]}
        showsVerticalScrollIndicator={false}
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