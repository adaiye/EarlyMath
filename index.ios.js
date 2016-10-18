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
import GoogleAnalytics from 'react-native-google-analytics-bridge';

var mainStyles = require('./global/mainstyle');

var numberOfRow = 5, numberPerRow = 3;
var cardItems = [];

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
    this.__initApp();
    this.__initCardItems();
    this.__initState();
  }

  __initApp() {
    GoogleAnalytics.setTrackerId('UA-85477621-1');
  }

  __initState() {
    this.state = {
      title: '看图数数',
      language: 0,
      mode: 0,
    };
  }

  __initCardItems() {
    cardItems = [];

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
    ];

    let chineses = [
      '一辆汽车',
      '两头狮子',
      '三头大象',
      '四个苹果',
      '五只蝴蝶',
      '六幢房子',
      '七朵小花',
      '八把琴',
      '九颗草莓',
      '十',
      '二十',
      '三十',
      '四十',
      '五十',
      '零',
    ];

    let englishs = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'zero',
    ];

    for (var i = 0; i < numberPerRow * numberOfRow; i++) {
      var image, number = i + 1;

      if (i < images.length) {
        image = images[i];
      } else {
        image = null;
        number = (i - images.length + 1) * 10;
        if (i === numberPerRow * numberOfRow - 1) {
          number = 0;
        }
      }
      cardItems.push({
        number: number,
        image: image,
        chineses: chineses[i],
        english: englishs[i],
      });
    }
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
  __cardClicked(card): void {
    console.log('number ' + card.number);
    this.setState({
      language: this.state.language === 0 ? 1 : 0,
    });
  }

  render() {
    let cards = [], rows = [];
    for (var i = 0; i < cardItems.length; i++) {
      var card = cardItems[i];
      var inner;
      var style = styles.card;
      if (card.image) {
        inner = <Image source={card.image} style={styles.cardImage} />;
      } else {
        inner = <Text style={styles.cardNumber}>{card.number}</Text>;
        style = [styles.card, styles.card2];
      }
      cards.push(
          <TouchableHighlight
              style={style}
              key={card.number}
              onPress={this.__cardClicked.bind(this, card)} >
              {inner}
          </TouchableHighlight>
      );
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
  card2: {
    alignItems: 'center',
  },
  cardNumber: {
    flex: 1,
    width: null,
    height: null,
    fontSize: 72,
    paddingTop: 5,
    color: '#F5CF87',
  },
});

AppRegistry.registerComponent('EarlyMath', () => EarlyMath);
