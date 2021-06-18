import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { RNCamera } from 'react-native-camera';

const mineralNames = ["Sodium", "Calcium", "Phosphorus", "Selenium", "Potassium", "Zinc", "Manganese", "Iron", "Folate", "Copper", "Magnesium", "Iodine"];
const othersNames = ["Cholesterol", "Sugar", "Fiber", "Saturated Fat", "Net Carbohydrates", "Caffeine", "Alcohol", "Fluoride", "Folic Acid"];

const labelToPlate = {
    "apple_pie": "Apple pie",
    "baby_back_ribs": "Baby back ribs",
    "baklava": "Baklava",
    "beef_carpaccio": "Beef carpaccio",
    "beef_tartare": "Beef tartare",
    "beet_salad": "Beet salad",
    "beignets": "Beignets",
    "bibimbap": "Bibimbap",
    "bread_pudding": "Bread pudding",
    "breakfast_burrito": "Breakfast burrito",
    "bruschetta": "Bruschetta",
    "caesar_salad": "Caesar salad",
    "cannoli": "Cannoli",
    "caprese_salad": "Caprese salad",
    "carrot_cake": "Carrot cake",
    "ceviche": "Ceviche",
    "cheesecake": "Cheesecake",
    "cheese_plate": "Cheese plate",
    "chicken_curry": "Chicken curry",
    "chicken_quesadilla": "Chicken quesadilla",
    "chicken_wings": "Chicken wings",
    "chocolate_cake": "Chocolate cake",
    "chocolate_mousse": "Chocolate mousse",
    "churros": "Churros",
    "clam_chowder": "Clam chowder",
    "club_sandwich": "Club sandwich",
    "crab_cakes": "Crab cakes",
    "creme_brulee": "Creme brulee",
    "croque_madame": "Croque madame",
    "cup_cakes": "Cup cakes",
    "deviled_eggs": "Deviled eggs",
    "donuts": "Donuts",
    "dumplings": "Dumplings",
    "edamame": "Edamame",
    "eggs_benedict": "Eggs benedict",
    "escargots": "Escargots",
    "falafel": "Falafel",
    "filet_mignon": "Filet mignon",
    "fish_and_chips": "Fish and chips",
    "foie_gras": "Foie gras",
    "french_fries": "French fries",
    "french_onion_soup": "French onion soup",
    "french_toast": "French toast",
    "fried_calamari": "Fried calamari",
    "fried_rice": "Fried rice",
    "frozen_yogurt": "Frozen yogurt",
    "garlic_bread": "Garlic bread",
    "gnocchi": "Gnocchi",
    "greek_salad": "Greek salad",
    "grilled_cheese_sandwich": "Grilled cheese sandwich",
    "grilled_salmon": "Grilled salmon",
    "guacamole": "Guacamole",
    "gyoza": "Gyoza",
    "hamburger": "Hamburger",
    "hot_and_sour_soup": "Hot and sour soup",
    "hot_dog": "Hot dog",
    "huevos_rancheros": "Huevos rancheros",
    "hummus": "Hummus",
    "ice_cream": "Ice cream",
    "lasagna": "Lasagna",
    "lobster_bisque": "Lobster bisque",
    "lobster_roll_sandwich": "Lobster roll sandwich",
    "macaroni_and_cheese": "Macaroni and cheese",
    "macarons": "Macarons",
    "miso_soup": "Miso soup",
    "mussels": "Mussels",
    "nachos": "Nachos",
    "omelette": "Omelette",
    "onion_rings": "Onion rings",
    "oysters": "Oysters",
    "pad_thai": "Pad thai",
    "paella": "Paella",
    "pancakes": "Pancakes",
    "panna_cotta": "Panna cotta",
    "peking_duck": "Peking duck",
    "pho": "Pho",
    "pizza": "Pizza",
    "pork_chop": "Pork chop",
    "poutine": "Poutine",
    "prime_rib": "Prime rib",
    "pulled_pork_sandwich": "Pulled pork sandwich",
    "ramen": "Ramen",
    "ravioli": "Ravioli",
    "red_velvet_cake": "Red velvet cake",
    "risotto": "Risotto",
    "samosa": "Samosa",
    "sashimi": "Sashimi",
    "scallops": "Scallops",
    "seaweed_salad": "Seaweed salad",
    "shrimp_and_grits": "Shrimp and grits",
    "spaghetti_bolognese": "Spaghetti bolognese",
    "spaghetti_carbonara": "Spaghetti carbonara",
    "spring_rolls": "Spring rolls",
    "steak": "Steak",
    "strawberry_shortcake": "Strawberry shortcake",
    "sushi": "Sushi",
    "tacos": "Tacos",
    "takoyaki": "Takoyaki",
    "tiramisu": "Tiramisu",
    "tuna_tartare": "Tuna tartare",
    "waffles": "Waffles"
}

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
        fetch(buildSearchUrl(plate))
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results[0] && data.results[0].nutrition && data.results[0].nutrition.nutrients) {
                    let groupedNutrients = splitNutritionalInformationIntoGroups(data.results[0].nutrition.nutrients);
                    navigation.navigate('Plate', {
                        plate: plate ? plate : "pizza",
                        imageUri: imageUri,
                        nutritionalInformation: groupedNutrients
                    });
                }
                takingPicture.showLoading(false);
            });
    };

    const sortByNameComparator = (a, b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };

    const splitNutritionalInformationIntoGroups = (apiNutritionalInformation) => {
        let calories = apiNutritionalInformation.find(value => value.name == "Calories");
        let fats = apiNutritionalInformation.find(value => value.name == "Fat");
        let proteins = apiNutritionalInformation.find(value => value.name == "Protein");
        let carbohydrates = apiNutritionalInformation.find(value => value.name == "Carbohydrates");
        let vitamins = apiNutritionalInformation.filter(value => value.name.includes("Vitamin") || value.name == "Choline").sort(sortByNameComparator);
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
                searchPlate(labelToPlate[data], image.uri);
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