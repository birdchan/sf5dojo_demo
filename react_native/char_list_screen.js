'use strict';

import React, { Component } from 'react';
import {
    AppState,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';
import YouTube from 'react-native-youtube';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'expo'

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

let marginSize = 50;
let videoWidth = window.width - marginSize;
let videoHeight = videoWidth * (48.0 / 64.0)
let adHeight = 60;
if (window.width > 600) {
    adHeight = 90;
}
let flatListHeight = window.height - adHeight;
let styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#dddddd',
      alignItems: 'center',
      justifyContent: 'center',
    },

    flat_list: {
        flex: 1,
    },

    ad_banner: {
        height: adHeight,
    },

    text: {
        marginTop: 10,
        marginLeft: marginSize / 2,
        marginRight: marginSize / 2,
        marginBottom: 3,
    },

    text_bottom: {
        marginLeft: marginSize / 2,
        marginRight: marginSize / 2,
    },

    WebViewContainer: {
      marginLeft: marginSize / 2,
      marginRight: marginSize / 2,
      width: videoWidth,
      height: videoHeight,
    }
});


class CharListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char_id: null,
            videoList: [],
            appState: AppState.currentState,
        }
    }

    _keyExtractor = (item, index) => item.videoId;

    componentWillMount() {
        const { navigation } = this.props;
        const char_id = navigation.getParam('char_id', 'ryu');
        const char_name = navigation.getParam('char_name', 'RYU');
        this.getVideosFromApiAsync(char_id);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
  
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {        
        this.setState({appState: nextAppState});
    }

    getVideosFromApiAsync = (char_id) => {
        let url = 'http://example.com/api/get-videos/' + char_id;
        console.log('url: ' + url)
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            let videoList = responseJson.videos;
            videoList = videoList.slice(0, 8);
            this.setState({
                char_id: char_id,
                videoList: videoList,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    renderRowItem = (itemData) => {
        let self = this;
        let obj = itemData.item;
        let url = 'https://www.youtube.com/embed/' + obj.videoId;
        return (
            <View>
                <Text
                    style={ styles.text }
                >
                        {obj.title} ({obj.duration} ago)
                </Text>
                {this.state.appState == 'active' &&
                    <WebView
                        style={ styles.WebViewContainer }
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{uri: url }}
                    />
                }
                <Text
                    style={ styles.text_bottom }
                >
                </Text>
            </View>
        )
    }

    render () {
        const { navigation } = this.props;
        const char_id = navigation.getParam('char_id', 'ryu');
        const char_name = navigation.getParam('char_name', 'RYU');
        if (this.state.char_id !== char_id) {
            this.getVideosFromApiAsync(char_id);
        }
        let self = this;
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flat_list}
                    data={this.state.videoList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderRowItem}
                    initialNumToRender={3}
                    getItemLayout={(data, index) => (
                        {length: videoHeight, offset: videoHeight * index, index}
                    )}
                    initialScrollIndex={0}
                    key={'flatlist_' + char_id}
                />
                <AdMobBanner
                    style={styles.ad_banner}
                    bannerSize="smartBannerPortrait"
                    adUnitID=""
                    testDeviceID="EMULATOR"
                    onDidFailToReceiveAdWithError={error => console.error(error)}
                />
            </View>
        );
    }
};

export default CharListScreen;
