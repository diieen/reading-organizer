import { Text, SafeAreaView, StatusBar, Button, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { styles } from './style'

interface props {
    name: string;
    uri: string
}

export function FirstScreen() {
    const [fileResponse, setFileResponse] = useState<props>({ name: "", uri: "" });
    const [uri, setUri] = useState<string>("");

    const openFile = (file: string) => {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: file,
            flags: 1,
        });
    }

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response: any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            FileSystem.getContentUriAsync(response.uri).then(cUri => {
                setUri(cUri);
            });
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={styles.titleSelectFiles}>Reading Organizer</Text>
            <Text onPress={() => openFile(uri)}>
                {fileResponse.name}
            </Text>

            <Button title="Adicionar 📑" color="green" onPress={handleDocumentSelection} />

            <View style={styles.filesBox}>
                <Button title={fileResponse.name} color="#5e5e5e" onPress={() => openFile(uri)} />
            </View> 
        </SafeAreaView>
    );
}