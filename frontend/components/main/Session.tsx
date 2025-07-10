import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import {
  SafeAreaView,
  Text,
  View
} from 'react-native';

export default function Session() {

  return (
    <View style={styles.safeArea}>
      <Text style={[styles.title, {marginBottom: 0}]}>Start Session</Text>
      <View style={{
        flex: 1,
        backgroundColor: 'rgb(48, 42, 42)',
        borderRadius: 16,
        marginTop: 16
      }}>

      </View>
    </View>
  );
}
