import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';
import {
    Button,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";
import char_obj_list from './sf5.js';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    flexDirection: 'column'
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image_left: {
    height: 105,
    width: 90,
    resizeMode: 'cover',
  },
});


class SideBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      charList: []
    }
  }

  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    this.setState({charList: this.getCharsFromApiAsync()});
  }

  getCharsFromApiAsync = () => {
    return Object.keys(char_obj_list).map(function (char_id) {
      return char_obj_list[char_id];
    });
  }

  renderRowItem = (itemData) => {
    let self = this;
    let obj = itemData.item;
    let char_id = obj.id;
    let char_name = obj.name;
    let img_source = obj.img_src;
    return (
      <View>
        <TouchableHighlight
          onPress={self.navigateToScreen(char_id, char_name)}>
          <Image
            source={img_source}
            style={styles.image_left}
            key={'img_' + char_id}/>
        </TouchableHighlight>
      </View>
    )
  }

  navigateToScreen = (char_id, char_name) => () => {
      this.props.navigation.navigate('CharList', {
        char_id: char_id,
        char_name: char_name,
      });
  }

  render () {
      let self = this;
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.charList}
            numColumns={3}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderRowItem}
          />
        </View>
      );
  }
}

export default SideBar;
