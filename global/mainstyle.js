'use strict'

var React = require('react-native');
import {Platform} from 'react-native';

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
  mainContainer : {
    flex : 1,
    backgroundColor : '#4F5D73',
  },
  mainContainerInner : {
    flex : 1,
    backgroundColor : 'transparent',
  },

  leftBar : {
    // width : 100,
    backgroundColor : '#4F5D73',
    top : 1,
    position: 'absolute',
    paddingBottom: 44,
    ...Platform.select({
      ios : {
        shadowColor : 'black',
        shadowOpacity : 0.3,
        shadowOffset : {
          width : 2.0,
          height : 0,
        },
      },
      android : {
        borderRightColor : 'rgba(0,0,0,0.3)',
        borderRightWidth : 0.5,
      },
    }),
  },

  navBar : {
    flexDirection : 'row',
    ...Platform.select({
      ios : {
        height : 64,
        paddingTop : 20,
        shadowColor : 'black',
        shadowOpacity : 0.3,
        shadowOffset : {
          width : 0,
          height : 0.5,
        },
      },
      android : {
        height : 44,
        borderBottomColor : 'rgba(0,0,0,0.3)',
        borderBottomWidth : 0.5,
      },
    }),
  },

  navBarLeft : {
    paddingLeft : 15,
    width : 45,
    justifyContent : 'center',
    alignItems : 'flex-start',
  },

  navBarRight2 : {
    width : 40,
    justifyContent : 'center',
    alignItems : 'center',
  },

  navBarRight : {
    paddingRight : 15,
    width : 60,
    justifyContent : 'center',
    alignItems : 'flex-end',
  },

  navBarImage : {
    width : 18,
    height : 16,
    justifyContent : 'center',
    alignItems : 'center',
  },

  navBarTitle : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'flex-start',
  },

  navBarState : {
    fontSize : 17,
    color : 'white',
  },

  title : {
    fontSize : 19,
    fontWeight : '400',
    color : 'white',
  },

});
