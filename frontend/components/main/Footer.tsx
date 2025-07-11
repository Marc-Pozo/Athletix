import React from 'react';
import { 
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { styles } from '../../constants/styles';

type FooterProps = {
  setNavigation: React.Dispatch<React.SetStateAction<number>>;
};

const Footer = ({ setNavigation }: FooterProps) => {
  return (
    <View style={[styles.footer, { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100, marginBottom:24, justifyContent:'center',gap:16 }]}>
      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(0)}>
        <Image
          source={require('../../assets/images/FooterIcons/home-icon.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(1)}>
        <Image
          source={require('../../assets/images/FooterIcons/search-icon.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(3)}>
        <Image
          source={require('../../assets/images/FooterIcons/stats-icon.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerButton} onPress={() => setNavigation(4)}>
        <Image
          source={require('../../assets/images/FooterIcons/profile-icon.png')}
          style={{ width: 36, height: 36 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;


