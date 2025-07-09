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
            height: 250,                 
            marginHorizontal: 8,
            marginVertical: 16,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            overflow: 'hidden',          
            position: 'relative'
        }}>
            <Image
                source={require('../../assets/images/temp-basketball.jpg')}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                }}
            />
            <View style={{ 
                flex: 1, 
                justifyContent: 'flex-end',
            }}>
                <View style={{
                    backgroundColor: 'rgba(255,255,255,0.7)', 
                    padding: 8, 
                    borderRadius: 8 
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