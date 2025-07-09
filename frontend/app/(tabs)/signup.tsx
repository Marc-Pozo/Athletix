import React, { use, useState } from 'react';
import { useRouter } from 'expo-router';
import  LoginInfo from '../../components/signup/LoginInfo';
import PersonalInfo from '../../components/signup/PersonalInfo';
import ProfileInfo from '../../components/signup/ProfileInfo';
import { styles } from '../../constants/styles';
import { storeTokenSecurely } from '@/utils/TokenStorage';
import {
  Image,
  SafeAreaView,
  View,
} from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState({
      email: '',
      password: '',
      display_name: '',
      first_name: '',
      last_name: '',
      username: '',
      date_of_birth: '',
      sports_preferences: [],
      visibility: false,
      profile_pic: '',
      profile_pic_uri: new FormData(),
      location: ''
  });

  const goToNext = () => setStep(prev => prev + 1);

  const updateField = async (field: string, value: any) => {      
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  // Handle signup logic
  // Sends a POST request to the backend with signup data
  const handleSignup = async () => {
    try {
      // If they uploaded a profile picture send a call to upload it to backblaze
      if(signupData.profile_pic_uri instanceof FormData && signupData.profile_pic_uri.has('file'))
      {
        const imageUploadResponse = await fetch('http://192.168.1.65:3000/api/backblaze/one', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: signupData.profile_pic_uri,
        });
        if (!imageUploadResponse.ok) {
            const errorData = await imageUploadResponse.json();
            throw new Error(errorData.message || 'Image upload failed');
        }
        // Store the image name
        const json = await imageUploadResponse.json();
        signupData.profile_pic = json.fileName;
      }
      else{
        // If no profile picture was uploaded, set a default one
        signupData.profile_pic = '1752016295786_logo.png';
      }
      
      const signupResponse = await fetch('http://192.168.1.65:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      
      // Check if the signup was successful
      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      // Store the token
      const {token, user_id} = await signupResponse.json();

      await storeTokenSecurely(token);
      // Go to main page
      router.replace({pathname: '/main', params: {token, user_id}});
    }
    catch (error) {
      console.error('Signup error:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={styles.container}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 100, 
            height: 100,
            alignSelf: 'center',
            marginBottom: 30 
          }}
        />
        {step === 1 && (
          <LoginInfo 
            updateField={updateField}
            goToNext={goToNext}
          />
        )}
        {step === 2 && (
          <PersonalInfo
            updateField={updateField}
            goToNext={goToNext}
          />
        )} 
        {step === 3 && (
          <ProfileInfo
            updateField={updateField}
            handleSignup={handleSignup}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

