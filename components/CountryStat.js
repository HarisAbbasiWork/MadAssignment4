import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
export default function CountryStat({ route,navigation }) {
  const[confirmedcases,setConfirmedcases]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[country,setCountry]=useState()
  const[countrypopulation,setCountrypopulation]=useState()
  useEffect(() => {
    setCountry(route.params.country)
    console.log(route.params.country)
    getData(route.params.country);
    getPopulation(route.params.country)
  },[route.params.country])
    function getPopulation(counti) {
      const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/population',
  params: {country_name: counti},
  headers: {
    'x-rapidapi-key': '40838189e4mshb5ffc5960cde754p1c2078jsn5b6a894a4513',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(counti,"Population",response.data.body.population);
  setCountrypopulation(response.data.body.population)
}).catch(function (error) {
	console.error(error);
});
    }
  
  function getData(counti) {
    const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country',
  params: {name: counti},
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data[0]);
  setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)
}).catch(function (error) {
	console.error(error);
});
    
  }
  function calculate(value){
    const val =(100 * value) / countrypopulation
    return val.toFixed(2)
  }
  return (
    
      
      <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Go back Stats By Country" />
      <View style={styles.paddings}>
      <Text style={styles.bigBlue}>{country} Cases</Text>
      </View>
      <View style={styles.paddings}>
      <Text style={styles.fortext2}>Confirmed Cases: {confirmedcases} are {calculate(confirmedcases)}% of {country} population {countrypopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext2}>Recovered Cases: {recovered} are {calculate(recovered)}% of {country} population {countrypopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext2}>Critical Cases: {critical} are {calculate(critical)}% of {country} population {countrypopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext2}>Deaths Cases: {deaths} are {calculate(deaths)}% of {country} population {countrypopulation}</Text>
      </View>
      <View style={styles.paddings2}>
      <Text style={styles.fortext3}>lastUpdated {lastUpdate}</Text>
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
  paddings: {
    paddingTop:20,
  },
  paddings2: {
    paddingTop:10,
  },
  fortext2: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#009688',
    backgroundColor: '#E3DC02'
  },
  fortext3: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#E4E102',
    backgroundColor: '#030303'
  },
  

  
});

