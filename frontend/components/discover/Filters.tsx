import React, { Dispatch, SetStateAction, useState } from 'react';
import { styles } from '../../constants/styles';
import SportsSelector from '../common/SportsSelector';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

interface Props {
    radius: string,
    setRadius: Dispatch<SetStateAction<string>>
}

export default function Filters({radius, setRadius} : Props) {
    const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());
    
    const toggleSport = (sport: string) => {
        setSelectedSports(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sport)) {
                newSet.delete(sport);
            } else {
                newSet.add(sport);
            }
            return newSet;
        });
    };

    return(
        <View style = { {
            height: 'auto',
            backgroundColor: "rgb(48, 42, 42)",
            borderRadius: 16,
            justifyContent:"flex-start",
            alignContent:'center',
            marginBottom: 12
        }}>
            <Text style={[{
                        alignSelf:"center",
                        color:'#fff',
                        fontSize:24,
                        marginTop: 8
                    }]}>
                        Filters
                    </Text>
            <View style={
                {
                    flexDirection:"row", 
                    justifyContent:"center", 
                    margin:8,
                    gap: 10 
                }
            }>
                <View style={
                    {
                        backgroundColor: "#a61e1e",
                        borderRadius: 32,
                        padding:16,
                        flexDirection:"row",
                        justifyContent:"center",
                        margin:8,
                        gap: 10 
                }}>
                    
                    <Text style={[styles.text, {
                        alignSelf:"center",
                        color:'#fff',
                        marginBottom: 0
                    }]}>
                        Radius:
                    </Text>
                    <TextInput
                        style={[
                            {
                                borderRadius: 8,
                                paddingRight: 16,
                                fontSize: 20,
                                alignSelf: 'center',
                                color:'#fff'
                            }
                        ]}
                        placeholder="0"
                        placeholderTextColor="#fff"
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        returnKeyType='done'
                        value={radius.toString() != 'NaN' ? radius.toString() : ''}
                        onChangeText={(value : string)=> {setRadius(value)}}
                    />
                </View>    
            </View>  
            <SportsSelector selected={selectedSports} onToggle={toggleSport}/>   
        </View>
    )
}

