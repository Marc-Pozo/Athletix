import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackArrow from '@/components/common/BackArrow';
import { useLocationStore } from '@/utils/LocationStore';
import Screen from '@/components/common/Screen';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Session() {
  const {place_id, name} = useLocalSearchParams();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined | number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleSessionChange = () => {
    setIsRunning(!isRunning);
  };

  const onBackButtonPress = () => {
    router.back();
  }

  const onFinishPress = () => {
    // TODO: This will take the user to the flow to finish their post
    router.replace('/main');
  }

  return (
    <Screen screenPadding={0} >
      <SafeAreaView style={styles.safeArea}>
          <BackArrow onBackButtonPress={onBackButtonPress}/>
          <Text style={[styles.title, {marginHorizontal:16 , borderBottomColor:'#fff', borderBottomWidth:1}]}>{name}</Text>
          <Text style={{textAlign:'center', fontSize: 60, color:'#fff', }}>{formatTime(timer)}</Text>
            <View style={{ padding: 24, backgroundColor: 'transparent' }}>
                <TouchableOpacity
                    style={{
                      backgroundColor: isRunning ? '#fc3d39':'#53d769',
                      paddingVertical: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                    onPress={handleSessionChange}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{isRunning ? 'Stop Session' : 'Start Session'}</Text>
                </TouchableOpacity>
                {isRunning && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#53d769',
                      paddingVertical: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 4,
                      marginTop: 16
                    }}
                    onPress={onFinishPress}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Finish?</Text>
                </TouchableOpacity>
                )}
            </View>
      </SafeAreaView>
    </Screen>
    
  );
}
