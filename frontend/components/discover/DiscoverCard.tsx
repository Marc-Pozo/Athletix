import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Location } from '@/constants/interfaces';
import { useLocationStore } from '@/utils/LocationStore';
import Constants from 'expo-constants';

interface Props {
    location : Location,
    lat: string,
    long: string,
}

interface DrivingDistance {
    rows : {
        elements : {
            distance : {
                value: number;
            },
            duration : {
                text: string;
            }
        }[]
    }[],
    status : string,
}

const { GOOGLE_API_KEY, PHOTO_URL } = Constants.expoConfig?.extra || {};

export default function DiscoverCard({location, lat, long} : Props) {

    const router = useRouter();
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState("");

    const setSelectedLocation = useLocationStore(state => state.setSelectedLocation);


    async function getDrivingDistance(
        originLat: number, originLng: number,
        destLat: number, destLng: number
    ) {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&key=${GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json() as DrivingDistance;

        if (data.status !== "OK") {
            throw new Error("Error fetching distance: " + data.status);
        }

        const miles = Number(((data.rows[0].elements[0].distance.value / 1000) * 0.6214).toFixed(1));
        const duration = data.rows[0].elements[0].duration.text;

        setDistance(miles);
        setDuration(duration);
    }

    const onGoPressed = () => {
        setSelectedLocation(location);
        router.push('/locationInfo');
    }


    useEffect(() => {
        const fetchDistance = async () => {
            await getDrivingDistance(
                Number(lat),
                Number(long),
                Number(location.lat),
                Number(location.long)
            );
        };
        fetchDistance();
    }, [location]);
    
    return (        
        <View style={{ 
            height: 300,                 
            marginHorizontal: 8,
            marginVertical: 8,
            borderColor: '#ccc',
            borderWidth: 2,
            borderRadius: 8,
            overflow: 'hidden',          
            position: 'relative'
        }}>
            <Image
                source={{uri: `${PHOTO_URL}${location.image_uri}&key=${GOOGLE_API_KEY}`}}
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
                }}>
                    <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>{location.name}</Text>                    
                        
                    <View style={{flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <Text style={{ color: '#000', marginTop: 4 }}>{location.address}</Text>
                            <Text style={{ color: '#000', marginTop: 4 }}>{`${distance} miles or ${duration} away.`}</Text>
                        </View>
                        <Image
                            source={require('../../assets/images/SportsIcons/ball-basketball-icon.png')}
                            style={{ 
                                width: 36, 
                                height: 36,
                                marginLeft: 8,
                            }}
                        />
                    </View>
                    
                </View>
            </View>
            <TouchableOpacity onPress={onGoPressed} style={{
                backgroundColor:'#147efb', 
                padding: 16
            }}>
                <Text style={{
                    textAlign: 'center', 
                    color:'#fff', 
                    fontSize:24,
                    fontWeight:'bold'
                }}>
                    Go
                </Text>
            </TouchableOpacity>
        </View>

    )
}