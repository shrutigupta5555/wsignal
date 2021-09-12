import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, ScrollView } from 'react-native';

import Greeting from '../components/greeting';
import FakeCall from '../components/fakeCall';
import NotifyLove from '../components/notifyLove';
import ShareLoc from '../components/shareLoc';
import Police from '../components/police';
import Record from '../components/record';
import NotifyNear from '../components/notifyNear';
import Settings from '../components/settings';

import Firebase from '../Firebase';

import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native'

export default function App() {
  const {currentUser} = Firebase.auth();

  const navigation = useNavigation()

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [lat, setlat] = useState(null)
  const [lnh, setlnh] = useState(null)
  const [loc, setloc] = useState("")
 
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    ''
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation().then(() => {
      if(lat && lnh && loc){

        const db = Firebase.firestore();
        const docRef = db.collection('users').doc(currentUser.email)

       
        
        docRef.update({
          lat: lat,
          lng : lnh,
          loc : loc,
          address: displayCurrentAddress
        })
      }
    })
  }, []);


  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      setlat(latitude)
      setlnh(longitude)
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        // console.log(item)
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setloc(item.name)
        setDisplayCurrentAddress(address);

       
      }
    }
  };




  return (
    <View style={styles.Div}>

      <ScrollView>
      

      <Greeting name={currentUser.email}/>
      <Settings />
   
      <FakeCall />
      <ShareLoc />
      <Police />
      <Record />
      <NotifyNear/>
      <NotifyLove lat={lat} lng={lnh} address={displayCurrentAddress} currentUser={currentUser}/>
      <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Div : {
    padding: 3
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row'
  },
 
});