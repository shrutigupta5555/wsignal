import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
    const navigation = useNavigation();
    return (
        <FontAwesome style={styles.icon} size={30} name="gear" onPress={() => navigation.navigate('Profile')}/>
    )
}

export default Settings;

const styles = StyleSheet.create ({
    icon: {
        marginLeft: 'auto',
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0
    }
})