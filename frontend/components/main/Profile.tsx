import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import { User } from '@/constants/interfaces';
import {
  Text,
  View,
  Image
} from 'react-native';

interface Props {
  user: User | null
}

export default function Profile({user}: Props) {

  return (
    <View style={styles.safeArea}>
      <Text style={[styles.title, {marginBottom: 0}]}>Profile</Text>
            <View style={{
              flex: 1,
              backgroundColor: 'rgb(48, 42, 42)',
              borderRadius: 16,
              marginTop: 16,
              alignItems: "center"
            }}>
              
              <Image style={{
                width:200, 
                height:200, 
                borderRadius: 360, 
                borderColor: '#fff', 
                borderWidth: 1,
                marginTop: 16
              }} source={
                {
                  uri: 
                    user?.is_oauth ? 
                        user?.profile_pic 
                      : 
                        `https://f005.backblazeb2.com/file/athletix-profile-pictures/uploads/${user?.profile_pic}`}}/>
              <Text style={[styles.title, {marginBottom: 0, margin:16}]}>{user?.display_name}</Text>

            </View>
    </View>
  );
}
