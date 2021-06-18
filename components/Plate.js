import React from 'react';
import { ScrollView, Text, StyleSheet, View, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import { Icon } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

export const Plate = ({ route, navigation }) => {
    const { plate, imageUri, nutritionalInformation } = route.params;

    return (
        <ScrollView contentContainerStyle={{ ...styles.container, }}  >
            <View style={styles.fullWidth}>
                <ImageBackground
                    style={styles.image}
                    source={{
                        uri: imageUri
                    }}>
                    <View style={styles.backArrow}>
                        <Icon name='arrow-left' size={25} color="black" type="font-awesome-5" onPress={() => navigation.goBack()} />
                    </View>
                    <View style={styles.plate}>
                        <Text style={styles.caloriesText}>{plate}</Text>
                    </View>
                    {/* <View style={styles.calories}>
                        <Icon name='fire' size={25} color="rgba(141, 139, 239, 1)" type="font-awesome-5" />
                        {
                            nutritionalInformation && nutritionalInformation.calories &&
                            <Text style={{...styles.caloriesText, 
                                marginLeft: 10}}>{nutritionalInformation.calories.amount} kcal</Text>
                        }
                    </View> */}
                </ImageBackground>
            </View>
            <View style={{ ...styles.container, ...styles.circleContainer }}>
                <View style={styles.fullWidth}>
                    <Text style={styles.title}>Nutrition facts: </Text>
                    {
                        nutritionalInformation && nutritionalInformation.calories &&
                        <View style={styles.calories}>
                            <Icon name='fire' size={25} color="rgba(141, 139, 239, 1)" type="font-awesome-5" />
                            <Text style={{
                                ...styles.caloriesText,
                                marginLeft: 10
                            }}>{nutritionalInformation.calories.amount} kcal</Text>
                        </View>
                    }
                </View>

                {
                    nutritionalInformation && nutritionalInformation.carbohydrates &&
                    <View>
                        <Progress.Circle size={100} animated={false} progress={nutritionalInformation.carbohydrates.percentOfDailyNeeds / 100}
                            color="rgba(80, 183, 203, 1)" unfilledColor="rgba(80, 183, 203, 0.25)" borderWidth={0} thickness={10} strokeCap="round"
                            showsText={true} textStyle={styles.circleText} style={styles.circle} />
                        <Text style={styles.circleLabel}>{nutritionalInformation.carbohydrates.name}</Text>
                    </View>
                }
                {
                    nutritionalInformation && nutritionalInformation.fats &&
                    <View>
                        <Progress.Circle size={100} animated={false} progress={nutritionalInformation.fats.percentOfDailyNeeds / 100}
                            color="rgba(141, 139, 239, 1)" unfilledColor="rgba(141, 139, 239, 0.25)" borderWidth={0} thickness={10} strokeCap="round"
                            showsText={true} textStyle={styles.circleText} style={styles.circle} />
                        <Text style={styles.circleLabel}>{nutritionalInformation.fats.name}</Text>
                    </View>
                }
                {
                    nutritionalInformation && nutritionalInformation.proteins &&
                    <View>
                        <Progress.Circle size={100} animated={false} progress={nutritionalInformation.proteins.percentOfDailyNeeds / 100}
                            color="rgba(30, 134, 254, 1)" unfilledColor="rgba(30, 134, 254, 0.25)" borderWidth={0} thickness={10} strokeCap="round"
                            showsText={true} textStyle={styles.circleText} style={styles.circle} />
                        <Text style={styles.circleLabel}>{nutritionalInformation.proteins.name}</Text>
                    </View>
                }
            </View>
            <View style={{ ...styles.fullWidth, ...styles.textContainer }}>
                {
                    nutritionalInformation && nutritionalInformation.vitamins &&
                    <Collapse isExpanded={false} 
                        onToggle={(isExpanded)=>this.setState({expanded: isExpanded})}>
                        <CollapseHeader>
                            <View>
                                <Text>Vitamins: </Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>{
                            nutritionalInformation.vitamins.map((value, index) => {
                                return <Text key={index}>
                                    {value.name}={value.amount}{value.unit}
                                </Text>
                            })}
                        </CollapseBody>
                    </Collapse>
                }

                {
                    nutritionalInformation && nutritionalInformation.minerals &&
                    <Collapse>
                        <CollapseHeader>
                            <View>
                                <Text>Minerals: </Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>{
                            nutritionalInformation.minerals.map((value, index) => {
                                return <Text key={index}>
                                    {value.name}={value.amount}{value.unit}
                                </Text>
                            })}
                        </CollapseBody>
                    </Collapse>
                }

                {
                    nutritionalInformation && nutritionalInformation.others &&
                    <Collapse >
                        <CollapseHeader>
                            <View>
                                <Text>Others: </Text>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>{
                            nutritionalInformation.others.map((value, index) => {
                                return <Text key={index}>
                                    {value.name}={value.amount}{value.unit}
                                </Text>
                            })}
                        </CollapseBody>
                    </Collapse>
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 328,
    },
    circleText: {
        color: "black",
        fontWeight: "bold"
    },
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: "space-evenly",
        width: '100%',
        backgroundColor: "white"
    },
    circleContainer: {
        position: 'absolute',
        top: 308,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20
    },
    circle: {
        marginVertical: 10
    },
    circleLabel: {
        alignSelf: "center"
    },
    fullWidth: {
        width: '100%',
        alignSelf: 'center'
    },
    textContainer: {
        paddingTop: 225,
    },
    backArrow: {
        position: 'absolute',
        top: 20,
        left: 15,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignSelf: 'flex-start'
    },
    plate: {
        position: 'absolute',
        top: 20,
        right: 15,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignSelf: 'flex-end'
    },
    calories: {
        position: 'absolute',
        top: -10,
        right: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignSelf: 'flex-end',
    },
    caloriesText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        width: "100%",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 20
    }
});

export default Plate;