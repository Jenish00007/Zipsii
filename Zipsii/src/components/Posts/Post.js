import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Post = (props) => {
  const [like, setLike] = useState(props.isLiked);
  
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
         
          <Text style={styles.userName}>{props.postTitle}</Text>
        </View>
        <Feather name="more-vertical" style={styles.moreIcon} />
      </View>

      <View style={styles.postImageContainer}>
        <Image
          source={props.postImage}
          style={styles.postImage}
        />
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={[styles.likeIcon, { color: like ? 'red' : 'black' }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionic name="ios-chatbubble-outline" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="navigation" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Feather name="bookmark" style={styles.bookmarkIcon} />
      </View>

      <View style={styles.likesContainer}>
        <Text>
          Liked by {like ? 'you and' : ''} {like ? props.likes + 1 : props.likes} others
        </Text>
        <Text style={styles.description}>
          If you enjoy the video! Please like and Subscribe
        </Text>
        <Text style={styles.viewComments}>View all comments</Text>
      </View>

      <View style={styles.commentSection}>
        <View style={styles.commentInputContainer}>
          <Image
            source={props.postPersonImage}
            style={styles.commentUserImage}
          />
          <TextInput
            placeholder="Add a comment"
            style={styles.commentInput}
          />
        </View>
        <View style={styles.emojiContainer}>
          <Entypo name="emoji-happy" style={[styles.emojiIcon, { color: 'lightgreen' }]} />
          <Entypo name="emoji-neutral" style={[styles.emojiIcon, { color: 'pink' }]} />
          <Entypo name="emoji-sad" style={[styles.emojiIcon, { color: 'red' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userName: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  moreIcon: {
    fontSize: 20,
  },
  postImageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    marginRight: 20,
    height: 400,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    paddingRight: 10,
    fontSize: 20,
  },
  icon: {
    fontSize: 20,
    paddingRight: 10,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  likesContainer: {
    paddingHorizontal: 15,
  },
  description: {
    fontWeight: '700',
    fontSize: 14,
    paddingVertical: 2,
  },
  viewComments: {
    opacity: 0.4,
    paddingVertical: 2,
  },
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUserImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginRight: 10,
  },
  commentInput: {
    opacity: 0.5,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiIcon: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default Post;
