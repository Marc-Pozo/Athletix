import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocationType from 'expo-location';

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<LocationType.LocationObject | null>>;
};

export default function Location({ setLocation }: Props) {
    const getLocation = async () => {
        let { status } = await LocationType.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Enable location permissions in settings.');
            return;
        }

        let location = await LocationType.getCurrentPositionAsync({});
        console.log('Location:', location);
        setLocation(location);
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Get Location" onPress={getLocation} />
        </View>
    );
}
