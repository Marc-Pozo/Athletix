import React, { useState } from 'react';
import { RelativePathString,} from 'expo-router';
import { 
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { styles } from '../../constants/styles';

type FooterProps = {
  setNavigation: React.Dispatch<React.SetStateAction<number>>;
};

const Footer = ({setNavigation} : FooterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(0)}>
        <Image
            source={require('../../assets/images/FooterIcons/home-icon.png')}
            style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(1)}>
        <Image
            source={require('../../assets/images/FooterIcons/search-icon.png')}
            style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(2)}>
        <Image
            source={require('../../assets/images/FooterIcons/post-icon.png')}
            style={{ width: 48, height: 48 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(3)}>
        <Image
            source={require('../../assets/images/FooterIcons/stats-icon.png')}
            style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(4)}>
        <Image
            source={require('../../assets/images/FooterIcons/profile-icon.png')}
            style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;


