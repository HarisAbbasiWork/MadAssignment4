import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, FlatList ,TextInput,SearchBar, TouchableOpacity,StyleSheet  } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo'
export default function StatsByCountry({ navigation }) {
  const[countries,setCountries]=useState([])
  const[favcountries,setFavcountries]=useState('')
  const [arrayholder,setArrayholder] =useState([])
  const[text, setText] = useState('')
  useEffect(() => {
    loaddata()
    getData();
    
  },[])
  const loaddata=async()=>{
    try{
       AsyncStorage.getItem('favoritesity').then(
      (value) =>{
        console.log("val",value)
        }
        
    );

    } catch{
      console.log('error')

    }
    
    
  }
  
  const addfitem =async(country)=>{
    
    try {
      const value = await AsyncStorage.getItem('favoritesity');
      console.log("Does it run",favcountries, value)
     
    
    
           await AsyncStorage.setItem('favoritesity', value+","+country);
          
        } catch (error) {
            // Error saving data
        }
        
  }
    const showstat=(item)=>{
       console.log("Its here",item)
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
    console.log("It searches")
    const newData = arrayholder.filter(item => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    console.log("It gets back")

      setCountries(newData)
      setText(text)
    }
  
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Favorite Countries')} title="Go see favorite countries" />
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
        <Text onPress={()=>{showstat(item)}} style={styles.fortext2}>{item}{item.check}</Text>
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

  
});


