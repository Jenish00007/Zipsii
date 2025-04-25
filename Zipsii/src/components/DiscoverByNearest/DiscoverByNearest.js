import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextDefault } from '../../components'; // Assuming TextDefault is a custom text component
import { alignment, colors } from "../../utils";
import { MaterialIcons } from '@expo/vector-icons';

const DiscoverByNearest = (props) => {

  return (
    <View style={styles.container}>
   
          <View key={props.id} style={styles.card}>
            <Image source={{ uri: props.image }} style={styles.cardImage} />
            <View style={styles.titleContainer}>
              <TextDefault numberOfLines={1} style={styles.cardTitle}>{props.title}</TextDefault>
              {props.rating && (
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={14} color={colors.yellowColor} />
                  <TextDefault style={styles.ratingText}>{props.rating}</TextDefault>
                </View>
              )}
            </View>
            <TextDefault numberOfLines={2} style={styles.cardSubtitle}>{props.subtitle}</TextDefault>
          </View>
      
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: colors.white,
  },
 
  card: {
     width: 150,
     height: 200,
     marginRight: 10,
     backgroundColor: colors.white,
     borderRadius: 10,
     ...alignment.PxSmall,
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 1,
     },
     shadowOpacity: 0.1,
     shadowRadius: 2,
     elevation: 2,
     borderWidth: 1,
     borderColor: '#F0F0F0', // Very light gray color for subtle border
   },
   cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.fontMainColor,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    marginRight: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: colors.fontMainColor,
    marginLeft: 2,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.fontThirdColor,
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
});

export default DiscoverByNearest;
