import React from 'react';
import FollowButton from '../common/FollowButton';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { User } from '@/constants/interfaces';

interface Props {
    user: User
}

export default function UserCard({user} : Props) {

    const uri = user.is_oauth? user.profile_pic : `https://f005.backblazeb2.com/file/athletix-profile-pictures/${user?.profile_pic}`;

    return (        
        <TouchableOpacity style={{ 
            height: 60,                 
            marginHorizontal: 10,
            marginVertical: 4,
            borderRadius: 32,
            overflow: 'hidden',          
            position: 'relative',
            flexDirection: 'row',
            alignItems:'center',
        }}>
            <Image style={{height:50, width:50, borderRadius:180, marginRight:8, marginLeft:16}}
            source={{uri:uri}}/>
            <Text style={{color:'#fff', fontSize:22}}>
                {'@'+user.username}
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 16 }}>
                <FollowButton/>
            </View>
        </TouchableOpacity>
    )
}