import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Greeting from './components/greeting';
import FakeCall from './components/fakeCall';
import NotifyLove from './components/notifyLove';
import ShareLoc from './components/shareLoc';
import Police from './components/police';
import Record from './components/record';
import NotifyNear from './components/notifyNear';
import Settings from './components/settings';

export default function App() {
  return (
    <View>
      <Greeting />
      <Settings />
      <View style={styles.container}>
      <FakeCall />
      <ShareLoc />
      </View>
      <View style={styles.container}>
      <Police />
      <Record />
      </View>
      <View style={styles.container}>
      <NotifyNear />
      <NotifyLove />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row'
  },
});
