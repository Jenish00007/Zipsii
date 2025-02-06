import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../utils";
import { alignment } from "../../utils";

const peopleData = [
  {
    id: "1",
    name: "Aurelia",
    tagline: "Be your own hero 💪",
    image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
  },
  {
    id: "2",
    name: "Bristy Haque",
    tagline: "Keep working ✍️",
    image: "https://img.freepik.com/free-photo/business-woman-with-tablet-street_23-2148213471.jpg",
  },
  {
    id: "3",
    name: "John Borino",
    tagline: "Make yourself proud 😇",
    image: "https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-LinkedIn-profile-picture--of-a-smiling-male-in-the-light-brown-business-suit-with-his-back-to-the-window-from-Fotor.jpg",
  },
  {
    id: "4",
    name: "Ella Fitzgerald",
    tagline: "Stay inspired 🌟",
    image: "https://a.storyblok.com/f/191576/1176x882/f95162c213/profile_picture_hero_before.webp",
  },
  {
    id: "5",
    name: "Michael Stevens",
    tagline: "Dream big 🚀",
    image: "https://t3.ftcdn.net/jpg/06/01/50/96/240_F_601509638_jDwIDvlnryPRhXPsBeW1nXv90pdlbykC.jpg",
  },
  {
    id: "6",
    name: "Sophia Grace",
    tagline: "Never give up 🏆",
    image: "https://img.freepik.com/free-photo/businesswoman-making-phone-call-outdoors_23-2148002104.jpg",
  },
];

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(peopleData);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredResults = peopleData.filter((person) =>
      person.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const renderItem = ({ item }) => (
    <View style={styles.personContainer}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.personDetails}>
        <Text style={styles.personName}>{item.name}</Text>
        <Text style={styles.personTagline}>{item.tagline}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        {!isFocused && (
          <Icon name="search" size={28} color="#333" style={styles.searchIcon} />
        )}
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for people..."
        />
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearchText("");
            setFilteredData(peopleData);
          }}
        >
          <Text style={styles.clearText}>✖</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>People</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noResults}>No results found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroudGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    ...alignment.MTlarge,
    ...alignment.MBlarge
  },
  searchIcon: {
    ...alignment.MRsmall
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: colors.black,
  },
  clearButton: {
    ...alignment.PxSmall
  },
  clearText: {
    fontSize: 16,
    color: colors.black,
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    ...alignment.PxSmall,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    ...alignment.MTlarge,
    fontSize: 18,
    fontWeight: "bold",
    color: colors.fontMainColor,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  personDetails: {
    ...alignment.MLsmall
  },
  personName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  personTagline: {
    fontSize: 14,
    color: colors.fontThirdColor,
    fontWeight: 'bold'
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: colors.fontSecondColor,
    ...alignment.MTlarge
  },
});

export default SearchPage;
