import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popupRecord";

function Record() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.box}>
            <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
            <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header  title="Record" >
                </Modal.Header>
                <Modal.Body>
                <Text style={styles.text}>Instantly starts recording sound and will save the recordings onto your phone every three minutes.</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button title="Done" onPress={handleModal} />
                </Modal.Footer>
            </Modal.Container>
            </Modal>
            <Text style={styles.text}>Record</Text>
        </View>
    )
}

export default Record

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#75B8C8',
        marginLeft: 30,
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