import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from './components/Camera';
import Plate from './components/Plate';


const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Camera" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Camera" component={Camera}/>
                <Stack.Screen name="Plate" component={Plate}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;