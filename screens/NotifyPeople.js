import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import Firebase from '../Firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [currentUser, setcurrentUser] = useState(null);
  const [toNotify, settoNotify] = useState([])
  const [name, setname] = useState("")
  const [loc, setloc] = useState("Delhi")
  const [address, setaddress] = useState("Delhi")

  useEffect(() => {
    setcurrentUser(Firebase.auth())
    getName()
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function getName() {
      
         console.log(currentUser, "line 47")
          const db = Firebase.firestore();
      
          const docref = db.collection('users').doc(currentUser.currentUser.email)
          console.log(currentUser.currentUser.email, "line 51 ====================")
          docref
              .get()
              .then(doc => {
                  console.log(doc.data(), doc.data().name, "======================")
                  setname(doc.data().name)
                  setloc(doc.data().loc)
                  setaddress(doc.data().address)
              })
      

  }

  async function sendPushNotification() {
    const db = Firebase.firestore()
        console.log(loc, "line68")
        db.collection("users")
        .where('loc', "==", `${loc}`)
        .get()
        .then((querySnapshot) => {
            const temp = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                temp.push(doc.data())
            });
    
            settoNotify(temp)
            
            for(let i=0; i < temp.length; i++){
                let t = temp[i].token
                console.log("-=-=-=-=-", name)
                sendNotif(t, name, loc, address)
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />

    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendNotif(expoPushToken, name,loc, address) {



 

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `${name} needs help!`,
    body: `Location : ${loc}`,
    data: {'complete address' : address },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}



async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
