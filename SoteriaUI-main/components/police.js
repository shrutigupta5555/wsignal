import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupPolice";

function Police() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.box}>
            <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
            <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header  title="Police" >
                </Modal.Header>
                <Modal.Body>
                <Text style={styles.text}>Call the cops at the press of a button! This wil also play a loud siren to warn off attackers.</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button title="Done" onPress={handleModal} />
                </Modal.Footer>
            </Modal.Container>
            </Modal>
            <Text style={styles.text}>Police</Text>
        </View>
    )
}

export default Police

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#FF595E',
        marginLeft: 20,
        borderRadius: 25,
        marginTop: 240,
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
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30,
        color: '#fff'
    }
})