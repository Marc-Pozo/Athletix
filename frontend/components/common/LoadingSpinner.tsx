import {
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { useState } from 'react';

interface Props {
    loading: boolean
}

export default function LoadingSpinner({loading} : Props) {

    return (
        <View>
            {loading &&(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#147efb" />
                </View>
            )}
        </View>
    );
}