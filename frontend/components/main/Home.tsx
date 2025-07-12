import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import {
  Text,
  View
} from 'react-native';

export default function Home() {

  return (
    <View style={styles.safeArea}>
      <Text style={[styles.title, {marginBottom: 0}]}>Home</Text>
      <View style={{
        flex: 1,
        borderRadius: 16,
        marginTop: 16
      }}>

      </View>
    </View>
  );
}
