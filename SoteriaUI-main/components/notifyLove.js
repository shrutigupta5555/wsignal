import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupNotifyFamily";

function NotifyLove() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
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