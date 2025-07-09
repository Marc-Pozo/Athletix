import React from 'react';
import { styles } from '../../constants/styles';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


export default function DiscoverCard() {
    return (        
        <TouchableOpacity style={{ 
            margin: 4,
            borderRadius: 16,
            flexDirection: 'column',
            backgroundColor: '#fff', 
            borderColor: '#ffffff',
            borderWidth: 1,
        }}>
            <Image
                source={require('../../assets/images/temp-basketball.jpg')}
                style={{
                    width: 200, // or whatever fixed / max size you want
                    height: 120,
                    borderRadius: 8,
                }}
            />
            <View style={{ 
                justifyContent: 'flex-start',
            }}>
                <View style={{
                    padding: 8, 
                    borderRadius: 8,
                    borderColor: '#000',
                    borderWidth: 1,
                    marginHorizontal: 8,
                }}>
                    <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Central Park</Text>
                    <Text style={{ color: '#000', marginTop: 4 }}>New York, NY</Text>
                    <Text style={{ color: '#000', marginTop: 8 }}>A beautiful park in the heart of the city.</Text>
                    <Image
                        source={require('../../assets/images/SportsIcons/ball-basketball-icon.png')}
                        style={{ 
                            width: 36, 
                            height: 36, 
                            marginTop: 8 
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>

    )
}