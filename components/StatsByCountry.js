import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList ,TextInput,SearchBar, TouchableOpacity,StyleSheet  } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo'

import Icon2 from 'react-native-vector-icons/Ionicons';  
export default function StatsByCountry({ navigation }) {
  const[countries,setCountries]=useState([])
  const[favcountries,setFavcountries]=useState('')
  const [arrayholder,setArrayholder] =useState([])
  const[text, setText] = useState('')
  useEffect(() => {
    
    getData();
    
  },[])
  
  
  const addfitem =async(country)=>{
    
    try {
      const value = await AsyncStorage.getItem('favoritesity');
      console.log("Does it run",favcountries, value)
     
    
    
           await AsyncStorage.setItem('favoritesity', value+","+country);
          
        } catch (error) {
            // Error saving data
        }
        
  }
    const showstatsofcountry=(item)=>{
       navigation.navigate('CountryStat',{
         country: item
          })
     }
  
  function getData() {
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.body.countries);
  setCountries(response.data.body.countries)
  setArrayholder(response.data.body.countries)
}).catch(function (error) {
	console.error(error);
});
  } 
  const searchData= (text)=>  {
    const newData = arrayholder.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

      setCountries(newData)
      setText(text)
    }
  const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon2 name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
  return (
    <View style={styles.container}>
      <Header name="Stats By Country" openDrawer={navigation.openDrawer}/>
      <View style={{paddingTop: 10}}>
      <Text style={styles.bigBlue}>List Of Countries</Text>
      </View>
      <View style={{paddingTop: 10}}>
      <TextInput 
         style={styles.textInput}
         onChangeText={(text) => searchData(text)}
         value={text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
      </View>
      <FlatList
        data={countries}
        renderItem={({item})=>(<View style={{paddingTop: 10}}>
        <TouchableOpacity  style={styles.appButton} >
        <Text onPress={()=>{showstatsofcountry(item)}} style={styles.fortext2}>{item}{item.check}</Text>
        <Icon style={{}} onPress={()=>{addfitem(item)}} name="star-outlined" color={'yellow'}></Icon>
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
  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 3,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#E3DC02',
  },
  fortext2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: "center"
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


