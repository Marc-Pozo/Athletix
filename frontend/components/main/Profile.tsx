import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import { User } from '@/constants/interfaces';
import Posts from '../profile/Posts';
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
      <View style={{
        flex: 1,
        backgroundColor: 'rgb(48, 42, 42)',
        borderRadius: 16,
        alignItems: "flex-start",
        flexDirection:'column'
      }}>
        <View style={{flexDirection:'row'}}>
          <Image style={{
            width:150, 
            height:150, 
            borderRadius: 360, 
            marginVertical: 16,
            marginLeft:16
          }} source={
            {
              uri: 
                user?.is_oauth ? 
                    user?.profile_pic 
                  : 
                    `https://f005.backblazeb2.com/file/athletix-profile-pictures/${user?.profile_pic}`}}/>
          <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>            
            <Text style={[styles.title, {marginBottom: 0, margin:16}]}>{user?.display_name}</Text>
            
            <Text style={[styles.text, {marginBottom: 0}]}>@{user?.username}</Text>
            <View style={{flex:1, flexDirection:'row', marginTop:28}}>
              
              <Text style={[styles.title, {margin: 8}]}>100</Text>
              <Text style={[styles.title, {margin: 8}]}>100</Text>
              <Text style={[styles.title, {margin: 8}]}>1.1k</Text>
            </View>
            
          </View>
        </View>
        
        <Text style={[styles.text, {marginBottom: 0, marginLeft:16, color:'#fff'}]}>St.Petersburg | UCF Alumni</Text>
        <Posts/>
      </View>
    </View>
  );
}
