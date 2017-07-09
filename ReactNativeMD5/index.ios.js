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
  TouchableOpacity,
  TextInput,
  View
} from 'react-native';
const Utils = require('Utils');

export default class ReactNativeMD5 extends Component {
  Props:props;
  container(props){
    super(props)
    this.state={
      result:null,
      text:''
    }
    (this:any)._renderMD5 = this._renderMD5.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          MD5加密
        </Text>
        <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
        <TouchableOpacity style={styles.instructions} onPress={()=>this._renderMD5}>
        </TouchableOpacity>
      </View>
    );
  }
  _renderMD5(){
    let params={
      appKey:22222,
      appVersion:1222,
      osType:aaa,
      channelId:'AppStore',
      text:this.state.text,
    }
    let str = Utils.signStringConnect(params);
    let sign = Utils.signMD5(str);
    console.log('-----params----');
    console.log(params);
    console.log('=======sign======');
    console.log(sign);
    this.setState({
      result:sign
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('ReactNativeMD5', () => ReactNativeMD5);
