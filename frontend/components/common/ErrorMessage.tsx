import React from 'react';
import { Text } from 'react-native';

interface Props {
    error: string | null;
}

export default function ErrorMessage({ error }: Props) {
    if (!error) return null;
    return (
        <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>
            {error}
        </Text>
    );
}