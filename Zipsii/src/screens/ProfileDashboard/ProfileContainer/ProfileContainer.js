import React, { useContext } from 'react';
import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../../components';

import { colors } from '../../../utils';

function ProfileContainer({profileInfo}) {
  const navigation = useNavigation();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.maincontainer}>

        {/* Icons Row */}
        <View style={styles.topIconsRow}>
          <View style={styles.circle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.circle}>
            <TouchableOpacity onPress={() => console.log('Share button pressed')}>
            <MaterialCommunityIcons name="share-all-outline"  size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Picture and Name */}
        <View style={styles.profileSection}>
          <Image source={{uri:profileInfo.image}} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditingProfile')}>
            <Feather name="edit" size={18} color={colors.white} />
          </TouchableOpacity>
          <TextDefault style={styles.profileName} H4>
            {profileInfo?.name || 'User Name'}
          </TextDefault>
        </View>

        {/* Stats Section */}
        {/* <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <TextDefault style={styles.statLabel}>Posts</TextDefault>
            <TextDefault style={styles.statNumber}>100</TextDefault>
          </View>
          <View style={styles.stat}>
            <TextDefault style={styles.statLabel}>Followers</TextDefault>
            <TextDefault style={styles.statNumber}>120k</TextDefault>
          </View>
          <View style={styles.statLast}>
            <TextDefault style={styles.statLabel}>Following</TextDefault>
            <TextDefault style={styles.statNumber}>0</TextDefault>
          </View>
        </View> */}

        {/* Settings Options */}
        <View style={styles.settingsSection} H5>
          {[
            { label: 'Your Profile', icon: 'person-outline', route: 'DummyScreen' },
            { label: 'Create Business Page', icon: 'person-outline', route: 'PageCreation' },
            { label: 'Delete', icon: 'delete', route: 'DeleteButton' },
            { label: 'Logout', icon: 'logout', route: 'Logout' },
            { label: 'Favourites', icon: 'star-outline', route: 'Favourite' },
            { label: 'My Schedule', icon: 'list', route: 'MySchedule' },
            { label: 'Settings', icon: 'settings', route: 'Settings' },
            { label: 'Help Center', icon: 'help', route: 'HelpCenter' },
            { label: 'Privacy Policy', icon: 'lock', route: 'PrivacyPolicy' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingsItem}
              onPress={() => navigation.navigate(item.route)}>
              <View style={styles.settingsItemContent}>
                <MaterialIcons name={item.icon} size={24} color={colors.darkGrayText} />
                <TextDefault style={styles.settingsItemText} H5>
                  {item.label}
                </TextDefault>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={colors.darkGrayText}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileContainer;
