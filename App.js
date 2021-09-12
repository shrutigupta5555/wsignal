import React, { useState, useMemo, useEffect } from 'react';
import {Text, View, Appearance} from 'react-native';

import {
  NavigationContainer
  
} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Firebase from './Firebase';

import Login from './screens/Login';
import HomeScreen from './screens/Home';
import SignUp from './screens/SignUp';

import mainContext from './context/mainContext';
import Profile from './screens/Profile';
import NotifyPeople from './screens/NotifyPeople';

const App = () => {
  const AppStack = createStackNavigator();

  const [userLogged, setUserLogged] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      setUserProfile(user);
    });
  }, []);

  const doSignup = async (email, password) => {
    setIsLoading(true);
    //console.log('login' + JSON.stringify(userProfile));
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };

  

  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
     
      signOutUser: () => Firebase.auth().signOut(),
      handleLogin: (email, password) => {
        setIsLoading(true);
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => console.log(error));
        setIsLoading(false);
      },
      handleSignup : (email, password) => {
        doSignup(email, password);
      },
    }),
    []
  );

  return (
    <mainContext.Provider value={mainC}> 

  
        <NavigationContainer>
          <AppStack.Navigator initialRouteName="Login">
            {userLogged == false ? ( 
              <>
    
                <AppStack.Screen name="Login" component={Login} /> 

                <AppStack.Screen
                  name="Signup"
                  
                  options={{ title: "SignUp" }}
                >
                  {() => <SignUp />}
                </AppStack.Screen>
              </>
            ) : (
              <>
   
                <AppStack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <AppStack.Screen
                  name="Profile"
                  component={Profile}
                  options={{ headerShown: false }}
                />
                <AppStack.Screen
                  name="NotifyPeople"
                  component={NotifyPeople}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </AppStack.Navigator>
        </NavigationContainer>
     
    </mainContext.Provider>
  );
};

export default App;
