import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import Footer from '../../components/main/Footer';
import Home from '../../components/main/Home';
import Discover from '../../components/main/Discover';
import Post from '../../components/main/Post';
import Stats from '../../components/main/Stats';
import Profile from '../../components/main/Profile';
import {
    SafeAreaView,
    View
} from 'react-native';


export default function Main() {

  const [navigation, setNavigation] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container, 
          {
            padding: 0
          }
      ]}
      >
        {navigation === 0 && <Home />}
        {navigation === 1 && <Discover />}
        {navigation === 2 && <Post />}
        {navigation === 3 && <Stats />}
        {navigation === 4 && <Profile />}

      </View>
      <Footer setNavigation={setNavigation} />
    </SafeAreaView>
  );
}
