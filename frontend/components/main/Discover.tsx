import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import DiscoverCard from '../discover/DiscoverCard';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';

export default function Discover() {

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={[
        styles.title, 
        {  
          marginBottom: 0, 
          marginTop: 0,
          paddingTop: 8,
        }
      ]}>
        Discover
      </Text>
      <View style={{ 
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 8,
      }}>
        <TextInput
          style={[
            styles.input, 
            {                  
              height: 40,
              flex: 1,
              marginTop: 16,
              marginRight: 8,
              borderRadius: 32,
            }
          ]}
          placeholder="Search"
          placeholderTextColor={styles.input.color}
          returnKeyType="search"
        />
        <TouchableOpacity style={[
          {
            width: 40,
            height: 40,
            justifyContent: 'center',   
            alignItems: 'center',                          
            marginTop: 16,          
            paddingVertical: 14,
            
            borderRadius: 360,
            borderColor: '#ffffff',
            borderWidth: 1,
          }
        ]}>
          <Image
              source={require('../../assets/images/filter.png')}
              style={{ width: 20, height: 20, }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{
        flex: 1,
        paddingVertical: 8,
        marginBottom: 16,
        backgroundColor: 'rgb(48, 42, 42)',
        flexDirection: 'column',
        borderRadius: 16,
      }}>
        <DiscoverCard/>    
        <DiscoverCard/>  
        <DiscoverCard/>     
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
