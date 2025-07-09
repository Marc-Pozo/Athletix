import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import DateOfBirthPicker from '@/components/pickers/DateOfBirthPicker';
import Location from '@/components/signup/UserLocation';
import * as LocationType from 'expo-location';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';

// Used to grab date of birth, sports preferences, and  location
export default function CompleteSignup() {
    const [dob, setDob] = useState('');
    const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());
    const [location, setLocation] = useState<LocationType.LocationObject | null>(null);
    const [user_id, setUser_id] = useState<string | null>(null);
    const [error, setError] = useState('');
    const {token} = useLocalSearchParams();
    const router = useRouter();

    // TODO Fetch sports list from API
    // For now, using a static list
    const sportsList = [
        "Basketball",
        "Soccer",
        "Tennis",
        "Baseball",
        "Volleyball",
        "Golf",
        "Hockey",
        "Swimming",
        "Running",
        "Cycling"
    ];

    const toggleSport = (sport: string) => {
        setSelectedSports(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sport)) {
                newSet.delete(sport);
            } else {
                newSet.add(sport);
            }
            return newSet;
        });
    };

    const handleNext = async () => {
        // Reset errors first
        setError('');

        // Basic checks
        if (!dob) {
            setError('Please fill out your date of birth.');
            return;
        } 

        const userData = {
            date_of_birth: dob,
            sports_preferences: Array.from(selectedSports),
            location: [location?.coords.latitude || 0, location?.coords.longitude || 0]
        };

        const updateUser = await fetch(`http://192.168.1.65:3000/api/users/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        if (!updateUser.ok) {
            const errorData = await updateUser.json();
            throw new Error(errorData.message || 'Error updating user data');
        };
        router.replace({pathname: '/main', params: {token, user_id}});
    };

    useEffect(() => {        
        const getUserId = async () => {
            const response = await fetch(`http://192.168.1.65:3000/api/auth/login/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch user ID');
                return;
            }

            const data = await response.json();  
            if (data && data.user_id) {
                setUser_id(data.user_id);
            }            
        }        
        getUserId();
    }, []);


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <DateOfBirthPicker
                    value={dob}
                    onChange={setDob}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                />
                <Text style={styles.text}>
                    Pick some sports you commonly play
                </Text>
                <ScrollView contentContainerStyle={[
                    styles.container,
                    {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        minHeight: 300
                    }]}>
                    {sportsList.map((sport) => {
                        const isSelected = selectedSports.has(sport);
                        return (
                            <TouchableOpacity
                                key={sport}
                                style={[
                                    styles.button, {
                                    alignSelf: 'flex-start', 
                                    padding: 15, 
                                    backgroundColor: isSelected ? '#4CAF50' : '#a61e1e',
                                    borderColor: isSelected ? '#fff' : '#a61e1e',
                                    borderWidth: 1,
                                }
                                ]}
                                onPress={() => toggleSport(sport)}
                            >
                                <Text style={[
                                    styles.buttonText
                                ]}>
                                    {sport}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                <Location setLocation={setLocation}/>
                {error ? (
                    <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>
                        {error}
                    </Text>
                ) : null}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>        
        </SafeAreaView>
    );
}