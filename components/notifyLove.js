import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupNotifyFamily";
import Firebase from '../Firebase';
import * as SMS from 'expo-sms';


function NotifyLove({lat, lng, address, currentUser}) {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const [phone1, setphone1] = useState('')
    const [phone2, setphone2] = useState('')
    const [phone3, setphone3] = useState('')
    
    

    
    const db = Firebase.firestore();
    const docRef = db.collection('users').doc(currentUser.email)
    const help = async() => {
        // console.log(currentUser.email)
        docRef.get()
            .then(doc => {
                // console.log(doc.data())
                setphone1(doc.data().phone1)
                setphone2(doc.data().phone2)
                setphone3(doc.data().phone3)
                let p1 = doc.data().phone1
                let p2 = doc.data().phone2
                let p3 = doc.data().phone3

                SMS.sendSMSAsync(
                    [p1, p2, p3],
                    `Need Help!!! \n Location: ${address} Latitude : ${lat} Longitude : ${lng}`,
                   
                  ).then(() => console.log("done"))
                  

                
        })

        
        
    }

    return (
        <Pressable onPress={help}>

            <View style={styles.box}>
                <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
                <Modal isVisible={isModalVisible}>
                <Modal.Container>
                    <Modal.Header  title="Notify Family" >
                    </Modal.Header>
                    <Modal.Body>
                    <Text style={styles.text}>Sends text messages of your location to people that you have listed as emergency contacts.</Text>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button title="Done" onPress={handleModal} />
                    </Modal.Footer>
                </Modal.Container>
                </Modal>
                <Text style={styles.text}>Notify</Text>
                <Text style={styles.text}>Family</Text>
            </View>
        </Pressable>
    )
}

export default NotifyLove

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#FABDCA',
        marginLeft: 30,
        borderRadius: 25,
        marginTop: 420,
        borderColor: '#000',
        borderWidth: 3
    },
    icon: {
        marginRight: 10,
        marginTop: 10,
        marginLeft: 'auto',
        color: '#fff'
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        color: '#fff'
    }
})