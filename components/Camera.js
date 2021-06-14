import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { RNCamera } from 'react-native-camera';

const mineralNames = ["Sodium", "Calcium", "Phosphorus", "Selenium", "Potassium", "Zinc", "Manganese", "Iron", "Folate", "Copper", "Magnesium"];
const othersNames = ["Cholesterol", "Sugar", "Fiber", "Saturated Fat", "Net Carbohydrates"];

export const Camera = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [takingPicture, setTakingPicture] = useState(null);

    const apiKey = '2673e0194bac47b7af74043e051d8395';
    const apiBaseUrl = "https://api.spoonacular.com";
    const searchAdditionalUrl = "/recipes/complexSearch?addRecipeInformation=false&addRecipeNutrition=true&query="

    const buildSearchUrl = (query) => {
        return apiBaseUrl + searchAdditionalUrl + query + "&apiKey=" + apiKey;
    };

    const searchPlate = (plate, imageUri) => {
        debugger;
        fetch(buildSearchUrl(plate))
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results[0] && data.results[0].nutrition && data.results[0].nutrition.nutrients)
                {
                    debugger;
                    let groupedNutrients = splitNutritionalInformationIntoGroups(data.results[0].nutrition.nutrients);
                    navigation.navigate('Plate', {
                        plate: plate ? plate : "pizza",
                        imageUri: imageUri,
                        nutritionalInformation: groupedNutrients
                    });
                }
            });
    };

    const sortByNameComparator = (a,b) => a.name < b.name;

    const splitNutritionalInformationIntoGroups = (apiNutritionalInformation) => {
        let calories = apiNutritionalInformation.find(value => value.name == "Calories");
        let fats = apiNutritionalInformation.find(value => value.name == "Fat");
        let proteins = apiNutritionalInformation.find(value => value.name == "Protein");
        let carbohydrates = apiNutritionalInformation.find(value => value.name == "Carbohydrates");
        let vitamins = apiNutritionalInformation.filter(value => value.name.includes("Vitamin")).sort(sortByNameComparator);
        let minerals = apiNutritionalInformation.filter(value => mineralNames.includes(value.name)).sort(sortByNameComparator);
        let others = apiNutritionalInformation.filter(value => othersNames.includes(value.name)).sort(sortByNameComparator);

        return {
            calories,
            fats,
            proteins,
            carbohydrates,
            vitamins,
            minerals,
            others
        };
    };

    const url = "https://food-shazam-backend.herokuapp.com/api/fastai";

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
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("Prediction: " + data);
                console.log("Image uri: " + image.uri);
                debugger;
                searchPlate(data, image.uri);
            })
            .catch(error => {
                // Show error on screen here
                takingPicture.showLoading(false);
                // navigation.navigate('Plate', {
                //     plate: "pizza"
                // });
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