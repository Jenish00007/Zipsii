import React, { useContext } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './ProfileContainer/styles';
import ProfileContainer from './ProfileContainer/ProfileContainer';
import { BottomTab, TextDefault } from '../../components';
// import CardContainer from './CardContainer/CardContainer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/User';
import { colors } from '../../utils';

function ProfileDashboard(props) {
  const navigation = useNavigation();
  const { orders } = useContext(UserContext);

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <ScrollView 
        contentContainerStyle={[styles.flex, styles.mainContainer]} // Use ScrollView for scrolling
        showsVerticalScrollIndicator={false} // Optional: hide the scroll indicator
      >
        <ProfileContainer />
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
