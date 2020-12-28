import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';  

export default function WorldStats({ navigation }) {
  const[confirmedcases,setConfirmedcases]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[worldpopulation,setWorldpopulation]=useState()
  useEffect(() => {
    
    getData();
    getworlddata();
  },[])
    
  function getworlddata(){
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': '40838189e4mshb5ffc5960cde754p1c2078jsn5b6a894a4513',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	setWorldpopulation(response.data.body.world_population);
}).catch(function (error) {
	console.error(error);
});

  }
  
  function getData() {
    

const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  params: {code: 'it'},
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)

}).catch(function (error) {
	console.error(error);
});
  }
  function calculatepercentage(value){
    const val =(100 * value) / worldpopulation
    return val.toFixed(2)
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
    <Header name="World Statistics" openDrawer={navigation.openDrawer}/>
      
      <View style={styles.paddings}>
      <Text style={styles.bigBlue}>World Statistics</Text>
      </View>
      <View style={styles.paddings}>
      <Text style={styles.fortext}>Confirmed Cases: {confirmedcases} are {calculatepercentage(confirmedcases)}% of World population {worldpopulation} </Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext}>Recovered Cases: {recovered} are {calculatepercentage(recovered)}% of World population {worldpopulation}</Text>
      </View>
      <View style={styles.paddings}>
      <Text style={styles.fortext}>Critical Cases: {critical} are {calculatepercentage(critical)}% of World population {worldpopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext}>Deaths: {deaths} are {calculatepercentage(deaths)}% of World population {worldpopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext2}>LastUpdated {lastUpdate} </Text>
      </View>
      <View style={styles.paddings}>
      <Text style={styles.fortext4}>Developed By SP18-BCS-061 Haris Abbasi</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  paddings: {
    paddingTop:20,
  },
  paddings2: {
    paddingTop:10,
  },
  
  appButton: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#040404',
    backgroundColor: '#E3DC02'
  },
  fortext2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#E4E102',
    backgroundColor: '#030303'
  },
  fortext: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#009688',
    backgroundColor: '#E3DC02'
  },
  fortext4: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#040A94'
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

