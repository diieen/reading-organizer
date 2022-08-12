import { Text, SafeAreaView, StatusBar, Button, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './style'

interface props {
    name: string,
    uri: string
}

export function FirstScreen() {
    const [fileResponse, setFileResponse] = useState<any>([]);
    const [uri, setUri] = useState<string>("");
    const [control, setControl] = useState<boolean>(false);
    const [control2, setControl2] = useState<boolean>(false);

    useEffect(() => {
        if (!control2) {
            AsyncStorage.getItem('fileResponse').then((value: any) => {
                setFileResponse(JSON.parse(value))
            }) 
            setControl2(true);
        }
    }, [])

    const openFile = async (file: string) => {
        const cUri = await FileSystem.getContentUriAsync(file);
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: cUri,
            flags: 1,
            type: 'application/pdf'
        });
    }

    const handleDocumentSelection = async () => {
        try {
            const response: any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            fileResponse.push({ name: response.name, uri: response.uri })
            setFileResponse(fileResponse);

            let object = JSON.stringify(fileResponse);
            AsyncStorage.setItem('fileResponse', object);

            FileSystem.getContentUriAsync(response.uri).then(cUri => {
                setUri(cUri);
            });
        } catch (err) {
            console.warn(err);
        }
    };

    const deleteFile = async (i: number) => {
        fileResponse.splice(i, 1);
        
        let object = JSON.stringify(fileResponse);
        AsyncStorage.setItem('fileResponse', object);

        setFileResponse(fileResponse);
        if (control) {
            setControl(false);
        } else {
            setControl(true);
        }
    };

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
                                <View key={index}>
                                    <Button title={file.name} color="#5e5e5e" onPress={() => openFile(file.uri)} />
                                    <Button title="❌" color="red" onPress={() => deleteFile(index)} />
                                </View>
                            )
                        })
                    )
                }
            </View>
        </SafeAreaView>
    );
}