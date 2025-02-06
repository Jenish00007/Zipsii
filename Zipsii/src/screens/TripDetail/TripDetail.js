import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { BackHeader, BottomTab } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For location icons
import { alignment, colors } from '../../utils'; // Ensure you define appropriate colors in your utils.
import { useNavigation } from '@react-navigation/native';

const TripDetail = ({ route }) => {
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };
  const { tripData } = route.params; // Access passed trip data
  const [activeDay, setActiveDay] = useState(1); 
  const navigation = useNavigation(); // Track the active day

  const renderDayPlan = ({ item, index, arrayLength }) => (
    <View style={styles.dayPlanItem}>
      <View style={styles.iconAndLineContainer}>
        <Icon name="map-marker" size={20} color={colors.black} />
        {index < arrayLength - 1 && <View style={styles.dottedLine} />}
      </View>
      <Text style={styles.location}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

<View style={styles.protractorShape} />
<View style={styles.backgroundCurvedContainer} />
<View style={styles.maincontainer}>
      {/* BackHeader component */}
            <BackHeader backPressed={backPressed} /> 

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <Text style={styles.title}>{tripData.title}</Text> */}

        {/* Top section with trip details */}
        <View style={styles.topSection}>
          {/* From-To Section */}
          <View style={styles.fromToSection}>
            <View style={styles.locationInfo}>
              <Icon name="map-marker-outline" size={20} color={colors.darkGray} />
              <Text style={styles.locationText}>{tripData.from}</Text>
            </View>
            <Text style={styles.dottedLineHorizontal}></Text>
            <View style={styles.locationInfo}>
              <Icon name="map-marker-outline" size={20} color={colors.darkGray} />
              <Text style={styles.locationText}>{tripData.to}</Text>
            </View>
          </View>

          <Image source={{ uri: tripData.imageUrl }} style={styles.image} />
        </View>

        {/* Riders and Date in Flex Row */}
        <View style={styles.ridersDateContainer}>
          <Text style={styles.date}>
            <Icon name="calendar-outline" size={20} color={colors.darkGray} /> {tripData.date}
          </Text>
          <Text style={styles.riders}>
            🏍️ Riders: ({tripData.riders})
          </Text>
        </View>

        {/* Trip Detail Plan Section */}
        <View style={styles.tripPlanSection}>
          <Text style={styles.sectionTitle}>Trip Detail Plan</Text>
          <Text style={styles.sectionTitleplan}>Days Plans</Text>

          {/* Days Plan Tabs */}
          <View style={styles.daysTabs}>
            <TouchableOpacity
              style={[styles.dayTab, activeDay === 1 && styles.activeTab]}
              onPress={() => setActiveDay(1)}
            >
              <Text style={[styles.dayTabText, activeDay === 1 && styles.activeTabText]}>Day 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dayTab, activeDay === 2 && styles.activeTab]}
              onPress={() => setActiveDay(2)}
            >
              <Text style={[styles.dayTabText, activeDay === 2 && styles.activeTabText]}>Day 2</Text>
            </TouchableOpacity>
          </View>

          {/* Day Plan Details */}
          <View style={styles.dayPlanList}>
            <FlatList
              data={activeDay === 1 ? tripData.day1Locations : tripData.day2Locations}
              renderItem={({ item, index }) =>
                renderDayPlan({
                  item,
                  index,
                  arrayLength:
                    activeDay === 1
                      ? tripData.day1Locations.length
                      : tripData.day2Locations.length,
                })
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        
      </ScrollView>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate ('MakeSchedule')}>
          <Text style={styles.buttonText}>Change Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.button} 
  onPress={() => setActiveDay(2)} // Set activeDay to 2 when Next Day button is clicked
>
  <Text style={styles.buttonText}>Next Day</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate('Map', { fromLocation: tripData.from, toLocation: tripData.to })
  }
>
  <Text style={styles.buttonText}>Map</Text>
</TouchableOpacity>

      </View>
      <BottomTab screen="WhereToGo" style={styles.BottomTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, zIndex:2 },
  topSection: { flexDirection: 'row', ...alignment.Pmedium, alignItems: 'center', top: 160, zIndex: 2 },
  maincontainer:{
    flex: 1,
    zIndex: 2
  },
  fromToSection: { flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: -50 },
  locationInfo: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, fontWeight: 'bold', ...alignment.MLmedium, color: colors.darkGray },
  dottedLineHorizontal: { fontSize: 16, color: colors.lightGray },

  image: { width: 110, height: 110, borderRadius: 30, marginTop: -60 },
  title: { fontSize: 30, fontWeight: 'bold', ...alignment.MBsmall, ...alignment.MLmedium },

  tripPlanSection: { paddingHorizontal: 20, top: 140 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  sectionTitleplan: {
    fontSize: 18,
    fontWeight: 'bold',
    ...alignment.MBmedium,
    textAlign: 'center',
    ...alignment.Psmall,
    backgroundColor: colors.btncolor,
    borderRadius: 10,
    color: colors.white,
    width: 130,
    alignSelf: 'center',
  },
  backgroundCurvedContainer: {
    backgroundColor: colors.btncolor,
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
  protractorShape: {
    backgroundColor: colors.white,
    height: 500,
    width: 1000,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    zIndex: 1,
    overflow: 'hidden',
  },
  ridersDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: -5,
    marginHorizontal: 15,
    ...alignment.MBlarge,
    top: 150
  },
  riders: { fontSize: 16, color: colors.darkGray, fontWeight: 'bold' },
  date: { fontSize: 16, color: colors.darkGray, fontWeight: 'bold' },

  daysTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    ...alignment.MBsmall,
    borderBottomWidth: 2,
    borderColor: colors.graycolor,
    backgroundColor: colors.grayLinesColor,
  },
  dayTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: { borderColor: colors.black },
  dayTabText: { fontSize: 16, color: colors.fontMainColor, fontWeight: 'bold' },
  activeTabText: { color: colors.black },

  dayPlanList: { paddingVertical: 2 , zIndex: 2},
  dayPlanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    ...alignment.MLmedium,
  },
  iconAndLineContainer: {
    alignItems: 'center',
    ...alignment.MRsmall,
  },
  dottedLine: {
    width: 1,
    height: 20,
    backgroundColor: colors.black,
    marginVertical: 4,
  },
  location: { fontSize: 16, color: colors.darkGray },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', ...alignment.Psmall },
  button: { flex: 1, marginHorizontal: 5, ...alignment.Psmall, backgroundColor: colors.btncolor, borderRadius: 5 },
  buttonText: { textAlign: 'center', color: colors.white, fontWeight: 'bold' },
});

export default TripDetail;