import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Firebase from '../Firebase'
import {Permissions, Notifications} from 'expo';



const NotifyPeople = () => {

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
    
        try {
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          console.log(token)
          // POST the token to your backend server from where you can retrieve it to send push notifications.
          Firebase
            .database()
            .ref('users/' + this.currentUser.uid + '/push_token')
            .set(token);
        } catch (error) {
          console.log(error);
        }
      };
    
    
    return (
        <View>

        </View>
    )
}

export default NotifyPeople

const styles = StyleSheet.create({})
