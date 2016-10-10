/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

var mainStyles = require('./mainStyle');

class EarlyMath extends Component {
  render() {
    return (
      <View style={mainStyles.mainContainer}>

        <View style={mainStyles.navBar}>
          <View style={mainStyles.navBarLeft}>
            <Image source={require('image!more')} style={mainStyles.navBarImage} />
          </View>
          <View style={mainStyles.navBarTitle}>
            <Text style={mainStyles.title}>看图数数</Text>
          </View>
          <View style={mainStyles.navBarRight}>
            <Text style={mainStyles.navBarState}>4/10</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('EarlyMath', () => EarlyMath);
