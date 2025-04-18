import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextDefault } from '../../components'; // Assuming TextDefault is a custom text component
import { alignment, colors } from "../../utils";

const DiscoverByNearest = (props) => {

  return (
    <View style={styles.container}>
   
          <View key={props.id} style={styles.card}>
            <Image source={{ uri: props.image }} style={styles.cardImage} />
            <TextDefault numberOfLines={1} style={styles.cardTitle}>{props.title}</TextDefault>
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
     height: 180,
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
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.fontThirdColor,
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
});

export default DiscoverByNearest;
