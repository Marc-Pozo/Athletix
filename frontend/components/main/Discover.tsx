import React, { useState, useEffect } from 'react';
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
import { useDebounce } from '@/hooks/DebounceHook';
import { Location } from '@/constants/interfaces';
import Filters  from '@/components/discover/Filters'

interface Props{
  lat: string,
  long: string,
  token: string
}

export default function Discover({ lat, long, token } : Props) {

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [has_office, setHasOffice] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showFilters, setShowFilters] = useState(false);


  const onSearch = async (debouncedQuery: string) => {
    try {
      const response = await fetch(`http://192.168.1.65:3000/api/locations/search?query=${debouncedQuery}&page=${page}&pageSize=${pageSize}&lat=${lat}&long=${long}&radius=${radius}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Search failed');
      }

      setLocations(data.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  }
  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

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
        />
        <TouchableOpacity onPress={() => {setShowFilters(!showFilters)}}
          style={[
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
        {showFilters && <Filters/>}
      <ScrollView style={{
        flex: 1,
        paddingVertical: 8,
        backgroundColor: 'rgb(48, 42, 42)',
        flexDirection: 'column',
        borderRadius: 16,
      }}>
        {locations.length === 0 ? (
          <Text style={{ color: 'white', alignSelf: 'center', marginTop: 20 }}>
            No locations found.
          </Text>
        ) : (
          locations.map((location) => (
            <DiscoverCard key={location.id} location={location} />
          ))
        )}    
      </ScrollView>
    </View>
  );
}
