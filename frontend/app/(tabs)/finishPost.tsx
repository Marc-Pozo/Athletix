import { useLocalSearchParams } from 'expo-router';
import { styles } from '@/constants/styles';
import { Post } from '@/constants/interfaces';
import { useLocationStore } from '@/utils/LocationStore';
import { useUserStore } from '@/utils/UserStore';
import Screen from '@/components/common/Screen';
import BackArrow from '@/components/common/BackArrow';
import { useRouter } from 'expo-router';
import PostPhotoPicker from '@/components/pickers/PostPhotoPicker';
import { getSecureToken } from '@/utils/TokenStorage';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';


export default function FinishPost() {
    const user = useUserStore(state => state.selectedUser);
    const location = useLocationStore(state => state.selectedLocation);
    const {time, numPeople, waitTime, sport} = useLocalSearchParams();
    const router = useRouter();

    const [caption, setCaption] = useState('');
    const [gamesPlayed, setGamesPlayed] = useState('');
    const [winLoss, setWinLoss] = useState('');
    const [images, setImages] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(false);

    // Helper to update a specific image slot
    const setImageAtIndex = (index: number, uri: FormData) => {
        setImages(prev => {
            const updated = [...prev];
            updated[index] = uri;
            return updated;
        });
    };

    const uploadContent = async (contentUri: FormData) => {

        const imageUploadResponse = await fetch(`http://192.168.1.65:3000/api/backblaze/one?type=post&id=${user?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: contentUri,
        });
        if (!imageUploadResponse.ok) {
            const errorData = await imageUploadResponse.json();
            throw new Error(errorData.message || 'Image upload failed');
        }
        // Store the image name
        const json = await imageUploadResponse.json();
        return json;
    };

    const submitPost = async () => {

        setLoading(true);
        const contentUris= ['','',''];

        if( location && user)
        {
            // Upload the images to backblaze
            for (let i = 0; i < images.length; i++) {
                if (images[i]) {
                    contentUris[i] = await uploadContent(images[i]);
                }
            }

            const buildPost : Partial<Post> = {
                user_id: user?.id,
                session_length: time as string,
                location_id: location?.id,
                num_people: parseInt(numPeople as string),
                wait_time: waitTime as string,
                sport: sport as string,
                win_loss: parseFloat(winLoss) || 0,
                games_played: parseInt(gamesPlayed) || 0,
                skill_level: user?.skill_level || 'Beginner',
                content: contentUris,
                caption: caption
            }
            
            const createPost = await fetch('http://192.168.1.65:3000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${await getSecureToken()}`
                },
                body: JSON.stringify(buildPost),
            });
            if (!createPost.ok) {
                const errorData = await createPost.json();
                throw new Error(errorData.message || 'Post creation failed');
            }

            const json = await createPost.json();
            router.replace('/main');
        }
        else {
            return Alert.alert('Post Error', 'User or Location not found!');
        }
    }

    
    const onBackButtonPress = () => {
        router.back();
    }

    return (
        <Screen screenPadding={0} >
            <LoadingSpinner loading={loading}/>
            {!loading && (<View style={styles.safeArea}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 16 }}>
                        <BackArrow onBackButtonPress={onBackButtonPress}/>
                        <Text style={[styles.title, { marginBottom: 0, textAlign: 'center', }]}>Upload Post</Text>
                    </View>
                    
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#1f1e1c',
                            borderRadius: 16,
                            marginHorizontal: 24,
                            marginVertical:12,
                            padding: 12,
                            alignSelf: 'center',
                            gap: 16
                        }}
                    >
                        <PostPhotoPicker setImageUri={(uri) => {setImageAtIndex(0,uri)}} imageUri={images[0]} />
                        <PostPhotoPicker setImageUri={(uri) => {setImageAtIndex(1,uri)}} imageUri={images[1]} />
                        <PostPhotoPicker setImageUri={(uri) => {setImageAtIndex(2,uri)}} imageUri={images[2]} />
                    </View>          
                    <View style={{paddingHorizontal:24,}}>
                        <TextInput 
                            style={[styles.input, {color: '#fff'}]}
                            placeholder='Caption Your Post'
                            value={caption}
                            onChangeText={setCaption}
                            placeholderTextColor={'#808080'}
                        />
                        <TextInput 
                            style={[styles.input, {color: '#fff'}]}
                            keyboardType='number-pad'
                            returnKeyType='done'
                            placeholder='Number of Games Played'
                            value={gamesPlayed}
                            onChangeText={setGamesPlayed}
                            placeholderTextColor={'#808080'}
                        />
                        <TextInput 
                            style={[styles.input, {color: '#fff'}]}
                            keyboardType='decimal-pad'
                            returnKeyType='done'
                            placeholder='Win/Loss Ratio'
                            value={winLoss}
                            onChangeText={setWinLoss}
                            placeholderTextColor={'#808080'}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 32 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#147efb',
                                paddingVertical: 16,
                                borderRadius: 12,
                                alignItems: 'center',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 4,
                                marginHorizontal: 24,
                            }}
                            onPress={submitPost}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 18
                            }}>
                                Finish
                            </Text>
                        </TouchableOpacity>
                    </View>
                              
            </View>)}
        </Screen>
    )

}