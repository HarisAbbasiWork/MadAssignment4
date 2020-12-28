import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';  
export default function FavoriteCountries({ route,navigation }) {
  const[favcountries,setFavcountries]=useState([])
  const[reload,setReload]=useState(0)
  const isFocused = useIsFocused();
  useEffect(() => {
    
    loaddata()
    
  },[reload,isFocused])
    
  const loaddata=async()=>{
    try{
      AsyncStorage.getItem('favoritesity').then(
      (value) =>{
        var array = value.split(",");
        console.log(array)
        var uniqueArray = [];
        
        // Loop through array values
        for(i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        
        setFavcountries(uniqueArray)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  const showstatsofcountry=(item)=>{
       console.log("Its here",item)
       navigation.navigate('CountryStat',{
         country: item
          })
     }
  const removeitem=async(item)=>{

    const index = favcountries.indexOf(""+item+"")
    console.log(index)
    if (index > -1) {
      favcountries.splice(index, 1);
    }
    console.log(favcountries); 
    for(i=0; i < favcountries.length; i++){
      try {
        if(i>0){
          const value = await AsyncStorage.getItem('favoritesity');
          await AsyncStorage.setItem('favoritesity', value+","+favcountries[i]);
          console.log("Added"+favcountries[i]+"To list") 

        }else if(i==0){
          await AsyncStorage.setItem('favoritesity', favcountries[i]);
          console.log("Added"+favcountries[i]+"To list")

        }
        
      } catch (error) {
            // Error saving data
        }
          
    }
    setReload(reload+1)
       
     }
     const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
  return (
    <View style={styles.container}>
    <Header name="Favorite Countries" openDrawer={navigation.openDrawer}/>
      <Button onPress={() => navigation.goBack()} title="Go back Stats By Country" />
      <View style={{paddingTop: 10}}>
      <Text style={styles.bigBlue}>List Of Favorite Countries</Text>
      </View>
      <FlatList
        data={favcountries}
        renderItem={({item})=>(<View>
        <TouchableOpacity  style={styles.appButton} >
        <Text onPress={()=>{showstatsofcountry(item)}} style={styles.fortext2}>{item}</Text>
        <Text onPress={()=>{removeitem(item)}} style={styles.fortext3}>Remove Country</Text>
        </TouchableOpacity>
        
        
  
        </View>)}
        keyExtractor={(item, index) => item.id}
        
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  
  appButton: {
    elevation: 8,
    backgroundColor: '#0FD102',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems:'center'
  },
  
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#E3DC02',
  },
  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  },
  fortext2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: "center"
  },
  fortext3: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 8,
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  }

  
});
