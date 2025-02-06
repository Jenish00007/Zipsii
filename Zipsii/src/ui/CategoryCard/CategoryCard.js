import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { TextDefault } from '../../components';

function CategoryCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('WhereToGo', {
          id: props.id,
          title: props.cardLabel,
        })
      }
      style={[styles.container, props.style]}
    >
      <View style={styles.iconContainer}>
        {/* Dummy image will now render inside all iconContainers */}
        {/* <Image
          source={require('../../assets/th1.jpeg')}
          style={styles.dummyImage}
        /> */}
        {/* <Image source={props.icon} style={styles.icon} /> */}
      </View>
      <View style={styles.textContainer}>
        <TextDefault numberOfLines={1} H5>
        Place
        </TextDefault>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(CategoryCard);
