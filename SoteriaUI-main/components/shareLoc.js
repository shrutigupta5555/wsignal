import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupShare";

function ShareLoc() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.box}>
            <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
            <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header  title="Share Location" >
                </Modal.Header>
                <Modal.Body>
                <Text style={styles.text}>Shares your location to three recent contacts on WhatsApp, and notifies them of the emergency.</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button title="Done" onPress={handleModal} />
                </Modal.Footer>
            </Modal.Container>
            </Modal>
            <Text style={styles.text}>Share</Text>
            <Text style={styles.text}>Location</Text>
        </View>
    )
}

export default ShareLoc

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#F0F757',
        marginLeft: 30,
        borderRadius: 25,
        marginTop: 60,
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