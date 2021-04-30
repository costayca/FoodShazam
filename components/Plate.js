import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button, Image, StyleSheet } from 'react-native';

export const Plate = ({ route, navigation }) => {
    const [ plateNutritional, setPlateNutritional] = useState(null);

    const { plate, imageUri } = route.params;

    const apiKey = '2673e0194bac47b7af74043e051d8395';
    const apiBaseUrl = "https://api.spoonacular.com";
    const searchAdditionalUrl = "/food/ingredients/search?addChildren=false&number=1&query="
    const informationAdditionalUrl = "/food/ingredients/"

    const buildSearchUrl = (query) => {
        return apiBaseUrl + searchAdditionalUrl + query + "&apiKey=" + apiKey;
    };

    const buildInformationUrl = (id, amount = 100, unit = "grams") => {
        return apiBaseUrl + informationAdditionalUrl + id + "/information?amount=" + amount + "&unit=" + unit + "&apiKey=" + apiKey;
    }

    const searchPlate = (plate) => {
        fetch(buildSearchUrl(plate))
            .then(response => response.json())
            .then(data => {
                debugger;
                if (data && data.results && data.results[0] && data.results[0].id)
                {
                    informationPlate(data.results[0].id);
                }
            });
    };

    const informationPlate = (id) => {
        fetch(buildInformationUrl(id))
            .then(response => response.json())
            .then(data => {
                if(data && data.nutrition && data.nutrition.nutrients) {
                    setPlateNutritional(data.nutrition.nutrients);
                }
            });
    }

    useEffect(() => searchPlate(plate), []);

    return (
        <ScrollView>
            <Text>Plate Screen</Text>
            <Text>Your prediction is {plate}</Text>
            <Image
                style={styles.logo}
                source={{
                    uri: imageUri
                }} />
            <Button title="Go to Camera" onPress={() => navigation.navigate('Camera')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            {plateNutritional && 
                plateNutritional.map((value, index) => {
                    return <Text key={index}>
                        {index}.{value.name}={value.amount}{value.unit}
                    </Text>
                })
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 328,
    },
});

export default Plate;