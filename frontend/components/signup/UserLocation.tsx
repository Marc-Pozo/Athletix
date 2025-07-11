import React from 'react';
import { 
    View,  
    Text, 
    Alert, 
    TouchableOpacity
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
        <TouchableOpacity onPress={getLocation} style={{ marginTop:16, paddingVertical:16, backgroundColor: '#fff', borderRadius: 64, width: 175, alignSelf:'center'}} >
            <Text style={{color:'#007AFF',textAlign:"center", fontSize:20}}>
                Get Location
            </Text>
        </TouchableOpacity>
    );
}
