import { Text, SafeAreaView, StatusBar, Button, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

import { styles } from './style'

interface props {
    name: string,
    uri: string
}

export function FirstScreen() {
    const [fileResponse, setFileResponse] = useState<any>([]);
    const [uri, setUri] = useState<string>("");

    const files : Array<object> = []

    const openFile = async (file: string) => {
        const cUri = await FileSystem.getContentUriAsync(file);
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: cUri,
            flags: 1,
            type: 'application/pdf'
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
            files.push({ name: response.name, uri: response.uri })
            setFileResponse(files);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    // useEffect(() => {
    //     console.log(fileResponse)
    // }, [fileResponse])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={styles.titleSelectFiles}>Reading Organizer</Text>

            <Button title="Adicionar 📑" color="green" onPress={handleDocumentSelection} />

            <View style={styles.filesBox}>
                {
                    fileResponse && (
                        fileResponse?.map((file: props, index: number) => {
                            return (
                                <Button key={index} title={file.name} color="#5e5e5e" onPress={() => openFile(file.uri)} />
                            )
                        })
                    )
                }
            </View>
        </SafeAreaView>
    );
}