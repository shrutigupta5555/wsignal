import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TextInput
} from 'react-native';

import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Firebase from '../Firebase';

import mainContext from '../context/mainContext';

const Profile = () => {

    const {signOutUser} = useContext(mainContext);

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [loc, setLoc] = useState('');
    const [name1, setname1] = useState("");
    const [phone1, setphone1] = useState('');
    const [name2, setname2] = useState("");
    const [phone2, setphone2] = useState('');
    const [name3, setname3] = useState("");
    const [phone3, setphone3] = useState('');
    
    const { currentUser } = Firebase.auth();
    const handleProfile = () => {
        const data = {
          name : name,
          loc : loc,
          name1 : name1,
          name2 : name2,
          name3 : name3,
          phone1 : phone1,
          phone2 : phone2,
          phone3 : phone3,
        }

        const db = Firebase.firestore()

        db.collection('users')
          .doc(currentUser.email)
          .set(data)
          .then(() => {
            navigation.navigate('Home')
          })
        

        // navigation.navigate('Home')
    }
  
    //console.log(mainContext);
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>

            <TextInput
              placeholder="Name"
              onChangeText={(name) => setName(name)}
              value={name}
              label={'none'}
              mode="outlined"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Location (town)"
              onChangeText={(loc) => setLoc(loc)}
              value={loc}
              label="location"
              
              
            />
          </View>
          <Title>List 3 emergency contacts</Title>
          <View style={styles.inputDiv}>
            <TextInput
              style = {styles.inputText}
              placeholder="Name"
              onChangeText={(name1) => setname1(name1)}
              value={name1}
              
          
              mode="outlined"
            />
            <TextInput
              style = {styles.inputText}
              placeholder="Enter mobile number"
              onChangeText={(phone1) => setphone1(phone1)}
              value={phone1}
              
              label="Mobile"
              mode="outlined"
            />
          </View>
  
          <View style={styles.inputDiv}>
            <TextInput
              style = {styles.inputText}
              placeholder="Name"
              onChangeText={(name2) => setname2(name2)}
              value={name2}
              
          
              mode="outlined"
            />
            <TextInput
              style = {styles.inputText}
              placeholder="Enter mobile number"
              onChangeText={(phone2) => setphone2(phone2)}
              value={phone2}
              
              label="Mobile"
              mode="outlined"
            />
          </View>
          <View style={styles.inputDiv}>
            <TextInput
              style = {styles.inputText}
              placeholder="Name"
              onChangeText={(name3) => setname3(name3)}
              value={name3}
              
          
              mode="outlined"
            />
            <TextInput
              style = {styles.inputText}
              placeholder="Enter mobile number"
              onChangeText={(phone3) => setphone3(phone3)}
              value={phone3}
              
              label="Mobile"
              mode="outlined"
            />
          </View>
  
  
          <Button
            mode="contained"
            icon="login"
            title = "Submit"
            onPress={() => handleProfile()}
          >
           Submit
          </Button>

          <Button
            mode="contained"
            icon="login"
            title = "Log Out"
            onPress={() => signOutUser()}
          >
           Log Out
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      marginBottom: 20,
    },
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputDiv : {
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between',
      margin: 5
    },
    inputText : {
      width: '40%',
      borderWidth : 1,
      borderColor : 'black',
      padding: 4,
      margin: 3
    }
  });
  
  export default Profile;
