import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Greeting() {
    return (
        <View>
            <Text style={styles.greet}>Hi, Jane</Text>
        </View>
    )
}

export default Greeting

const styles = StyleSheet.create ({
    greet: {
        marginTop: 70,
        marginLeft: 30,
        fontSize: 30,
        display: 'flex',
        flexDirection: 'row'
    }
})