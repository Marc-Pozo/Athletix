import React from 'react';
import { 
    TouchableOpacity,
    Text, 
    View 
} from 'react-native';
import { styles } from '../../constants/styles';
import { sportsList } from '@/constants/interfaces';

// TODO: Properly define these
interface Props {
    selected : Set<string>,
    onToggle : (sport: string) => void
}

export default function SportsSelector({ selected, onToggle } : Props) {
  return (
    <View style={{
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      backgroundColor: '#808080',
      height: 'auto',
      borderRadius: 16,
      margin:8
    }}>
      {sportsList.map((sport) => {
        const isSelected = selected.has(sport);
        return (
          <TouchableOpacity
            key={sport}
            style={[
              styles.button,
              {
                alignSelf: 'center',
                padding: 8,
                backgroundColor: isSelected ? '#4CAF50' : '#a61e1e',
                borderColor: isSelected ? '#fff' : '#a61e1e',
                borderWidth: 1,
                borderRadius: 32,
                margin: 4,
                width: 'auto'
              },
            ]}
            onPress={() => onToggle(sport)}
          >
            <Text style={styles.buttonText}>{sport}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}