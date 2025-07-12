import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import DiscoverCard from './LocationCard';
import { DiscoverProps } from '@/constants/interfaces';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { useDebounce } from '@/hooks/DebounceHook';
import { Location } from '@/constants/interfaces';
import Filters  from '@/components/discover/Filters'
import { getSecureToken } from '@/utils/TokenStorage';


export default function DiscoverPlaces({lat, long, token} : DiscoverProps) {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    const [radius, setRadius] = useState('');
    const debouncedRadius = useDebounce(radius, 500);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [locations, setLocations] = useState<Location[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const onSearch = async (debouncedQuery: string, debouncedRadius: string) => {
        try {

            const response = await fetch(`http://192.168.1.65:3000/api/locations/search?query=${debouncedQuery}&page=${page}&pageSize=${pageSize}&lat=${lat}&long=${long}&radius=${debouncedRadius}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token || await getSecureToken()}`
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
        if (debouncedQuery || debouncedRadius) {
            onSearch(debouncedQuery, debouncedRadius);
        }
    }, [debouncedQuery, debouncedRadius]);
    return (
        <View style={styles.container}>
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
                    color:'#fff'
                    }
                ]}
                placeholder="Search"
                placeholderTextColor={'#808080'}
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
            {showFilters && <Filters radius={radius} setRadius={setRadius}/>}
            <ScrollView style={{
                flex: 1,
                paddingVertical: 12,
                flexDirection: 'column',
                borderTopColor: '#ffffff9a',
                borderTopWidth:2
            }}>
                {locations.length === 0 ? (
                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 20 }}>
                    No locations found.
                </Text>
                ) : (
                locations.map((location) => (
                    <DiscoverCard key={location.id} location={location} lat={lat} long={long}/>
                ))
                )}    
                <View style={{minHeight:100}}>
                </View>
            </ScrollView>
        </View>
    );
}