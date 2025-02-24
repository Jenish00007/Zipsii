import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddCaption = ({ route }) => {
  const navigation = useNavigation();
  const { image } = route.params;
  const [caption, setCaption] = useState('');

  const postStory = () => {
    navigation.navigate('Home', { newStory: { image, caption } });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 10 }} />
      <TextInput
        placeholder="Add a caption..."
        value={caption}
        onChangeText={setCaption}
        style={{ width: '100%', padding: 10, borderBottomWidth: 1, marginVertical: 20 }}
      />
      <TouchableOpacity onPress={postStory} style={{ backgroundColor: '#405de6', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Post Story</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCaption;
