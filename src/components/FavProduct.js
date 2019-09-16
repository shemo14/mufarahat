import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as Animatable from 'react-native-animatable';
import {getSetFav, profile} from "../actions";
import {connect} from "react-redux";



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;



class FavProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
            fav:true,
        }
    }

    onFavPress(){
        this.setState({fav: !this.state.fav })
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.getSetFav( this.props.lang , this.props.data.id , token )
    }

    render() {

        return (

            <Animatable.View animation="zoomIn" duration={1000} style={[styles.scrollParent2 , styles.touchProduct]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: this.props.data.id })}>
                    <Image source={{uri:this.props.data.image}} style={styles.scrollImg2} resizeMode={'cover'} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircle} resizeMode={'contain'} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product' , { id: this.props.data.id })}>
                    <Text style={[styles.type ,{color:COLORS.boldgray}]}>{this.props.data.name}</Text>
                </TouchableOpacity>
                <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{this.props.data.category}</Text>
                <Text style={[styles.headerText ,{color:COLORS.labelBackground}]}>{this.props.data.price}</Text>
                <Text style={styles.oldPrice}>{this.props.data.old_price}</Text>
                <TouchableOpacity onPress={() => this.onFavPress()} style={{alignSelf:'flex-end'}}>
                    <Icon type={'FontAwesome'} name={'heart'} style={{ fontSize: 20, color: this.state.fav? '#ff5252' : COLORS.lightgray }} />
                </TouchableOpacity>
            </Animatable.View>
        );
    }
}

const mapStateToProps = ({ lang ,  setFav , profile}) => {
    return {
        lang: lang.lang,
        setFav: setFav.fav,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getSetFav , profile })(FavProduct);