import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { BackHeader, BottomTab } from "../../components";
import { alignment, colors } from "../../utils";
import { cardData } from "../CardData/CardData";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Map = ({ route }) => {
  const navigation = useNavigation();
  const backPressed = () => {
    navigation.goBack(); // Navigate to the previous screen when the back arrow is pressed
  };

  // Destructure the route params and set default values if they are undefined
  const { fromLocation = 'Unknown', toLocation = 'Unknown' } = route.params || {};

  // Route coordinates dynamically adjusted for "from" and "to" locations
  const routeCoordinates = [
    { latitude: 13.0827, longitude: 80.2707 }, // Chennai (default starting point)
    { latitude: 12.9716, longitude: 77.5946 }, // Bangalore (mid-point)
    { latitude: 12.2958, longitude: 76.6394 }, // Mysore (default destination)
  ];

  return (
    <View style={styles.container}>
      <View style={styles.protractorShape} />
      <View style={styles.backgroundCurvedContainer} />

      {/* Back Header */}
      <BackHeader backPressed={backPressed} /> 

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Title */}
        <Text style={styles.title}>Trip Start at / 24:35 Mins</Text>

        {/* From-To Section */}
        <View style={styles.fromToContainer}>
          <View style={styles.locationInfo}>
            <Icon name="map-marker-outline" size={20} color={colors.darkGray} />
            <Text style={styles.locationText}>{fromLocation}</Text>
          </View>
          <Icon name="arrow-right" size={20} color={colors.darkGray} style={styles.arrowIcon} />
          <View style={styles.locationInfo}>
            <Icon name="map-marker-outline" size={20} color={colors.darkGray} />
            <Text style={styles.locationText}>{toLocation}</Text>
          </View>
        </View>

        {/* Map View */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: routeCoordinates[0].latitude, // Initial latitude
            longitude: routeCoordinates[0].longitude, // Initial longitude
            latitudeDelta: 4.5,
            longitudeDelta: 4.5,
          }}
        >
          {/* Markers */}
          <Marker
            coordinate={routeCoordinates[0]}
            title="Chennai"
            description="Starting Point"
          />
          <Marker
            coordinate={routeCoordinates[1]}
            title="Bangalore"
            description="Stopover"
          />
          <Marker
            coordinate={routeCoordinates[2]}
            title="Mysore"
            description="Destination"
          /> 

          {/* Route */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        </MapView>

        <Text style={styles.explore}>Explore Travel</Text>

        {/* Discover Row */}
        <View style={styles.discoverRow}>
          <Text style={styles.discoverText}>Discover by Nearest</Text>
          <TouchableOpacity onPress={() => navigation.navigate("DiscoverPlace")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardData.map((card) => (
            <View key={card.id} style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.bottomTabContainer}>
        <BottomTab screen={"WhereToGo"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundCurvedContainer: {
    backgroundColor: colors.btncolor,
    height: 200,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 0,
  },
  protractorShape: {
    backgroundColor: colors.white,
    height: 500,
    width: 1000,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    position: "absolute",
    top: 80,
    alignSelf: "center",
    zIndex: 1,
    overflow: "hidden",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    zIndex: 2,
    top: 90,
  },
  fromToContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    ...alignment.MLmedium,
    color: colors.darkGray,
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.fontMainColor,
  },
  map: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: Dimensions.get("window").height * 0.4,
  },
  discoverRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    ...alignment.MBmedium,
  },
  discoverText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.fontMainColor,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.btncolor,
    fontWeight: "500",
  },
  card: {
    width: 150,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    ...alignment.PxSmall,
    borderWidth: 1,
    borderColor: colors.grayLinesColor,
    borderRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.fontMainColor,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.fontThirdColor,
  },
  explore: {
    ...alignment.Psmall,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
  },
});

export default Map;
