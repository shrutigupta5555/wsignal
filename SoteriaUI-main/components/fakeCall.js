import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from "./popup";

function FakeCall() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.box}>
            <FontAwesome size={35} style={styles.icon} onPress={handleModal} name='info-circle' />
            <Modal isVisible={isModalVisible}>
            <Modal.Container>
                <Modal.Header  title="Fake Call" >
                </Modal.Header>
                <Modal.Body>
                <Text style={styles.text}>Send messages to emergency contacts asking to call you. In case the message is not recieved by anyone, the app will send you a fake call.</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button title="Done" onPress={handleModal} />
                </Modal.Footer>
            </Modal.Container>
            </Modal>
            <Text style={styles.text}>Fake</Text>
            <Text style={styles.text}>Call</Text>
        </View>
    )
}

export default FakeCall

const styles = StyleSheet.create({
    box: {
        height: 160,
        width: 160,
        backgroundColor: '#C7C7CD',
        marginLeft: 20,
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