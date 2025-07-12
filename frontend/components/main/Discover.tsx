import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import DiscoverPlaces from '../discover/DiscoverPlaces';
import DiscoverFriends from '../discover/DiscoverFriends';
import { DiscoverProps } from '@/constants/interfaces';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function Discover({ lat, long, token } : DiscoverProps) {

  const [currentTab, setCurrentTab] = useState<'places' | 'friends'>('places');

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={[
        styles.title, 
        {  
          marginBottom: 0, 
          marginTop: 0,
        }
      ]}>
        Discover
      </Text>
      <View style={{backgroundColor:'#000'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 8 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: 3,
              borderBottomColor: currentTab !== 'places' ? 'transparent' : '#1e90ff',
            }}
            onPress={() => setCurrentTab('places')}
          >
            <Text style={{ fontWeight: currentTab !== 'friends' ? 'bold' : 'normal', color: currentTab !== 'friends' ? '#1e90ff' : '#888' }}>
              Places
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: 3,
              borderBottomColor: currentTab !== 'places' ? '#1e90ff' : 'transparent',
            }}
            onPress={() => setCurrentTab('friends')}
          >
            <Text style={{ fontWeight: currentTab !== 'places' ? 'bold' : 'normal', color:currentTab !== 'places' ? '#1e90ff' : '#888' }}>
              Athletes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {currentTab === 'places' && (<DiscoverPlaces lat={lat} long={long} token={token}/>)}
      {currentTab === 'friends' && (<DiscoverFriends lat={lat} long={long} token={token}/>)}
    </View>
  );
}
