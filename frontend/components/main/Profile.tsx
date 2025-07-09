import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import {
  SafeAreaView,
  Text
} from 'react-native';

export default function Profile() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
