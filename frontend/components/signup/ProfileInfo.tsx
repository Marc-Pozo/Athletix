// Display name, Private/Public toggle, sports tags, location, profile picture
// Maybe split this into multiple components later

import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import ProfilePhotoPicker from '../pickers/ImagePicker'; 
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    View,
    KeyboardAvoidingView
} from 'react-native';

type SignupInfoProps = {
    handleSignup: () => void;
    updateField: (field: string, value: string | boolean | FormData | string[] ) => void;
};

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

export default function ProfileInfo({ updateField, handleSignup }: SignupInfoProps) {

    const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());
    const [isEnabled, setIsEnabled] = useState(false);    
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    

    const toggleSwitch = () => {
        setIsEnabled(prev =>  !prev)
        updateField('visibility', isEnabled);
    };

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
        
        handleSignup();
    };


    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Text style={styles.title}>
                    Customize your Profile
                </Text>            
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent:'flex-start',
                        gap: 10 
                        }}>
                        <Text style={[styles.text, { marginVertical: 15 }]}>
                            Want to make your profile private?
                        </Text>
                        <Switch
                            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>                    
                    {error ? (
                        <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>
                            {error}
                        </Text>
                    ) : null}
                </ScrollView> 
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        
    );
}