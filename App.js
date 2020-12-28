import * as React from 'react';
import { Button, View, Ionicons, FontAwesome } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StatsByCountry from './components/StatsByCountry';
import WorldStats from './components/WorldStats';
import FavoriteCountries from './components/FavoriteCountries';
import CountryStat from './components/CountryStat';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType="slide" drawerStyle = {{
        backgroundColor: 'lightblue',
        width:200,
      }} initialRouteName="World Stats">
        <Drawer.Screen name="Stats By Country" component={StackNavigator} />
      
        <Drawer.Screen name="World Stats" component={WorldStats} />
        <Drawer.Screen name="Favorite Countries" component={FavoriteCountries} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Stats By Country"}
      
    >
      <Stack.Screen
        name="Stats By Country"
        component={StatsByCountry}
        
      />
      <Stack.Screen
        name="CountryStat"
        component={CountryStat}
        
      />
      
    </Stack.Navigator>
  )
}
