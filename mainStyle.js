'use strict'

var React = require('react-native')
import { Platform } from 'react-native';

var {
  StyleSheet,
} = React;


module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4F5D73',
  },

  navBar: {
    flexDirection:'row',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    ...Platform.select({
      ios: {
        height: 64,
        paddingTop: 20,
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
      },
      android: {
        height: 44,
        elevation: 1,
      },
    }),
  },

  navBarLeft: {
    paddingLeft:15,
    width:60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  navBarRight: {
    paddingRight:15,
    width:60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  navBarImage: {
    width: 18,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBarTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBarState: {
    fontSize: 17,
    color: 'white',
  },

  title: {
    fontSize: 19,
    fontWeight: '400',
    color: 'white',
  },

});
