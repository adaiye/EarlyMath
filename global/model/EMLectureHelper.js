'use strict'

var React = require('react-native');

exports.getCardItemsFromLesson = function(lectureId, lessonId) {
  var numberOfRow = 5, numberPerRow = 3;
  var cardItems = [];

  let images = [], chineses;
  if (lessonId == 2) { // 看数认数
    chineses = [
      '一',
      '两',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '二十',
      '三十',
      '四十',
      '五十',
      '零',
    ];
  } else { // 看图认数
    images = [
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

    chineses = [
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
  }

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
      if (i < 9) {
        number = i + 1;
      } else {
        number = (i - 9 + 1) * 10;
      }
      if (i === numberPerRow * numberOfRow - 1) {
        number = 0;
      }
    }
    cardItems.push({
      number : number,
      image : image,
      chinese : chineses[i],
      english : englishs[i],
    });
  }

  return cardItems;
}
