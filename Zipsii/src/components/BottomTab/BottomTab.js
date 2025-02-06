import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Remove SimpleLineIcons as it's no longer needed for these icons
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserContext from '../../context/User';
import { scale, colors } from '../../utils';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
function BottomTab({ screen }) {
  const navigation = useNavigation();
  const { isLoggedIn, cartCount, orders } = useContext(UserContext);

  const getIconColor = (currentScreen) => {
    return screen === currentScreen ? colors.greenColor : colors.darkGrayText;
  };

  const getTextStyle = (currentScreen) => {
    return screen === currentScreen ? styles.activeText : styles.inactiveText;
  };

  return (
    <View style={styles.footerContainer}>
      {/* Home Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MainLanding')}
        style={styles.footerBtnContainer}
      >
        <MaterialCommunityIcons
          name="home" // Solid green icon
          size={scale(20)}
          color={getIconColor('HOME')}
        />
        <Text style={getTextStyle('HOME')}>Home</Text>
      </TouchableOpacity>

      {/* Cart Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('WhereToGo')}
        style={styles.footerBtnContainer}
      >
        <View style={styles.imgContainer}>
          <SimpleLineIcons
            name="location-pin" // Solid green icon
            size={scale(20)}
            color={getIconColor('WhereToGo')}
          />

          
          {cartCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={getTextStyle('WhereToGo')}>Where to Go</Text>
      </TouchableOpacity>

      {/* Favourites Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ReelUpload')}
        style={styles.footerBtnContainer}
      >
        <MaterialCommunityIcons
          name="hexagon-outline"
          size={scale(20)}
          color={getIconColor('FAVOURITES')}
        />
        <Text style={getTextStyle('FAVOURITES')}>Upload</Text>
      </TouchableOpacity>
      
      {/* My Orders Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MessageList')}
        style={styles.footerBtnContainer}
      >
        <FontAwesome5
          name="comment-dots"
          size={scale(20)}
          color={getIconColor('ORDERS')}
        />
        <Text style={getTextStyle('ORDERS')}>Chat</Text>
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        onPress={() => {
          if (isLoggedIn) {
            navigation.navigate('ProfileDashboard');
          } else {
            navigation.navigate('SignIn');
          }
        }}
        style={styles.footerBtnContainer}
      >
        <View style={styles.profileContainer}>
          <MaterialCommunityIcons
            name="menu"
            size={scale(20)}
            color={getIconColor('PROFILE')}
          />
          {isLoggedIn &&
            orders &&
            orders.filter((o) =>
              ['PENDING', 'DISPATCHED', 'ACCEPTED'].includes(o.orderStatus)
            ).length > 0 && <View style={styles.profileBadge} />}
        </View>
        <Text style={getTextStyle('PROFILE')}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default BottomTab;
