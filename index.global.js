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
  Platform,
} from 'react-native';

var mainStyles = require('./mainStyle');

class Card extends Component {
    render() {
        return (
            <View style={styles.card2}>
            </View>
        );
    }
}

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
  __cardClicked(index: number): void {
    this.setState({
      language: this.state.language === 0 ? 1 : 0,
    });
  }

  render() {
      var numberOfRow = 5, numberPerRow = 3;
      let cards = [], rows = [];
      let images = [
          require('image!number_1'),
          require('image!number_2'),
          require('image!number_3'),
          require('image!number_4'),
          require('image!number_5'),
          require('image!number_6'),
          require('image!number_7'),
          require('image!number_8'),
          require('image!number_9'),
      ]
      for (var i = 0; i < numberPerRow * numberOfRow; i++) {
          if (i < images.length) {
              cards.push(
                  <TouchableHighlight
                      style={styles.card}
                      key={'card'+i}
                      onPress={this.__cardClicked.bind(this, i)} >
                      <Image source={images[i]} style={styles.cardImage} />
                  </TouchableHighlight>
              );
          } else {
              cards.push(
                  <TouchableHighlight style={styles.card}
                      key={'card'+i}>
                      <Image source={images[i%9]} style={styles.cardImage} />
                  </TouchableHighlight>
              );
          }
      }
      for (var i = 0; i < numberOfRow; i++) {
          var start = i * numberPerRow;
          rows.push(
              <View style={styles.row}
                  key={'row'+i}>
                  { cards.slice(start, start + numberPerRow) }
              </View>
          )
      }
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
            {rows}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
  },
  card: {
      flex: 1,
      margin:5,
      justifyContent: 'center',
      alignItems: 'stretch',
      borderColor: '#F5CF8768',
      borderWidth: 1,
      borderRadius: 8,
      ...Platform.select({
        ios: {
          shadowColor: '#F5CF87',
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowRadius: 2,
        },
      }),
  },
  cardImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'stretch',
  },
});

AppRegistry.registerComponent('EarlyMath', () => EarlyMath);
