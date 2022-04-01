import { Text, SafeAreaView, StatusBar, Button, Linking } from 'react-native';
import React, { useCallback, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

import { styles } from './style'

interface props {
    name: string;
    uri: string
}

export function FirstScreen() {
    const [fileResponse, setFileResponse] = useState<props>({name: "", uri: ""});

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response : any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Text onPress={() => Linking.openURL(fileResponse.uri)}>
                {fileResponse.name}
            </Text>

            <Button title="Select 📑" onPress={handleDocumentSelection} />
        </SafeAreaView>
    );
}