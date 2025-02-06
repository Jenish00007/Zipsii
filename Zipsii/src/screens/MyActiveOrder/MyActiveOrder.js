import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TextDefault, BottomTab, BackHeader } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../../context/User';
import styles from './styles';
import { colors } from '../../utils';

function MyActiveOrder() {
  const { orders, setOrders } = useContext(UserContext); // Fetch and set orders from context
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Active'); // Default tab is 'Active'

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.error('Invalid date:', date);
      return 'N/A';
    }
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Pending', style: styles.pendingBadge };
      case 'DISPATCHED':
        return { label: 'Dispatched', style: styles.dispatchedBadge };
      case 'ACCEPTED':
        return { label: 'Accepted', style: styles.acceptedBadge };
      case 'DELIVERED':
        return { label: 'Delivered', style: styles.deliveredBadge };
      case 'CANCELLED':
        return { label: 'Cancelled', style: styles.cancelledBadge };
      default:
        return { label: 'Unknown', style: styles.unknownBadge };
    }
  };

  const handleCancelOrder = (orderId) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setOrders((prevOrders) => {
              const updatedOrders = prevOrders.map((order) => {
                if (order.orderId === orderId) {
                  return { ...order, orderStatus: 'CANCELLED' };
                }
                return order;
              });
              return updatedOrders;
            });
          },
        },
      ]
    );
  };

  const renderOrderItem = ({ item }) => {
    const { label, style } = getStatusBadge(item.orderStatus);

    return (
      <View style={styles.orderCard}>
        {/* Forward Arrow for Navigation */}
        <TouchableOpacity
          style={styles.forwardArrow}
          onPress={() => navigation.navigate('OrderDetail', { _id: item._id })}
        >
          <Icon name="arrow-forward" size={24} color={colors.black} />
        </TouchableOpacity>

        {/* Status Badge */}
        <View style={[styles.statusBadge, style]}>
          <TextDefault style={styles.statusBadgeText}>{label}</TextDefault>
        </View>

        {/* Order Details */}
        <View style={styles.transactionRow}>
          <View style={styles.transactionItem}>
            <TextDefault style={styles.label}>Order ID</TextDefault>
            <TextDefault style={styles.value}>{item.orderId}</TextDefault>
          </View>
          <View style={styles.transactionItem}>
            <TextDefault style={styles.label}>Order Date</TextDefault>
            <TextDefault style={styles.value}>{formatDate(item.createdAt)}</TextDefault>
          </View>
          <View style={styles.transactionItem}>
            <TextDefault style={styles.label}>Total Payment</TextDefault>
            <TextDefault style={styles.value}>
              {item.orderAmount
                ? `$${parseFloat(item.orderAmount).toFixed(2)}`
                : '$0.00'}
            </TextDefault>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {item.orderStatus === 'PENDING' && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelOrder(item.orderId)}
            >
              <TextDefault style={styles.cancelButtonText}>Cancel</TextDefault>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => navigation.navigate('TrackOrder', { _id: item._id })}
          >
            <TextDefault style={styles.trackButtonText}>Track Order</TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyView = () => {
    return (
      <View style={styles.emptyView}>
        <Image
          style={styles.emptyImage}
          source={require('../../assets/images/activeOrder.png')}
        />
        <TextDefault style={styles.emptyText}>
          No {selectedTab} Orders Yet.
        </TextDefault>
      </View>
    );
  };

  const renderContent = () => {
    const filteredOrders = orders || [];

    const orderData = {
      Active: filteredOrders.filter((o) => ['PENDING', 'DISPATCHED', 'ACCEPTED'].includes(o.orderStatus)),
      Completed: filteredOrders.filter((o) => o.orderStatus === 'DELIVERED'),
      Cancelled: filteredOrders.filter((o) => o.orderStatus === 'CANCELLED'),
    };

    const currentOrders = orderData[selectedTab] || [];

    return currentOrders.length > 0 ? (
      <FlatList
        data={currentOrders}
        keyExtractor={(item) => item.orderId || item._id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.orderList}
      />
    ) : (
      renderEmptyView()
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackHeader
        title={'My Orders'}
        backPressed={() => navigation.goBack()}
      />

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

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom Tab */}
      <BottomTab screen="ORDERS" />
    </SafeAreaView>
  );
}

export default MyActiveOrder;
