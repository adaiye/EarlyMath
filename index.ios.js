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
  TouchableOpacity,
  Platform,
  NativeModules,
  AsyncStorage,
} from 'react-native';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import Config from 'react-native-config';

var Speecher = NativeModules.EMSpeecher;

var Key_AppState_LectureId = 'Key_AppState_LectureId';
var Key_AppState_LessonId = 'Key_AppState_LessonId';
var Key_AppState_Language = 'Key_AppState_Language';
var Key_AppState_Mode = 'Key_AppState_Mode';

var mainStyles = require('./global/mainstyle');
var EMLectureHelper = require('./global/model/EMLectureHelper');

class Lesson {
  constructor() {
    this.id = 0;
    this.title = '';
  }
}
class Lecture {
  constructor() {
    this.id = 0;
    this.title = '';
    this.lessons = [];
  }
}

var numberOfRow = 5, numberPerRow = 3;
var cardItems;
var lectureItems;

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
    this.__initAppState();
    this.__initLecture();
    this.__initApp();
    this.__initCardItems();
  }

  __initAppState() {
    this.state = {
      lectureId : 1,
      lessonId : 1,
      language: 0,
      mode: 0,
    };
    try {
      AsyncStorage.multiGet([Key_AppState_LectureId, Key_AppState_LessonId, Key_AppState_Language, Key_AppState_Mode], (err, stores) => {
        console.log(stores);
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          if (value) {
            let iVal = parseInt(value);
            if (key === Key_AppState_Language) {
              this.setState({language : iVal});
            } else if (key === Key_AppState_Mode) {
              this.setState({mode : iVal});
            } else if (key === Key_AppState_LectureId || key === Key_AppState_LessonId) {
              let lecId = this.state.lectureId;
              let lesId = this.state.lessonId;
              if (key === Key_AppState_LectureId) {
                lecId = iVal;
              } else {
                lesId = iVal;
              }
              cardItems = EMLectureHelper.getCardItemsFromLesson(lecId, lesId);
              this.setState({
                lectureId : lecId,
                lessonId : lesId
              });
            }
          }
        });
      });
    } catch (e) {

    } finally {

    }
  }

  __initLecture() {
    lectureItems = [];

    let l = new Lecture();
    l.id = 1;
    l.title = '学前';
    lectureItems.push(l);

    let les1 = new Lesson();
    les1.id = 1;
    les1.title = '看图识数1';
    l.lessons.push(les1);

    let les2 = new Lesson();
    les2.id = 2;
    les2.title = '看数识数2';
    l.lessons.push(les2);

  }

  __initApp() {
    GoogleAnalytics.setTrackerId(Config.GA_Tracker_ID);
  }

  __initCardItems() {
    cardItems = EMLectureHelper.getCardItemsFromLesson(this.state.lectureId, this.state.lessonId);
  }

  __onPressMore() {
    var lesId = (this.state.lessonId + 1) % 3;
    if (lesId === 0) {
      lesId = 1;
    }
    cardItems = EMLectureHelper.getCardItemsFromLesson(this.state.lectureId, lesId);
    this.setState({
      lessonId : lesId
    });
    AsyncStorage.setItem(Key_AppState_LessonId, lesId.toString());
  }

  __onPressMode() {
    var mode = (this.state.mode + 1) % 3;
    this.setState({
      mode : mode
    });
    AsyncStorage.setItem(Key_AppState_Mode, mode.toString());
  }

  __onPressLanguage() {
    var language = (this.state.language === 0) ? 1 : 0;
    this.setState({language : language});
    AsyncStorage.setItem(Key_AppState_Language, language.toString());
  }

  __cardClicked(card): void {
    if (Speecher) {
      Speecher.speech(card, this.state.language);
    }
  }

  __getTitle() {
    for (l of lectureItems) {
      if (l.id == this.state.lectureId) {
        for (lesson of l.lessons) {
          if (lesson.id == this.state.lessonId) {
            return lesson.title;
          }
        }
      }
    }
    return '';
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
          <TouchableOpacity
              style={style}
              key={card.number}
              onPress={this.__cardClicked.bind(this, card)} >
              {inner}
          </TouchableOpacity>
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
          <TouchableOpacity style={mainStyles.navBarLeft} onPress={this.__onPressMore.bind(this)}>
            <Image source={require('image!more')} style={mainStyles.navBarImage} />
          </TouchableOpacity>
          <View style={mainStyles.navBarTitle}>
            <Text style={mainStyles.title}>{this.__getTitle()}</Text>
          </View>
          <TouchableOpacity style={mainStyles.navBarRight2} onPress={this.__onPressLanguage.bind(this)}>
            <Text style={mainStyles.navBarState}>{this.state.language === 0 ? '汉' : '英'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={mainStyles.navBarRight} onPress={this.__onPressMode.bind(this)}>
            <Text style={mainStyles.navBarState}>模式</Text>
          </TouchableOpacity>
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
