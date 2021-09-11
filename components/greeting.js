import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function Greeting({name}) {
    const n= name.split("@")[0]
    return (
        <View>
            <Text style={styles.greet}>Hi, {n}</Text>
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