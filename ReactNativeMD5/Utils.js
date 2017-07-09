/**
 *
 *
 * @providesModule Utils
 * @flow
 *
 */

'use strict';

import {
  Platform,
  Alert,
  Navigator
}
from 'react-native';

const FlyMD5 = require('FlyMD5');
const _ = require('lodash');

var Key = 'abcdefg';
const Utils ={
  //做MD5 加密做公共参数拼接
signStringConnect:(params)=>{
  var signString = Key; 
  if (params) { 
    var keys = _.keys(params); 
    keys.sort(); 
    for (var i = 0; i < keys.length; i++) { 
      signString = signString + keys[i] + params[keys[i]]; 
    } 
  } 
  signString += Key;
  signString = Utils.str2rstrUTF8(signString);
  return signString;
},

//MD5加密
signMD5:(str)=>{
 let sign = FlyMD5.md5(str);
  return sign;
},
//中文转成UTF-8
str2rstrUTF8: (input) => {
   return encodeURIComponent(input)
 },
}

module.exports = Utils;
