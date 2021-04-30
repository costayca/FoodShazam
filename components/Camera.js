import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { RNCamera } from 'react-native-camera';

export const Camera = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [takingPicture, setTakingPicture] = useState(null);

    const url = "http://localhost:5000/api/keras";

    const sendImageToServer = async (image) => {
        const body = new FormData();
        body.append("img", {
            uri: image.uri,
            name: "image.jpg",
            type: "image/jpeg"
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            body
        })
            .then(response => response.json())
            .then(data => {
                console.log("Prediction: " + data);
                console.log("Image uri: " + image.uri);
                debugger;
                navigation.navigate('Plate', {
                    plate: data,
                    imageUri: image.uri
                });
            })
            .catch(error => console.log("2" + error))
            .then(() => {
                takingPicture.showLoading(false);
                navigation.navigate('Plate');
            });
    };

    const takePicture = async () => {
        if (camera) {
            takingPicture.showLoading(true);

            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
            sendImageToServer(data);
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.preview}
                ref={ref => {
                    setCamera(ref);
                }}
                captureAudio={false}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <AnimateLoadingButton
                    ref={c => (setTakingPicture(c))}
                    width={300}
                    height={50}
                    title="SNAP 1"
                    titleFontSize={16}
                    titleColor="rgb(255,255,255)"
                    backgroundColor="rgb(29,18,121)"
                    borderRadius={4}
                    onPress={takePicture}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default Camera;