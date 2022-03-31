import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { styles } from './style'

export function FirstScreen() {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>

            <TextInput
                style={styles.input}
                onChangeText={ setText }
            />

            <Text>
                Você digitou: { text }
            </Text>
        </View>
    );
}