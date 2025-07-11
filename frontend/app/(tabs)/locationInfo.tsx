import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import { useLocationStore } from '@/utils/LocationStore';
import Constants from 'expo-constants';
import BackArrow from '@/components/common/BackArrow';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';


const { GOOGLE_API_KEY, PHOTO_URL } = Constants.expoConfig?.extra || {};

export default function LocationInfo() {
    const location = useLocationStore(state => state.selectedLocation);
    const [activeTab, setActiveTab] = useState<'feed' | 'posts'>('feed');
    const router = useRouter();


    const onBackButtonPress = () => {
        router.back();
    }

    const onPostButtonPress = () => {
    }

    if (!location) {
        return <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>No location selected.</Text>
    }

    return (
        <Screen screenPadding={0} >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 16 }}>
                    <BackArrow onBackButtonPress={onBackButtonPress}/>
                    <Text style={[styles.title, { marginBottom: 0, textAlign: 'center', }]}>Location Info</Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={{ uri: `${PHOTO_URL}${location.image_uri}&key=${GOOGLE_API_KEY}` }}
                        style={{
                            width: '100%',
                            height: 220,
                            borderRadius: 24,
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                        {location.name}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#A0A3B1', textAlign: 'center' }}>
                        {location.address}
                    </Text>
                </View>
                {/* Tabs */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 16,
                    backgroundColor: '#23252B',
                    borderRadius: 12,
                    marginHorizontal: 24,
                    padding: 4,
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            borderRadius: 8,
                            backgroundColor: activeTab === 'feed' ? '#fff' : 'transparent',
                        }}
                        onPress={() => setActiveTab('feed')}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: activeTab === 'feed' ? '#181A20' : '#A0A3B1',
                            fontWeight: '600'
                        }}>
                            Feed
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            borderRadius: 8,
                            backgroundColor: activeTab === 'posts' ? '#fff' : 'transparent',
                        }}
                        onPress={() => setActiveTab('posts')}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: activeTab === 'posts' ? '#181A20' : '#A0A3B1',
                            fontWeight: '600'
                        }}>
                            Posts
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Tab Content */}
                <View style={{ flex: 1, marginHorizontal: 24 }}>
                    {activeTab === 'feed' ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: '#A0A3B1', fontSize: 16 }}>Feed content goes here.</Text>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: '#A0A3B1', fontSize: 16 }}>Posts content goes here.</Text>
                        </View>
                    )}
                </View>
                {/* Post Button */}
                <View style={{ padding: 24, backgroundColor: 'transparent' }}>
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
                        }}
                        onPress={() => { router.push('/post') }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Post</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Screen>
    );
}