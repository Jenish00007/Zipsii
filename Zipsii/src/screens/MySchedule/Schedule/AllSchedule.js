import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/Ionicons'; // Import vector icons

const Schedule = (props) => {
  const navigation = useNavigation(); // Access navigation object

 
console.log(props.data)
  const handleCardPress = (item) => {
    navigation.navigate('TripDetail', { tripData: item }); // Navigate and pass data
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Schedule</Text>
      </View>

      {/* Using FlatList to render items */}
      <FlatList
        data={props.data} // Array of data
        keyExtractor={(item) => item.id.toString()} // Key for each item
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleCardPress(item)} // Navigate to TripDetail
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.routeRow}>
                <View style={styles.routeItem}>
                  <Text style={styles.routeLabel}>From</Text>
                  <View style={styles.locationRow}>
                    <Icon name="location-outline" size={16} color="#333" />
                    <Text style={styles.routeText}>{item.from}</Text>
                  </View>
                </View>
                <View style={styles.routeItem}>
                  <Text style={styles.routeLabel}>To</Text>
                  <View style={styles.locationRow}>
                    <Icon name="location-outline" size={16} color="#333" />
                    <Text style={styles.routeText}>{item.to}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.date}>📅 {item.date}</Text>
              <Text style={styles.riders}>🏍️ ({item.riders})</Text>
            </View>
            <TouchableOpacity style={styles.joinedButton}>
              <Text style={styles.joinedText}>{item.joined ? 'Joined' : 'Join'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Schedule;
