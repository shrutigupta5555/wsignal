import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native'

function Settings() {
    return (
        <FontAwesome style={styles.icon} size={30} name="gear" />
    )
}

export default Settings

const styles = StyleSheet.create ({
    icon: {
        marginLeft: 'auto',
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0
    }
})