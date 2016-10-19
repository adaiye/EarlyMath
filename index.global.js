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
  LayoutAnimation,
  ListView,
} from 'react-native';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import Config from 'react-native-config';
import EStyleSheet from 'react-native-extended-stylesheet';

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

var kLeftBarWidth = 100;
var numberOfRow = 5, numberPerRow = 3;
var cardItems;
var questionIndexesUnasked;   // 没有提问过的问题索引
var currentQuestionCard;   // 当前问题的答案卡片
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
    this.__initLecture();
    this.__initAppState();
    this.__initApp();
    this.__initCardItems(this.state.lectureId, this.state.lessonId);
    // calculate styles
    EStyleSheet.build();
  }

  __initAppState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      lectureId : 1,
      lessonId : 1,
      language: 0,
      mode: 0,
      leftBarWidth: kLeftBarWidth,
      leftBarLeft: -kLeftBarWidth,
      dataSource: ds.cloneWithRows(lectureItems[0].lessons),
    };
    try {
      AsyncStorage.multiGet([Key_AppState_LectureId, Key_AppState_LessonId, Key_AppState_Language, Key_AppState_Mode], (err, stores) => {
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
              this.__startAskQuestion(iVal, '');
            } else if (key === Key_AppState_LectureId || key === Key_AppState_LessonId) {
              let lecId = this.state.lectureId;
              let lesId = this.state.lessonId;
              if (key === Key_AppState_LectureId) {
                lecId = iVal;
              } else {
                lesId = iVal;
              }
              this.__initCardItems(lecId, lesId);
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
    les1.title = '看图识数';
    l.lessons.push(les1);

    let les2 = new Lesson();
    les2.id = 2;
    les2.title = '看数识数';
    l.lessons.push(les2);
  }

  __initApp() {
    GoogleAnalytics.setTrackerId(Config.GA_Tracker_ID);
  }

  __initCardItems(lectureId, lessonId) {
    cardItems = EMLectureHelper.getCardItemsFromLesson(lectureId, lessonId);
    this.__initQuestionIndexes();
  }

  __initQuestionIndexes() {
    questionIndexesUnasked = [];
    for (var i = 0; i < cardItems.length; i++) {
      questionIndexesUnasked.push(i);
    }
  }

  __onPressMore() {
    var spring = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    };
    LayoutAnimation.configureNext(spring);
    let left = this.state.leftBarLeft < 0 ? 0 : -kLeftBarWidth;
    this.setState({leftBarLeft: left});
  }

  __onPressMode(mode) {
    this.setState({
      mode : mode
    });
    AsyncStorage.setItem(Key_AppState_Mode, mode.toString());
    this.__startAskQuestion(mode, '');
  }

  // 开始提问
  __startAskQuestion(mode, preSentence) {
    if (mode === 1) {
      if (!questionIndexesUnasked || questionIndexesUnasked.length == 0) {
        this.__initQuestionIndexes();
      }
      let i = Math.floor((Math.random() * 100) + 1) % questionIndexesUnasked.length;
      let index = questionIndexesUnasked[i];
      questionIndexesUnasked.splice(i, 1);   // remove the index
      currentQuestionCard = cardItems[index];
      if (Speecher) {
        Speecher.speech(preSentence + currentQuestionCard.question);
      }
    }
  }

  __onPressLanguage() {
    var language = (this.state.language === 0) ? 1 : 0;
    this.setState({language : language});
    AsyncStorage.setItem(Key_AppState_Language, language.toString());
  }

  __cardClicked(card): void {
    if (Speecher) {
      if (this.state.mode === 1 && currentQuestionCard) {
        if (currentQuestionCard == card) {
          this.__startAskQuestion(this.state.mode, '恭喜你，答对了！');
        } else {
          let sentences = ['答错了，再试试看吧！', '不对！再试一次吧！'];
          let i = Math.floor((Math.random() * 10) + 1) % sentences.length;
          Speecher.speech(sentences[i] + currentQuestionCard.question);
        }
      } else {
        Speecher.speechCard(card, this.state.language);
      }
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

  __getLanguageTitle() {
    if (this.state.mode === 1) {   // 提问
      return '汉';
    }
    return this.state.language === 0 ? '汉' : '英';
  }

  __onPressRow(rowData) {
    this.__onPressMore();

    var lesId = rowData.id;
    this.__initCardItems(this.state.lectureId, lesId);
    this.setState({
      lessonId : lesId,
    });
    AsyncStorage.setItem(Key_AppState_LessonId, lesId.toString());

  }

  __renderRow(rowData) {
    var s = this.state.lessonId === rowData.id ? styles.listViewTextSelected : styles.listViewText;
    return (<TouchableOpacity onPress={this.__onPressRow.bind(this, rowData)} style={styles.listViewRow}><Text style={[s, {width: this.state.leftBarWidth}]}>{rowData.title}</Text></TouchableOpacity>);
  }

  componentDidMount() {
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
          <TouchableOpacity style={[mainStyles.navBarRight2, mainStyles.navBarButton]} onPress={this.__onPressLanguage.bind(this)}>
            <Text style={mainStyles.navBarState}>{this.__getLanguageTitle()}</Text>
          </TouchableOpacity>
          <View style={[mainStyles.navBarRight, mainStyles.navBarButton]}>
            <TouchableOpacity style={mainStyles.navBarRightItem} onPress={this.__onPressMode.bind(this, 0)}>
              <Text style={this.state.mode === 0 ? mainStyles.navBarStateSelected : mainStyles.navBarState}>点读</Text>
            </TouchableOpacity>
            <View style={mainStyles.navBarRightItemSplit} />
            <TouchableOpacity style={mainStyles.navBarRightItem} onPress={this.__onPressMode.bind(this, 1)}>
              <Text style={this.state.mode === 1 ? mainStyles.navBarStateSelected : mainStyles.navBarState}>提问</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={mainStyles.mainContainerInner}>
          <View style={styles.container}>
              {rows}
          </View>

          <View style={[mainStyles.leftBar, estyles.leftBar, {left: this.state.leftBarLeft, width: this.state.leftBarWidth}]}>
            <ListView style={[mainStyles.mainContainerInner, {width: this.state.leftBarWidth}]}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.__renderRow(rowData)}>
            </ListView>
          </View>
        </View>


      </View>
    );
  }
}
const estyles = EStyleSheet.create({
  leftBar: {
    height: '100%'
  }
});

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

  listViewRow: {
    height : 44,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 0.5,
  },
  listViewText: {
    paddingLeft: 10,
    justifyContent : 'center',
    alignItems : 'center',
    fontSize : 17,
    color : '#F5CF87'
  },
  listViewTextSelected: {
    paddingLeft: 10,
    justifyContent : 'center',
    alignItems : 'center',
    fontSize : 17,
    color : 'red'
  }
});

AppRegistry.registerComponent('EarlyMath', () => EarlyMath);
