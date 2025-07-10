import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import Footer from '../../components/main/Footer';
import Home from '../../components/main/Home';
import Discover from '../../components/main/Discover';
import Session from '../../components/main/Session';
import Stats from '../../components/main/Stats';
import Profile from '../../components/main/Profile';
import { User } from '@/constants/interfaces';
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/components/common/Screen';
import { View } from 'react-native';


export default function Main() {
  const {token, user_id} = useLocalSearchParams();
  const [navigation, setNavigation] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const setupUser = async () => {
          const response = await fetch(`http://192.168.1.65:3000/api/users/${user_id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });
          
          const data = await response.json();
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to retrieve user data');
          }
      
          setUser(data);
    };
    setupUser();
  }, []);



  return (
    <View style={styles.safeArea}>
      <View style={[styles.container,{ marginTop: 48}]}>
        {navigation === 0 && <Home />}
        {navigation === 1 && <Discover lat={user?.location?.[0] || ''} long={user?.location?.[1] || ''} token={token as string} />}
        {navigation === 2 && <Session />}
        {navigation === 3 && <Stats />}
        {navigation === 4 && <Profile user={user}/>}
      </View>
      <Footer setNavigation={setNavigation} />
    </View>
    
  );
}
