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
  TouchableHighlight,
} from 'react-native';

var mainStyles = require('./mainStyle');

class EarlyMath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '看图数数',
      language: 0,
      mode: 0,
    };
  }

  __onPressMore() {
    console.log('more');
  }

  __onPressMode() {
    console.log('mode');
  }

  __onPressLanguage() {
    console.log('language');
  }

  render() {
    return (
      <View style={mainStyles.mainContainer}>

        <View style={mainStyles.navBar}>
          <TouchableHighlight style={mainStyles.navBarLeft} onPress={this.__onPressMore}>
            <Image source={require('image!more')} style={mainStyles.navBarImage} />
          </TouchableHighlight>
          <View style={mainStyles.navBarTitle}>
            <Text style={mainStyles.title}>{this.state.title}</Text>
          </View>
          <TouchableHighlight style={mainStyles.navBarRight2} onPress={this.__onPressLanguage}>
            <Text style={mainStyles.navBarState}>{this.state.language === 0 ? '汉' : '英'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={mainStyles.navBarRight} onPress={this.__onPressMode}>
            <Text style={mainStyles.navBarState}>模式</Text>
          </TouchableHighlight>
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
