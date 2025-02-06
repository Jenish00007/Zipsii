import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

import BottomTab from '../../components/BottomTab/BottomTab';
import { BackHeader } from '../../components';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../../utils';
import MainBtn from '../../ui/Buttons/MainBtn';
import { AntDesign } from '@expo/vector-icons';

function Destination({ route, navigation }) {
  const { image, cardTitle, subtitle } = route.params;
  const [comment, setComment] = useState('');

  const backPressed = () => {
    navigation.goBack();
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('Comment:', comment);
      setComment('');
    }
  };

  const handleMainBtnPress = () => {
    console.log('Main Button Pressed');
  };

  return (
    <View style={styles.container}>
      {/* Destination Details */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.detailImage} />
          <BackHeader 
            title="Details" 
            backPressed={backPressed} 
            style={{ position: 'absolute', top: 50, left: 20, right: 20 }} 
          />
        </View>

        {/* Detail Container */}
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>{cardTitle}</Text>
          <View style={styles.subtitleContainer}>
  <SimpleLineIcons name="location-pin" size={18} color={colors.fontThirdColor} />
  <Text style={styles.detailSubtitle}>{subtitle}</Text>

  {/* Wrap in TouchableOpacity for handling press */}
  <TouchableOpacity onPress={() => navigation.navigate("Review")} style={[styles.ratingsContainer, { marginLeft: 10 }]}>
    <AntDesign name="star" size={18} color="#FFD700" />
    <Text style={styles.ratingsText}>4.7</Text>
    <Text style={styles.ratingsCount}>(2498)</Text>
  </TouchableOpacity>
</View>

          {/* About Destination */}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutTitle}>About Destination</Text>
            <Text style={styles.aboutText}>
              You will get a complete travel package on the beaches.{" "}
              <Text style={styles.readMore}>Read More</Text>
            </Text>
          </View>

          {/* Comments */}
          <View style={styles.commentContainer}>
            <Text style={styles.commentTitle}>Leave a comment</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Say something..."
                placeholderTextColor={colors.fontThirdColor}
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          <MainBtn text="Make a schedule" 
          onPress={()=>
            navigation.navigate('MakeSchedule')
          } style={{ marginTop: 20 }} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab screen="WhereToGo" style={styles.bottomTab} />
    </View>
  );
}

export default Destination;
