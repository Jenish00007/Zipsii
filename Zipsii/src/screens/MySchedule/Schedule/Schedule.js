import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/Ionicons'; // Import vector icons

const Schedule = () => {
  const navigation = useNavigation(); // Access navigation object

  const data = [
    {
      id: 1,
      title: 'Bikers club',
      from: 'Chennai----------',
      to: 'Mysore',
      date: '02-02-25',
      riders: 20,
      joined: true,
      imageUrl: 'https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid',
      day1Locations: ['Thirumazhisai', 'Sriperumbudur', 'Vellore', 'Vaniyambadi', 'Krishnagiri'],
      day2Locations: ['Krishnagiri', 'Salem', 'Erode'],
    },
    {
      id: 2,
      title: 'R15 club',
      from: 'Coimbatore----------',
      to: 'Goa',
      date: '10-12-24',
      riders: 2,
      joined: true,
      imageUrl: 'https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid',
      day1Locations: ['Chennai', 'Tiruvannamalai', 'Vellore'],
      day2Locations: ['Erode', 'Coimbatore'],
    },
    {
      id: 3,
      title: 'R16 club',
      from: 'Coimbatore----------',
      to: 'Goa',
      date: '17-12-24',
      riders: 2,
      joined: true,
      imageUrl: 'https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid',
      day1Locations: ['Madurai', 'Dindigul', 'Karur'],
      day2Locations: ['Salem', 'Coimbatore'],
    },
    {
      id: 4,
      title: 'Bikers club',
      from: 'Chennai----------',
      to: 'Mysore',
      date: '14-02-25',
      riders: 20,
      joined: true,
      imageUrl: 'https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid',
      day1Locations: ['Thiruvallur', 'Pondicherry'],
      day2Locations: ['Cuddalore', 'Chidambaram'],
    },
    {
      id: 5,
      title: 'Route 46',
      from: 'Chennai----------',
      to: 'Mysore',
      date: '12-02-25',
      riders: 20,
      joined: true,
      imageUrl: 'https://img.freepik.com/free-photo/straight-road-middle-desert-with-magnificent-mountains-sunset_181624-37698.jpg?semt=ais_hybrid',
      day1Locations: ['Bangalore', 'Hosur'],
      day2Locations: ['Coimbatore', 'Mysore'],
    },
  ];

  const handleCardPress = (item) => {
    navigation.navigate('TripDetail', { tripData: item }); // Navigate and pass data
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Schedule</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {/* Using FlatList to render items */}
      <FlatList
        data={data} // Array of data
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
