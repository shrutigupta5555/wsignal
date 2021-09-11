import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button
} from 'react-native';
import Firebase from '../Firebase';

// import loc from '../utils/localization';
import mainContext from '../context/mainContext'; //The context!!

const Login = ({ navigation }) => {
  const { handleLogin } = useContext(mainContext); //Login function which is in App,js, available via context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            onChangeText={(email) => setEmail(email)}
            value={email}
            label="Email"
            keyboardType={'email-address'}
            mode="outlined"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
            label="Password"
            mode="outlined"
          />
        </View>
        <Button
          onPress={() => handleLogin(email, password)}
          title = "login"
          mode="contained"
          icon="login"
        >
          loginButton
        </Button>

        <Button
          title='noaccount'
          onPress={() => navigation.navigate('Signup')}
        >
          noaccount
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;