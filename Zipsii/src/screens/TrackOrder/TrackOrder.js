import React, { useContext } from 'react';
import { View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import {
  BottomTab,
  BackHeader,
  Spinner,
  TextError,
  TextDefault
} from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserContext from '../../context/User';
import { colors, scale, alignment } from '../../utils';

function TrackOrder() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?._id ?? null;
  const { loadingOrders, orders, errorOrders } = useContext(UserContext);
  const order = orders.find(o => o._id === id);

  // Helper function to format dates
  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const transformStatusQueue = (statusQueue) => {
    const timeline = [
      {
        // Active circle (green) if pending, otherwise gray
        circleColor: statusQueue.pending ? colors.greenColor : colors.grayLinesColor,
        lineColor: statusQueue.accepted ? colors.greenColor : colors.grayLinesColor,
        title: 'Order Placed',
        description: statusQueue.pending ? formatDate(statusQueue.pending) : '',
        icon: (
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={scale(28)}
            color={colors.greenColor} // Keep icon color constant
            style={{ marginRight: scale(10), marginBottom: scale(5) }}
          />
        )
      },
      {
        // Active circle (green) if accepted, otherwise gray
        circleColor: statusQueue.accepted ? colors.greenColor : colors.grayLinesColor,
        lineColor: statusQueue.dispatched ? colors.greenColor : colors.grayLinesColor,
        title: 'In Progress',
        description: statusQueue.accepted ? formatDate(statusQueue.accepted) : '',
        icon: (
          <MaterialCommunityIcons
            name="progress-check"
            size={scale(28)}
            color={colors.greenColor} // Keep icon color constant
            style={{ marginRight: scale(10), marginBottom: scale(5) }}
          />
        )
      },
      {
        // Active circle (green) if dispatched, otherwise gray
        circleColor: statusQueue.dispatched ? colors.greenColor : colors.grayLinesColor,
        lineColor: statusQueue.delivered ? colors.greenColor : colors.grayLinesColor,
        title: 'Shipped',
        description: statusQueue.dispatched ? formatDate(statusQueue.dispatched) : '',
        icon: (
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            size={scale(28)}
            color={colors.greenColor} // Keep icon color constant
            style={{ marginRight: scale(10), marginBottom: scale(5) }}
          />
        )
      },
      {
        // Active circle (green) if delivered, otherwise gray
        circleColor: statusQueue.delivered ? colors.greenColor : colors.grayLinesColor,
        title: 'Delivered',
        description: statusQueue.delivered ? formatDate(statusQueue.delivered) : '',
        icon: (
          <MaterialCommunityIcons
            name="check-circle"
            size={scale(28)}
            color={colors.greenColor} // Keep icon color constant
            style={{ marginRight: scale(10), marginBottom: scale(5) }}
          />
        )
      }
    ];
  
    // Handle order cancellation
    if (statusQueue.cancelled) {
      timeline.splice(1, timeline.length - 1, {
        circleColor: colors.redColor, // Use red for cancelled status
        lineColor: colors.colorPrimary100,
        title: 'Cancelled',
        description: statusQueue.cancelled ? formatDate(statusQueue.cancelled) : '',
        icon: (
          <MaterialCommunityIcons
            name="cancel"
            size={scale(28)}
            color={colors.redColor} // Icon color for cancelled
            style={{ marginRight: scale(10), marginBottom: scale(5) }}
          />
        )
      });
    }
  
    return timeline;
  };
  
  

  function renderDetail(rowData) {
    const { title, description, icon } = rowData;
    return (
      <View style={styles.detailContainer}>
        <View>
          <TextDefault style={[styles.titleStyle, { color: 'black' }]}>
            {title}
          </TextDefault>
          <TextDefault style={styles.descriptionStyle}>{description}</TextDefault>
        </View>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader
          title={'Track Order'}
          backPressed={() => navigation.goBack()}
        />
        {errorOrders ? (
          <TextError text={errorOrders.message} />
        ) : loadingOrders || !order ? (
          <Spinner />
        ) : (
          <View style={styles.timelineContainer}>
            <View style={styles.orderIdContainer}>
              <TextDefault
                textColor={colors.fontMainColor}
                H4
                center
                style={[alignment.MLxSmall, alignment.MBsmall]}>
                {'Order No: ' + (order?.orderId ?? 'Unknown')}
              </TextDefault>
            </View>
            <Timeline
  data={transformStatusQueue(order.statusQueue)}
  circleSize={scale(28)}
  innerCircle="dot"  // Use check-circle for the tick mark
  showTime={false}
  renderDetail={renderDetail}
  lineColor={colors.lightBlueColor}
/>

          </View>
        )}
      </View>
      <BottomTab screen="HOME" />
    </SafeAreaView>
  );
}

export default TrackOrder;
