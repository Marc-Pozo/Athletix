import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import DateOfBirthPicker from '../pickers/DateOfBirthPicker';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';

type SignupInfoProps = {
    goToNext: () => void;
    updateField: (field: string, value: string) => void;
};

export default function PersonalInfo({ updateField, goToNext }: SignupInfoProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');

    //TODO: Add validation for first name, last name, and date of birth fields
    const handleNext = () => {
        // Reset errors first
        setError('');

        // Basic checks
        if (!firstName || !lastName || !dob) {
            setError('Please fill out all fields.');
            return;
        }

        // If all good, update parent state and move on
        updateField('first_name', firstName);
        updateField('last_name', lastName);
        updateField('date_of_birth', dob);

        goToNext();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Text style={styles.title}>
                    Personal Information
                </Text>            
                <Text style={styles.text}>
                    First Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    onChangeText={setFirstName}
                />            
                <Text style={styles.text}>
                    Last Name
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    onChangeText={setLastName}
                />                
                <Text style={styles.text}>
                    Date of Birth
                </Text>
                <DateOfBirthPicker
                    value={dob}
                    onChange={setDob}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                />
                {error ? (
                    <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>
                    {error}
                    </Text>
                ) : null}  
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}