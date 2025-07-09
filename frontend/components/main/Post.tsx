import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import {
  SafeAreaView,
  Text
} from 'react-native';

export default function Post() {

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Post</Text>
    </SafeAreaView>
  );
}
