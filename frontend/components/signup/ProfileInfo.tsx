import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import ProfilePhotoPicker from '../pickers/ProfilePhotoPicker';
import ErrorMessage from '../common/ErrorMessage';
import SwitchWrapper from '../common/SwitchWrapper';
import SportsSelector from '../common/SportsSelector';
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';
import UserLocation from './UserLocation';

type SignupInfoProps = {
    goToNext: () => void;
    updateField: (field: string, value: string | boolean | FormData | string[] ) => void;
};

export default function ProfileInfo({ updateField, goToNext }: SignupInfoProps) {
    const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());    
    const [location, setLocation] = useState(['']);
    const [isEnabled, setIsEnabled] = useState(true);    
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');    

    const toggleSport = (sport: string) => {
        setSelectedSports(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sport)) {
                newSet.delete(sport);
            } else {
                newSet.add(sport);
            }
            updateField('sports_preferences', Array.from(newSet));
            return newSet;
        });
    };

    const handleNext = async () => {
        // Reset errors first
        setError('');

        // Basic checks
        if (!displayName) {
            setError('Please fill out your display name.');
            return;
        }

        // If all good, update parent state and move on
        await updateField('display_name', displayName);
        await updateField('visibility', isEnabled);
        await updateField('location', location);
        goToNext();
    };


    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={styles.title}>
                    Customize your Profile
                </Text>
                <Text style={[styles.text, {alignSelf: 'center', marginBottom: 0}]}>
                    Profile Picture
                </Text>
                <ProfilePhotoPicker updateField={updateField}/>
                <Text style={styles.text}>
                    Display Name, this will be visible to other users
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    onChangeText={setDisplayName}
                />
                <Text style={styles.text}>
                    Pick some sports you commonly play
                </Text>
                <SportsSelector selected={selectedSports} onToggle={toggleSport}/>
                <SwitchWrapper message={"Profile Public Visibility"} setIsEnabled={setIsEnabled} isEnabled={isEnabled}/>
                <UserLocation setLocation={setLocation}/>
            </ScrollView>
            <ErrorMessage error={error}/>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>        
    );
}