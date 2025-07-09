import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { styles } from '../../constants/styles';
import { storeTokenSecurely, verifySecureToken } from '@/utils/TokenStorage';
import GoogleLogin from '@/components/login/GoogleLogin';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle login logic
  // Sends a POST request to the backend with email and password
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://192.168.1.65:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const {token, user_id} = await response.json();
      await storeTokenSecurely(token);

      console.log('Login success');
      router.replace({pathname: '/main', params: {token, user_id}});

    } catch (err : any) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check for secure token on component mount
  // If token exists, redirect to main screen
  useEffect(() => {
    const checkToken = async () => {
      try {
        // Grab the token from secure storage and verifys it with the backend
        console.log('Checking for secure token...');
        setLoading(true);
        const data = await verifySecureToken();
        
        if (data) {
          const token = data.token;
          const user_id = data.user_id;
          console.log('Login success');
          router.replace({pathname: '/main', params: {token, user_id}});
        } 
        else {
          console.log('No token found');
        }
      } catch (e) {
        console.error('Failed to check token', e);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 200 , height: 200, alignSelf: 'center', marginBottom: 30 }}
        />
        
        {loading && (
          <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        )}
        {!loading && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <Text style={[
              styles.linkText, {
                textAlign:"left",
                fontSize: 16,
              }
              ]}>
                Forgot Password?
            </Text>
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
            </TouchableOpacity>
            {error && <Text style={{ color: 'red', marginTop: 10}}>{"Error logging in..."}</Text>}    
            
            <View style= {{
              borderTopWidth: 1,
              borderTopColor: '#fff',
              justifyContent: 'center',
              alignContent:'center',
              marginTop: 16,
              width: '100%',
            }}>
              <Text style={[styles.footerText, {marginBottom:16}]}>
                Don't have an account?          
              </Text>
              <TouchableOpacity style={[
              styles.linkText, {
                justifyContent:"center",
                borderRadius: 8,
                width: '30%',
                padding: 8,
                backgroundColor: '#a61e1e',
                alignSelf: 'center',
              }
              ]} onPress={() => router.push('/signup')}>
                <Text style={[styles.buttonText, {textAlign: 'center'}]}>
                  Sign up
                </Text>
              </TouchableOpacity>
              <Text style={[styles.footerText, {marginTop: 0, marginBottom: 16}]}>
                or
              </Text>
              <GoogleLogin />         
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
