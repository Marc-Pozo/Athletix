import React, { useState } from 'react';
import { styles } from '../../constants/styles';
import { 
    View,
    Text,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type SignupInfoProps = {
    updateField: (field: string, value: string | boolean | FormData) => void;
};

export default function ProfilePhotoPicker({ updateField }: SignupInfoProps) {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        // Ask permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions!');
            return;
        }

        // Open image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            
            const image = result.assets[0];
            const profilePic = new FormData();

            profilePic.append('file', {            
                uri: image.uri,
                name: image.fileName,
                type: image.type
            } as any);

            setImageUri(result.assets[0].uri);
            updateField('profile_pic_uri', profilePic);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            updateField('profile_pic_uri', result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={{alignItems: 'center', marginBottom: 20}}>
                {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                <View>
                    <Text style={{ color: '#888' }}>Tap to select photo</Text>
                </View>
                )}
            </TouchableOpacity>
            <Button title="Take a Photo" onPress={takePhoto} />
        </View>
    );
}
