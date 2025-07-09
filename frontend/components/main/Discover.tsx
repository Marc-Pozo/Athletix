import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import DiscoverCard from '../discover/DiscoverCard';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { getSecureToken } from '@/utils/TokenStorage';

interface Props{
  lat: string,
  long: string,
  token: string
}

export default function Discover({ lat, long, token } : Props) {

  const [query, setQuery] = useState('');
  const [has_office, setHasOffice] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const onSearch = async () => {
    const response = await fetch(`http://192.168.1.65:3000/api/locations/search?query=${query}&page=${page}&pageSize=${pageSize}&lat=${lat}&long=${long}&radius=${radius}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Search failed');
    }
    console.log(data);    
  }


  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={[
        styles.title, 
        {  
          marginBottom: 0, 
          marginTop: 0,
          paddingTop: 8,
        }
      ]}>
        Discover
      </Text>
      <View style={{ 
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 8,
      }}>
        <TextInput
          style={[
            styles.input, 
            {                  
              height: 40,
              flex: 1,
              marginTop: 16,
              marginRight: 8,
              borderRadius: 32,
            }
          ]}
          placeholder="Search"
          placeholderTextColor={styles.input.color}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={() => onSearch()}
        />
        <TouchableOpacity style={[
          {
            width: 40,
            height: 40,
            justifyContent: 'center',   
            alignItems: 'center',                          
            marginTop: 16,          
            paddingVertical: 14,
            
            borderRadius: 360,
            borderColor: '#ffffff',
            borderWidth: 1,
          }
        ]}>
          <Image
              source={require('../../assets/images/filter.png')}
              style={{ width: 20, height: 20, }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{
        flex: 1,
        paddingVertical: 8,
        marginBottom: 16,
        backgroundColor: 'rgb(48, 42, 42)',
        flexDirection: 'column',
        borderRadius: 16,
      }}>
        <DiscoverCard/>    
        <DiscoverCard/>  
        <DiscoverCard/>     
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
