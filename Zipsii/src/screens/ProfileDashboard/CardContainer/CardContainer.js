import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { Spinner, TextError, TextDefault } from '../../../components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../context/User';
import { colors, scale } from '../../../utils';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

function cardContainer(props) {
  const navigation = useNavigation();
  const {
    orders,
    loadingOrders,
    errorOrders,
    fetchMoreOrdersFunc,
    networkStatusOrders
  } = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState('Active'); // Default tab is 'Active'

  function emptyView() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/activeOrder.png')}
          />
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontMainColor} center>
            {`No ${selectedTab} Orders Yet.`}
          </TextDefault>
        </View>
      </View>
    );
  }

  if (loadingOrders || !orders) return <Spinner />;
  if (errorOrders) return <TextError text={JSON.stringify(errorOrders)} />;

  // Filter orders based on selected tab
  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'Active') {
      return ['PENDING', 'DISPATCHED', 'ACCEPTED'].includes(order.orderStatus);
    } else if (selectedTab === 'Completed') {
      return order.orderStatus === 'COMPLETED';
    } else if (selectedTab === 'Cancelled') {
      return order.orderStatus === 'CANCELLED';
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.fontMainColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Active', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <TextDefault
              style={[
                styles.tabButtonText,
                selectedTab === tab && styles.activeTabButtonText,
              ]}
            >
              {tab}
            </TextDefault>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <FlatList
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.mainCardContainer}
        data={filteredOrders}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => fetchMoreOrdersFunc()}
        refreshing={networkStatusOrders === 4}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyView()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('OrderDetail', { _id: item._id })}
            style={styles.cardContainer}
          >
            <View style={styles.leftContainer}>
              <Image
                source={{
                  uri:
                    item?.items[0]?.image ??
                    'https://res.cloudinary.com/ecommero/image/upload/v1597658445/products/su6dg1ufmtfuvrjbhgtj.png',
                }}
                resizeMode="cover"
                style={[styles.imgResponsive, styles.roundedBorder]}
              />
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.subRightContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleStyle}>{item.orderId}</Text>
                  <View style={styles.rightArrowContainer}>
                    <Feather
                      name="chevron-right"
                      size={scale(20)}
                      color={colors.fontSecondColor}
                    />
                  </View>
                </View>
                <View style={styles.subTitleContainer}>
                  <Text numberOfLines={1} style={styles.subTtitleStyle}>
                    {item.items[0]?.product}
                  </Text>
                </View>
                <View style={styles.actionsContainer}>
                  <View style={styles.subActionsContainer}>
                    <Text style={styles.statusStyle}>{item.orderStatus}</Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate('TrackOrder', { _id: item._id })
                      }
                      style={styles.actionContainer}
                    >
                      <Text style={styles.actionStyle}>Track</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default cardContainer;
