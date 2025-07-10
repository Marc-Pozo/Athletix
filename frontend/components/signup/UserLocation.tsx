import React from 'react';
import { 
    View,  
    Button, 
    Alert 
} from 'react-native';
import * as LocationType from 'expo-location';

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Location({ setLocation }: Props) {
    const getLocation = async () => {
        let { status } = await LocationType.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Enable location permissions in settings.');
            return;
        }

        let location = await LocationType.getCurrentPositionAsync({});
        setLocation([`${location.coords.latitude}`, `${location.coords.longitude}`]);
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Get Location" onPress={getLocation} />
        </View>
    );
}
