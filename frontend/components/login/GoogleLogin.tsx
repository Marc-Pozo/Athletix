import * as WebBrowser from 'expo-web-browser';
import { Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { storeTokenSecurely } from '@/utils/TokenStorage';

export default function GoogleLogin() {
    const router = useRouter();
    const handleGoogleLogin = async () => {
        try {
            // Start by opening your backend OAuth route
            const result = await WebBrowser.openAuthSessionAsync(
                'http://192.168.1.65:3000/api/auth/google', 
                'Athletix://redirect'
            );
            // Check if the result is successful
            if (result.type === 'success' && result.url) {
                const url = new URL(result.url);
                const token = url.searchParams.get('token');
                if(!token) {
                    console.error('No token found in the redirect URL');
                    return;
                }
                // Store the token securely
                console.log('Google login successful, token:', token);
                // You can now store the token securely
                storeTokenSecurely(token);
                console.log('Login success');
                router.replace('/main');    
            }
            else if (result.type === 'cancel' || result.type === 'dismiss') {
                console.log('User cancelled the login');
                Alert.alert('Login cancelled', 'You cancelled Google login.');
            } else {
                console.error('OAuth failed:', result);
                Alert.alert('Login failed', 'Could not authenticate with Google.');
            }

        } catch (err) {
            console.error('OAuth error:', err);
            Alert.alert('Login error', 'An unexpected error occurred.');
        }
    };

    return (
        <Button title="Sign in with Google" onPress={handleGoogleLogin} />
    );
}
