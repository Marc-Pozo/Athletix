import React, { useState } from 'react';
import { 
  View, 
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
};

const DateOfBirthPicker: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) {
      const iso = selectedDate.toISOString().split('T')[0];
      onChange(iso);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => {
        Keyboard.dismiss();
        setShowPicker(!showPicker);}}>
        <TextInput
          style={{
            borderColor: '#fff',
            borderWidth: 1,
            padding: 16,
            borderRadius: 8,
            color: '#fff',
          }}
          placeholder={placeholder || 'YYYY-MM-DD'}
          placeholderTextColor="#888"
          value={value}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display={Platform.select({ ios: 'spinner', android: 'calendar' })}
          value={value ? new Date(value) : new Date()}
          onChange={handleChange}
          maximumDate={new Date()}
          style={{alignSelf: 'center'}}
        />
      )}
    </View>
  );
};

export default DateOfBirthPicker;