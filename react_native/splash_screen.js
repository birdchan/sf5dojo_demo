'use strict';

import React, { Component } from 'react';

import {
    Image,
    View,
} from 'react-native';

class SplashScreen extends Component {

    componentDidMount(){
        const {navigate} = this.props.navigation;
        this.timeoutHandle = setTimeout(()=>{
            navigate('drawerStack');
        }, 2000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
    }

    render() {
        return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }}>
            <Image
            style={{width: 200, height: 200}}
            source={require('./images/icon_512.png')}
            />
        </View>
        );
    }
};

export default SplashScreen;
