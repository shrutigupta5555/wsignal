import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupNotifyNear";

function NotifyNear() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.box}>
            <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
            <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header  title="Notify Nearby" >
                </Modal.Header>
                <Modal.Body>
                <Text style={styles.text}>Notifies people around you who have the app of your location, and one emergency contact's phone number and name.</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button title="Done" onPress={handleModal} />
                </Modal.Footer>
            </Modal.Container>
            </Modal>
            <Text style={styles.text}>Notify</Text>
            <Text style={styles.text}>Nearby</Text>
        </View>
    )
}

export default NotifyNear

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#C89B7B',
        marginLeft: 20,
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