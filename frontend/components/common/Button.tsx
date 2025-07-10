import React from 'react';
import { 
    TouchableOpacity,
    Text,
    TextStyle,
    StyleProp,
    ViewStyle
} from 'react-native';
import { styles } from '../../constants/styles';

interface Props {
    onPress: () => void,
    title: string,
    style: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>
}

export default function Button({ onPress, title, style, textStyle, ...props } : Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}