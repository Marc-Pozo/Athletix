import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
export default function Posts() {

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'rgba(65, 57, 57, 1)',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 18,
        flexDirection: 'row',
        flexWrap: 'wrap',    
        justifyContent: 'center',
        padding:0,
        paddingTop:2,
        paddingHorizontal:1,
        height:'auto'
      }}
      horizontal={false}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Text
          key={i}
          style={{
            width: 140,
            height: 140,
            textAlign: 'center',
            backgroundColor:'#000',
            textAlignVertical: 'center',
            margin:1,
            borderRadius: 8

          }}
        >
        </Text>
      ))}
    </ScrollView>
  );
}
