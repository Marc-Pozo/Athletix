import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import {
  View,
  Text
} from 'react-native';

export default function Stats() {

  return (
    <View style={styles.safeArea}>
      <Text style={[styles.title, {marginBottom: 0}]}>Stats</Text>
            <View style={{
              flex: 1,
              borderRadius: 16,
              marginTop: 16
            }}>
      
            </View>
    </View>
  );
}
