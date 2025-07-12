import React, { useState } from 'react';
import { Post } from '@/constants/interfaces';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

interface Props {
  post : Post
}


export default function PostComponent({post} : Props) {

  return (
    <View>
      <TouchableOpacity
        style={{
          width: 135,
          height: 200,
          margin:2,
        }}
      >
        <Image  style={{height:200, width:135,}} source={{uri:`https://f005.backblazeb2.com/file/athletix-profile-pictures/${post.content[0]}`}}/>
      </TouchableOpacity>
    </View>
  );
}
