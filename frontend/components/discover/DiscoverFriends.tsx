import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import { DiscoverProps, User } from '@/constants/interfaces';
import { useUserStore } from '@/utils/UserStore';
import {
  ScrollView,
  Text,
  View,
  TextInput,
} from 'react-native';
import { useDebounce } from '@/hooks/DebounceHook';
import { getSecureToken } from '@/utils/TokenStorage';
import UserCard from './UserCard';



export default function DiscoverFriends({token} : DiscoverProps) {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const debouncedQuery = useDebounce(query, 500);
    const user = useUserStore(state => state.selectedUser);


    const onSearch = async (debouncedQuery: string) => {
        try {
            const response = await fetch(`http://192.168.1.65:3000/api/users/username/${debouncedQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || await getSecureToken()}`
            }
            });
    
            const data  = await response.json();
    
            if (!response.ok || !data) {
                throw new Error(data.message || 'User Search failed');
            }
            
            setUsers(data);
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    }
        
    useEffect(() => {
        if (debouncedQuery ) {
            onSearch(debouncedQuery);
        }
        console.log(users.length);
    }, [debouncedQuery]);

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
            </View>
            <ScrollView style={{
                flex: 1,
                paddingVertical: 12,
                flexDirection: 'column',
                borderTopColor: '#ffffff9a',
                borderTopWidth:2
            }}>
                {users.length === 0 ? (
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 20 }}>
                        No users found.
                    </Text>
                    ) : (
                    users.map((tempUser) => (user?.id != tempUser.id ? <UserCard key={tempUser.id} user={tempUser}/> : ''))
                )}    
                <View style={{minHeight:100}}>
                </View>
            </ScrollView>
        </View>
    );
}