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
    imageUri: FormData,
    setImageUri: (uri : FormData) => void;
};

export default function PostPhotoPicker({ imageUri, setImageUri }: SignupInfoProps) {

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

            setImageUri(profilePic);
        }
    };

    return (
        <View style={[styles.container, {flex: 1, alignItems: 'center', justifyContent:'center' }]}>
            <TouchableOpacity onPress={pickImage} style={{
                height: 120, 
                width: 120, 
                borderColor: '#fff',
                borderRadius: 16,
                borderWidth: 1,
                borderStyle: 'dashed', 
                alignItems: 'center', 
                justifyContent:'center',
            }}>
                {imageUri && (imageUri as any)._parts && (imageUri as any)._parts.length > 0 ? (
                    <Image
                        source={{ uri: (imageUri as any)._parts[0][1].uri }}
                        style={{ height: '100%', width: '100%', borderRadius: 16, padding: 1 }}
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/FooterIcons/post-icon.png')}
                        style={{ height: '50%', width: '50%' }}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}
