import React from 'react';
import { ScrollView, Text, Button, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export const Plate = ({ route, navigation }) => {
    const { plate, imageUri, nutritionalInformation } = route.params;

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
            {
                nutritionalInformation && nutritionalInformation.calories &&
                <Progress.Circle size={100} animated={false} progress={nutritionalInformation.calories.percentOfDailyNeeds / 100} 
                color="rgba(255,165,0,1)" unfilledColor="rgba(255,165,0,0.25)" borderWidth={0} thickness={10} strokeCap="round"/>
            }
            {
                nutritionalInformation && nutritionalInformation.fats &&
                <Progress.Circle size={100} animated={false} progress={nutritionalInformation.fats.percentOfDailyNeeds / 100} 
                color="rgba(255,165,0,1)" unfilledColor="rgba(255,165,0,0.25)" borderWidth={0} thickness={10} strokeCap="round"/>
            }
            {
                nutritionalInformation && nutritionalInformation.proteins &&
                <Progress.Circle size={100} animated={false} progress={nutritionalInformation.proteins.percentOfDailyNeeds / 100} 
                color="rgba(255,165,0,1)" unfilledColor="rgba(255,165,0,0.25)" borderWidth={0} thickness={10} strokeCap="round"/>
            }
            {
                nutritionalInformation && nutritionalInformation.carbohydrates &&
                <Progress.Circle size={100} animated={false} progress={nutritionalInformation.carbohydrates.percentOfDailyNeeds / 100} 
                color="rgba(255,165,0,1)" unfilledColor="rgba(255,165,0,0.25)" borderWidth={0} thickness={10} strokeCap="round"/>
            }
            {
                nutritionalInformation && nutritionalInformation.vitamins && <Text>Vitamins: </Text>
            }
            {
                nutritionalInformation && nutritionalInformation.vitamins &&
                nutritionalInformation.vitamins.map((value, index) => {
                    return <Text key={index}>
                        {value.name}={value.amount}{value.unit}
                    </Text>
                })
            }
            {
                nutritionalInformation && nutritionalInformation.vitamins && <Text>Minerals: </Text>
            }
            {
                nutritionalInformation && nutritionalInformation.minerals &&
                nutritionalInformation.minerals.map((value, index) => {
                    return <Text key={index}>
                        {value.name}={value.amount}{value.unit}
                    </Text>
                })
            }
            {
                nutritionalInformation && nutritionalInformation.vitamins && <Text>Others: </Text>
            }
            {
                nutritionalInformation && nutritionalInformation.others &&
                nutritionalInformation.others.map((value, index) => {
                    return <Text key={index}>
                        {value.name}={value.amount}{value.unit}
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