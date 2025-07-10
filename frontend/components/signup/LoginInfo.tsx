// Email, password
import React, {useState} from 'react';
import { styles } from '../../constants/styles';
import ErrorMessage from '../common/ErrorMessage';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

type SignupInfoProps = {
    goToNext: () => void;
    updateField: (field: string, value: string) => void;
};

export default function LoginInfo({ updateField, goToNext }: SignupInfoProps) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState('');

    // Handle the "Next" button click
    // Validates the input and updates the parent component's state
    const handleNext = () => {
        // Reset errors first
        setError('');

        // Basic checks
        if (!email || !username || !password || !retypePassword) {
            setError('Please fill out all fields.');
            return;
        }

        if (password !== retypePassword) {
            setError('Passwords do not match.');
            return;
        }
        
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        // If all good, update parent state and move on
        updateField('email', email);
        updateField('username', username);
        updateField('password', password);

        goToNext();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={styles.title}>
                Account Information
            </Text>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>                     
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <Text style={styles.text}>Email Address</Text>                    
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    onChangeText={setUsername}
                />
                <Text style={styles.text}>Your unique @ for Athletix</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />
                <Text style={styles.text}>Password (8 Character Minimum)</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Re-enter Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={setRetypePassword}
                />
                <Text style={styles.text}>Re-enter Password</Text>
                <ErrorMessage error={error}/>           
            </ScrollView>                
            <TouchableOpacity style={[styles.button]} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}
