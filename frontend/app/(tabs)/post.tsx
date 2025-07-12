import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import { useRouter } from 'expo-router';
import BackArrow from '@/components/common/BackArrow';
import { useLocationStore } from '@/utils/LocationStore';
import Screen from '@/components/common/Screen';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { sportsList } from '@/constants/interfaces';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const { GOOGLE_API_KEY } = Constants.expoConfig?.extra || {};

export default function Session() {
  const location = useLocationStore(state => state.selectedLocation);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [people, setPeople] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [sport, setSport] = useState('');

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location?.lat},${location?.long}&zoom=15&size=400x400&markers=color:red%7C${location?.lat},${location?.long}&key=${GOOGLE_API_KEY}`;

  
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

    const numPeople = parseInt(people);
    if(!numPeople)
    {
      Alert.alert("Please input the number of people.")
      return;
    }

    router.replace({pathname: '/finishPost', params: {time : formatTime(timer), numPeople, waitTime, sport}});
  }

  return (
    <View style={styles.safeArea}>
      <Screen screenPadding={0}>
      {/* Header */}
      <View style={{
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
        justifyContent: 'center'
      }}>
        <BackArrow onBackButtonPress={onBackButtonPress} />
        <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0
        }}>
        <Text style={[
          styles.title,
          { marginBottom: 0, textAlign: 'center' }
        ]}>
          Post
        </Text>
        </View>
      </View>

      {/* Map */}
      <Image
        source={{ uri: mapUrl }}
        style={{
        width: 400,
        height: 250,
        borderColor: '#a61e1e',
        borderWidth: 2,
        borderRadius: 16,
        alignSelf: 'center'
        }}
      />

      {/* Location Name */}
      <Text style={[
        styles.title,
        {
        color: '#a61e1e',
        marginHorizontal: 16,
        borderBottomColor: '#fff',
        paddingBottom: 8,
        borderBottomWidth: 1,
        marginVertical: 8
        }
      ]}>
        {location?.name}
      </Text>

      {/* Timer */}
      <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 8 }}>
        <Text style={{
        textAlign: 'center',
        fontSize: 60,
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        marginHorizontal: 48,
        borderRadius: 64
        }}>
        {formatTime(timer)}
        </Text>
      </View>

      {/* Inputs */}
      <TextInput
        style={[styles.input, {color:'#fff' }]}
        placeholder="Wait Time (Minutes)"
        placeholderTextColor={'#808080'}
        keyboardType="number-pad"
        returnKeyType="done"
        value={waitTime}
        onChangeText={setWaitTime}
      />
      <TextInput
        style={[styles.input, { marginTop: 8, color:'#fff' }]}
        placeholder="Number of People There"
        value={people}
        placeholderTextColor={'#808080'}
        keyboardType="number-pad"
        returnKeyType="done"
        onChangeText={setPeople}
      />

      {/* Sport Picker */}
      <Picker
        selectedValue={sport}
        onValueChange={setSport}
        style={{
        flex: 1,
        justifyContent: 'center',
        margin: 16,
        maxHeight: 100,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden'
        }}
      >
        {sportsList.map((sport, index) => (
        <Picker.Item key={index} label={sport} value={sport} />
        ))}
      </Picker>
      </Screen>

      {/* Action Buttons */}
      <View style={{
      padding: 24,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between'
      }}>
      <TouchableOpacity
        style={{
        backgroundColor: isRunning ? '#fc3d39' : '#53d769',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginHorizontal: 8,
        flex: isRunning ? 0 : 1,
        width: isRunning ? '45%' : 'auto',
        marginRight: 8
        }}
        onPress={handleSessionChange}
      >
        <Text style={{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
        }}>
        {isRunning ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
      {isRunning && (
        <TouchableOpacity
        style={{
          backgroundColor: '#147efb',
          paddingVertical: 16,
          width: '45%',
          borderRadius: 12,
          alignItems: 'center',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
          marginHorizontal: 8,
          marginLeft: 8
        }}
        onPress={onFinishPress}
        >
        <Text style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 18
        }}>
          Finish
        </Text>
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
}
