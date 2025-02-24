import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const Home = ({ route }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (route.params?.newStory) {
      setStories(prevStories => [route.params.newStory, ...prevStories]);
    }
  }, [route.params?.newStory]);

  return (
    <ScrollView>
      <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>Stories</Text>
      {stories.length === 0 ? (
        <Text style={{ textAlign: 'center', margin: 20 }}>No stories available</Text>
      ) : (
        stories.map((story, index) => (
          <View key={index} style={{ margin: 10, alignItems: 'center' }}>
            <Image source={{ uri: story.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={{ marginTop: 5 }}>{story.caption}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Home;
