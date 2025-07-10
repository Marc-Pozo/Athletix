import React, { Children, ReactNode } from 'react';
import { 
    SafeAreaView, 
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { styles } from '../../constants/styles';

type ScreenProps = {
  children: ReactNode,
  screenPadding: number | null
};

export default function Screen({ children, screenPadding }: ScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={[styles.container, {padding: screenPadding}]}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}