import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/styles';
import { DiscoverProps, User } from '@/constants/interfaces';
import { useUserStore } from '@/utils/UserStore';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function FollowButton() {

    const onFollowPressed = async () => {

    }

    return (
        <TouchableOpacity
            style={{
                borderRadius: 16,
                borderColor: 'red',
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 6,
                backgroundColor: 'transparent'
            }}
            onPress={onFollowPressed}
        >
            <Text style={{ color: 'red' }}>
                Follow
            </Text>
        </TouchableOpacity>
    );
}